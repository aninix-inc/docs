import mermaid from 'mermaid'
import * as React from 'react'

type Theme = 'light' | 'dark'
function useDataTheme(): Theme | undefined {
  const [dataTheme, setDataTheme] = React.useState<Theme>(
    (document.documentElement.getAttribute('data-theme') as
      | Theme
      | undefined) ?? 'light'
  )

  React.useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme')

    if (theme == null) {
      return
    }

    setDataTheme(theme as Theme)

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'data-theme') {
          // @ts-ignore
          setDataTheme(mutation.target.getAttribute('data-theme'))
        }
      }
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  return dataTheme
}

export interface IProps {
  graph: string
}
export const Mermaid: React.FC<IProps> = ({ graph }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const theme = useDataTheme()

  React.useEffect(() => {
    mermaid.initialize({
      theme: theme === 'dark' ? 'dark' : 'neutral',
    })
  }, [theme])

  React.useEffect(() => {
    if (containerRef.current == null) {
      return
    }

    mermaid.render('test', graph).then(({ svg }) => {
      if (containerRef.current == null) {
        throw new Error('Should never happen')
      }

      containerRef.current.innerHTML = svg
    })
  }, [graph])

  return <div ref={containerRef} />
}

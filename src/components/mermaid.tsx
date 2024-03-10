import mermaid from 'mermaid'
import * as React from 'react'

mermaid.initialize({
  theme: 'neutral',
})

export interface IProps {
  graph: string
}
export const Mermaid: React.FC<IProps> = ({ graph }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

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

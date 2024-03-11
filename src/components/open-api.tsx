import { ApiReferenceReact } from '@scalar/api-reference-react'
import * as React from 'react'
import { createPortal } from 'react-dom'

export const OpenApi: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const sidebar = containerRef.current?.querySelector('.references-header')

  return (
    <>
      <div ref={containerRef}>
        <ApiReferenceReact
          configuration={{
            customCss: `
.scalar-api-reference {
  /* height: calc(100dvh - 48px) !important; */
}

/* Make scrollable section in center when making requests */
.custom-scroll {
  overflow-y: auto;
}`,
            spec: {
              url: import.meta.env.PUBLIC_API_DOCS_URL,
            },
          }}
        />
      </div>

      {sidebar != null && createPortal(children, sidebar)}
    </>
  )
}

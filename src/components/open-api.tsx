import { ApiReferenceReact } from '@scalar/api-reference-react'
import * as React from 'react'

export const OpenApi: React.FC = () => (
  <ApiReferenceReact
    configuration={{
      customCss: `
.scalar-api-reference {
  height: auto !important;
}`,
      showSidebar: false,
      spec: {
        // url: 'https://petstore.swagger.io/v2/swagger.json',
        url: 'http://localhost:3000/docs/b98558e14e50f0b6f2e779ff337029785256a2f379c43b4f345f7fe922409bfd-json',
      },
    }}
  />
)

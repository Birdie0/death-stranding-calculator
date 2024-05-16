import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'

import 'water.css/out/dark.min.css'

// biome-ignore lint/style/noNonNullAssertion: #root is in index.html
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

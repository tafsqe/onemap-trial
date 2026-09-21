import React from 'react'
import ReactDOM from 'react-dom/client'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// The SQE Suite design-system bundle (_ds_bundle.js) is a plain script that
// expects React and Leaflet as globals — it was authored to be dropped into
// any page via a <script> tag, not bundled as an ES module.
window.React = React
window.ReactDOM = ReactDOM
window.L = L

import './design-system/tokens.css'
import './design-system/_ds_bundle.js'
import './index.css'

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Overview from './pages/Overview.jsx'
import BoundaryCompliance from './pages/BoundaryCompliance.jsx'
import Production from './pages/Production.jsx'
import ObDistance from './pages/ObDistance.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/boundary-compliance" element={<BoundaryCompliance />} />
        <Route path="/production" element={<Production />} />
        <Route path="/ob-distance" element={<ObDistance />} />
      </Routes>
    </BrowserRouter>
  )
}

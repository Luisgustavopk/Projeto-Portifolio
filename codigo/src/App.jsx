import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Sobre from './pages/Sobre.jsx'
import useHashScroll from './hooks/useHashScroll.js'
import { RobotProvider } from './context/RobotContext'

export default function App() {
  const location = useLocation()
  useHashScroll()

  return (
    <RobotProvider>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </RobotProvider>
  )
}
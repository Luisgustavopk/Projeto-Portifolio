import AmbientGlow from './AmbientGlow.jsx'
import Navbar from './Navbar.jsx'
export default function Layout({ children }) {
  return (
    <>
      <AmbientGlow />
      <Navbar />
      {children}
    </>
  )
}

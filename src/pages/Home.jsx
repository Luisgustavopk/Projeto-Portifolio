import AmbientGlow from '../components/layout/AmbientGlow.jsx'
import Navbar from '../components/layout/Navbar.jsx'
import Hero from '../components/sections/Hero.jsx'
import TechStack from '../components/sections/TechStack.jsx'
import Projects from '../components/sections/Projects.jsx'
import Contact from '../components/sections/Contact.jsx'

export default function Home() {
  return (
    <>
      <AmbientGlow />
      <Navbar />
      <Hero />
      <TechStack />
      <Projects />
      <Contact />
    </>
  )
}

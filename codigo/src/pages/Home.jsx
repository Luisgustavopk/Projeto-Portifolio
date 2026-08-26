import { motion } from 'framer-motion'
import Hero from '../components/sections/Hero.jsx'
import TechStack from '../components/sections/TechStack.jsx'
import Projects from '../components/sections/Projects.jsx'
import Contact from '../components/sections/Contact.jsx'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      <Hero />
      <TechStack />
      <Projects />
      <Contact />
    </motion.div>
  )
}

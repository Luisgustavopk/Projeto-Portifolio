import React from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/sections/Hero.jsx'
import TechStack from '../components/sections/TechStack.jsx'
import Projects from '../components/sections/Projects.jsx'
import Contact from '../components/sections/Contact.jsx'
import RecruiterHighlight from '../components/sections/RecruiterHighlight.jsx'
import RobotShowcase from '../components/sections/RobotShowcase.jsx'
import { useRole } from '../context/RoleContext.jsx'
import { useRobot } from '../context/RobotContext.jsx'
import useIsDesktop from '../hooks/useIsDesktop.js'

const BODY_ORDER = {
  visitante: ['techstack', 'projects'],
  tecnico: ['projects', 'techstack'],
  recrutador: ['highlight', 'techstack', 'projects'],
};

const BODY_SECTIONS = {
  techstack: TechStack,
  projects: Projects,
  highlight: RecruiterHighlight,
};

export default function Home() {
  const { role } = useRole();
  const { isRobotVisible } = useRobot();
  const isDesktop = useIsDesktop(768);
  const order = BODY_ORDER[role] || BODY_ORDER.visitante;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      <Hero />

      {order.map((key) => {
        const Section = BODY_SECTIONS[key];
        return (
          <React.Fragment key={key}>
            {key === 'projects' && (
              <RobotShowcase isRobotVisible={isDesktop && isRobotVisible} />
            )}
            <Section />
          </React.Fragment>
        );
      })}

      <Contact />
    </motion.div>
  );
}
import { motion, AnimatePresence } from 'framer-motion';
import RobotCanvas from '../../three/RobotCanvas'; 

export default function RobotShowcase({ isRobotVisible }) {
  return (
    <AnimatePresence>
      {isRobotVisible && (
    <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="w-full max-w-4xl h-[450px] mx-auto my-6 px-4 flex justify-center items-center relative z-20"
        >
          <RobotCanvas />
        </motion.section>
      )}
    </AnimatePresence>
  );
}
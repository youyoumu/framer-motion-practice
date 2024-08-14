import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'

export default function App() {
  const list = { hidden: { opacity: 0.2 } }
  const item = { hidden: { x: -10, opacity: 0 } }
  const hidden = { hidden: { opacity: 0.1 } }

  const x = useMotionValue(0)
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])

  const [flexCol, setFlexCol] = useState(false)

  return (
    <>
      <motion.div
        animate={{ x: 100 }}
        className="bg-red-700 w-64"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.2 }}
        drag="x"
        dragConstraints={{ left: -100, right: 500 }}
      >
        test
      </motion.div>
      <motion.ul animate="hidden" variants={list}>
        <motion.li variants={item}>test</motion.li>
        <motion.li variants={item}>test2</motion.li>
        <motion.li variants={item}>test3</motion.li>
      </motion.ul>
      <motion.div animate="hidden" variants={hidden}>
        hidden
      </motion.div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        while in view
      </motion.div>
      <motion.div initial={false} animate={{ x: 100 }}>
        ssr
      </motion.div>
      <motion.div drag="x" style={{ x, opacity }}>
        motion value
      </motion.div>
      <motion.div
        className={`flex ${flexCol ? 'flex-col' : 'flex-row'}`}
        onClick={() => setFlexCol(!flexCol)}
        layout
      >
        <motion.div>a</motion.div>
        <motion.div>b</motion.div>
      </motion.div>
    </>
  )
}

import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  AnimatePresence
} from 'framer-motion'
import { useState } from 'react'

export default function App() {
  const list = { hidden: { opacity: 0.2 } }
  const item = { hidden: { x: -10, opacity: 0 } }
  const hidden = { hidden: { opacity: 0.1 } }

  const x = useMotionValue(0)
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])

  const [flexCol, setFlexCol] = useState(false)

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' }
  }

  const [isOpen, setIsOpen] = useState(false)

  const x2 = useMotionValue(0)
  const background = useTransform(
    x2,
    [-100, 0, 100],
    ['#ff008c', '#7700ff', 'rgb(230, 255, 0)']
  )

  const { scrollYProgress } = useScroll()

  const [up, setUp] = useState(false)
  return (
    <>
      <motion.div
        animate={{ x: 100 }}
        className="w-64 bg-red-700"
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
      <motion.div
        initial={{ opacity: 0.9, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.1 }}
        className="bg-black size-12"
      />
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ['20%', '20%', '50%', '50%', '20%']
        }}
        className="size-12 bg-slate-500"
      />
      <motion.nav animate={isOpen ? 'open' : 'closed'} variants={variants}>
        <div className="bg-red-500 size-12" />
      </motion.nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-blue-500 size-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen((isOpen) => !isOpen)}>button</button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-red-500 size-12"
      />
      <motion.div
        drag
        dragConstraints={{
          top: -50,
          left: -50,
          right: 50,
          bottom: 50
        }}
        className="bg-red-500 size-12"
      />
      <motion.div style={{ background }} className="size-24">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x: x2 }}
          className="bg-black size-6"
        ></motion.div>
      </motion.div>
      <div className="h-screen"></div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-red-500 size-12"
      />
      <motion.div
        className="fixed top-0 left-0 w-full h-12 origin-left bg-black"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="h-screen"></div>
      {up && (
        <motion.div
          className="bg-green-500 size-12"
          layoutId="test"
        ></motion.div>
      )}
      <div className="size-24"></div>
      {!up && (
        <motion.div
          className="bg-green-500 size-12"
          layoutId="test"
        ></motion.div>
      )}
      <button onClick={() => setUp((up) => !up)}>switch up</button>
      <motion.svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          r={100}
          cx={100}
          cy={100}
          stroke={'#ff00ff'}
          fill={'none'}
          strokeWidth={10}
          transition={{ duration: 1, ease: 'easeInOut', delay: 1 }}
        />
      </motion.svg>
    </>
  )
}

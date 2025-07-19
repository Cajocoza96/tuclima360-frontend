import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ show1, show2, show3, show4, message1, message2, message3, message4 }) {
  return (
    <AnimatePresence>
      {show1 && (
        <motion.div
          key="toast-1"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 
                    bg-[#323232]/95 text-white px-4 py-3 rounded-2xl 
                    shadow-xl flex items-center justify-center 
                    w-fit max-w-sm z-50 backdrop-blur-sm"
        >
          <span className="text-center text-sm md:text-base 2xl:text-3xl font-medium">{message1}</span>
        </motion.div>
      )}

      {show2 && (
        <motion.div
          key="toast-2"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 
                    bg-[#323232]/95 text-white px-4 py-3 rounded-2xl 
                    shadow-xl flex items-center justify-center
                    w-fit max-w-sm z-50 backdrop-blur-sm"
        >
          <span className="text-center text-sm md:text-base 2xl:text-3xl  font-medium">{message2}</span>
        </motion.div>
      )}

      {show3 && (
        <motion.div
          key="toast-3"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 
                    bg-[#323232]/95 text-white px-4 py-3 rounded-2xl 
                    shadow-xl flex items-center justify-center 
                    w-fit max-w-sm z-50 backdrop-blur-sm"
        >
          <span className="text-center text-sm md:text-base 2xl:text-3xl  font-medium">{message3}</span>
        </motion.div>
      )}

      {show4 && (
        <motion.div
          key="toast-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 
                    bg-[#323232]/95 text-white px-4 py-3 rounded-2xl 
                    shadow-xl flex items-center justify-center 
                    w-fit max-w-sm z-50 backdrop-blur-sm"
        >
          <span className="text-center text-sm md:text-base 2xl:text-3xl  font-medium">{message4}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
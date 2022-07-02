import React, { FC, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  visible: boolean;
  type: string;
  setStatus: (status: any) => void;
}

const Toast: FC<Props> = ({ visible, type = "success", setStatus }) => {
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setStatus((prevStatus: any) => ({ ...prevStatus, [type]: false }));
      }, 5000);
    }
  }, [visible, setStatus, type]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -600 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -600 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`fixed top-[10vh] w-max max-w-[93vw] lg:max-w-[40vw] left-0 right-0 mx-auto font-semibold ${
            type.toLowerCase() === "success" ? "bg-primary" : "bg-red-400"
          } text-dark py-2 px-5 drop-shadow-md z-[90]`}
        >
          {type.toLowerCase() === "success"
            ? "Welcome aboard!"
            : "Something went wrong"}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;

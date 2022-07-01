/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import type { FC, ReactNode } from "react";
import Meta from "./Meta";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenuAlt3 } from "react-icons/hi";
import Menu from "@/components/Menu";

interface Props {
  children: ReactNode;
  title: string;
  desc?: string;
  keywords?: string;
}

const Layout: FC<Props> = ({ children, title, desc, keywords }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Meta title={title} desc={desc} keywords={keywords} />
      <nav className="fixed top-0 w-screen border-b-[2px] border-b-[#0E0E0E]">
        <div className="w-full flex items-center justify-between bg-black px-5 py-5 lg:py-5">
          <div className="flex items-center gap-x-2 lg:gap-x-3">
            <img src="/img/logo.svg" alt="logo" className="h-6 lg:h-8" />
            {/* <h2 className="text-2xl font-medium">aerdeets</h2> */}
          </div>
          <HiMenuAlt3
            size={24}
            className="hover:text-primary hover:scale-[0.96] focus:text-primary transition-all cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </nav>
      <main className="w-[92%] lg:w-4/5 mx-auto mt-[11vh]">{children}</main>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-screen h-screen bg-neutral-900 bg-opacity-20 backdrop-blur-md fixed top-0 left-0 z-[99]"
              onClick={() => setIsOpen(false)}
            />
            {/* Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 400 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 400 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="fixed lg:hidden bottom-0 mx-auto w-full lg:w-3/6 left-0 right-0 bg-dark drop-shadow-md px-5 py-4 z-[999]"
            >
              <Menu onClose={onClose} />
            </motion.div>
            {/* Desktop */}
            <motion.div
              initial={{ opacity: 0, y: -400 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -400 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="fixed hidden lg:block top-0 bottom-auto mx-auto w-full lg:w-3/6 left-0 right-0 bg-dark drop-shadow-md px-5 py-4 z-[999]"
            >
              <Menu onClose={onClose} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Layout;

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from "react";
import type { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenuAlt3, HiOutlineChevronUp } from "react-icons/hi";
import Meta from "./Meta";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

interface Props {
  children: ReactNode;
  title: string;
  desc?: string;
  keywords?: string;
  image?: string;
}

const Layout: FC<Props> = ({ children, title, desc, keywords, image }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setScroll] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
  };

  // Top ref
  const topRef = useRef<HTMLDivElement>(null);

  // Scroll to top
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <>
      <Meta title={title} desc={desc} keywords={keywords} image={image} />
      <nav className="fixed top-0 w-screen border-b-[2px] border-b-[#121212] z-[99]">
        <div className="w-full flex items-center justify-between bg-black px-5 py-5 lg:px-8 lg:py-5">
          <div
            className="flex items-center gap-x-2 lg:gap-x-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <img src="/img/logo_green.svg" alt="logo" className="h-6 lg:h-8" />
            <h2 className="text-2xl lg:text-3xl font-medium">aerdeets</h2>
          </div>
          <HiMenuAlt3
            size={24}
            className="hover:text-primary hover:scale-[0.96] focus:text-primary transition-all cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </nav>
      <main
        className="w-[92%] lg:w-4/5 mx-auto mt-[11vh] lg:mt-[11vh]"
        ref={topRef}
      >
        {children}
        <Footer />
      </main>

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
              transition={{ duration: 0.3, delay: 0.02 }}
              className="fixed lg:hidden bottom-0 mx-auto w-full lg:w-3/6 left-0 right-0 bg-dark drop-shadow-md px-5 py-4 z-[999]"
            >
              <Menu onClose={onClose} />
            </motion.div>
            {/* Desktop */}
            <motion.div
              initial={{ opacity: 0, y: -400 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -400 }}
              transition={{ duration: 0.3, delay: 0.02 }}
              className="fixed hidden lg:block top-0 bottom-auto mx-auto w-full lg:w-3/6 left-0 right-0 bg-dark drop-shadow-md px-5 py-4 z-[999]"
            >
              <Menu onClose={onClose} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FLOATING */}
      <div className="fixed bottom-5 right-5 z-[99] flex flex-col">
        <AnimatePresence>
          {scroll && (
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center bg-secondary text-dark hover:bg-opacity-40 hover:text-secondary transition-all p-4"
              onClick={scrollToTop}
            >
              <HiOutlineChevronUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
        <button
          name="floating-button"
          type="button"
          className="bg-primary drop-shadow-md p-4"
          onClick={() => setIsOpen(true)}
        >
          <HiMenuAlt3 size={24} className="text-neutral-900" />
        </button>
      </div>
    </>
  );
};

export default Layout;

import React, { FC, Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import {
  FaFacebookF,
  FaTelegram,
  FaTelegramPlane,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { IArticle } from "@/utils/types.util";
import { SITE_URL } from "@/config/api.config";

interface Props {
  article: IArticle;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const ShareBubble: FC<Props> = ({ article, visible, setVisible }) => {
  const Slug = article?.slug;
  const Title = article?.title;
  return (
    <AnimatePresence>
      {visible && (
        <>
          {" "}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            <div className="absolute -bottom-[3.5rem] right-2 flex justify-evenly gap-x-6 text-neutral-900 bg-primary py-4 px-6 shadow-md z-[1001]">
              <FacebookShareButton url={`${SITE_URL}/${Slug}`} quote={Title}>
                <FaFacebookF size={18} />
              </FacebookShareButton>
              <TwitterShareButton
                url={`${SITE_URL}/${Slug}`}
                title={Title}
                related={[]}
              >
                <FaTwitter size={18} />
              </TwitterShareButton>
              <WhatsappShareButton
                url={`${SITE_URL}/${Slug}`}
                title={Title}
                separator=" - "
              >
                <FaWhatsapp size={18} />
              </WhatsappShareButton>
              <TelegramShareButton url={`${SITE_URL}/${Slug}`} title={Title}>
                <FaTelegramPlane size={18} />
              </TelegramShareButton>
            </div>
          </motion.div>
          {/* BG */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-screen h-screen bg-neutral-900 bg-opacity-20 backdrop-blur-sm fixed top-0 left-0 z-[1000]"
            onClick={() => setVisible(false)}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareBubble;

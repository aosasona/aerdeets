import React, { FC } from "react";
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
}

const ShareBubble: FC<Props> = ({ article, visible }) => {
  const Slug = article?.slug;
  const Title = article?.title;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          <div className="absolute -bottom-[3.5rem] right-2 flex justify-evenly gap-x-6 text-neutral-900 bg-primary py-4 px-6 shadow-md z-[80]">
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
      )}
    </AnimatePresence>
  );
};

export default ShareBubble;

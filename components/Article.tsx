/* eslint-disable @next/next/no-img-element */
import { IArticle } from "@/utils/types.util";
import Link from "next/link";
import type { FC } from "react";
import Moment from "react-moment";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  article: IArticle;
}

const Article: FC<Props> = ({ article }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="flex flex-col gap-4 transition-all py-1"
      >
        <img
          src={article?.image?.url || "/img/default.jpg"}
          alt={article?.title || ""}
          className="w-full aspect-video object-cover rounded-xl"
        />
        <div className="px-1">
          <div className="flex items-center gap-3">
            {article?.category && (
              <Link href={`/category/${article?.category?.slug}`}>
                <div className="w-max bg-primary hover:bg-secondary text-neutral-900 text-xs font-semibold uppercase -skew-x-6 cursor-pointer transition-all px-2 py-[2px]">
                  {article?.category?.name}
                </div>
              </Link>
            )}
            <Moment
              date={article?.createdAt}
              format="D MMMM YYYY"
              className="text-primary text-opacity-50 text-xs font-medium lg:text-sm"
            />
          </div>
          <Link href={`/${article?.slug}`}>
            <h1 className="text-[1.8rem] lg:text-3xl text-neutral-300 hover:text-primary hover:underline hover:underline-offset-2 hover:-skew-x-6 transition-all font-bold cursor-pointer leading-tight lg:leading-snug mt-2">
              {article?.title}
            </h1>
          </Link>
          <h4 className="text-xs font-medium text-neutral-500 mt-1 lg:mt-2">
            {article?.description?.slice(0, 100) ||
              article?.content?.text?.slice(0, 100)}
            {(article?.description && article?.description?.length > 100) ||
            (article?.content?.text && article?.content?.text?.length > 100) ? (
              <>
                ... <Link href={`/${article?.slug}`}>read more</Link>
              </>
            ) : (
              ""
            )}
          </h4>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Article;

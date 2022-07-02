/* eslint-disable @next/next/no-img-element */
import type { FC } from "react";
import { useRouter } from "next/router";
import { IArticle } from "@/utils/types.util";
import Link from "next/link";
import Moment from "react-moment";

interface Props {
  article: IArticle;
}

const FeaturedCard: FC<Props> = ({ article }) => {
  const router = useRouter();
  return (
    <div
      className="w-full lg:w-2/6 mx-auto grid grid-cols-12 items-center cursor-pointer gap-x-3 lg:gap-x-3 py-8 px-2"
      onClick={() => router.push(`/${article?.slug}`)}
    >
      <img
        src={article?.image?.url || "/img/default.jpg"}
        alt={article?.title || ""}
        className="w-full col-span-4 aspect-square object-cover rounded-xl"
      />
      <div className="col-span-8 h-full flex flex-col items-start justify-evenly gap-y-1 py-1">
        <h2 className="font-semibold text-left">{article?.title}</h2>

        <div className="">
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
            className="text-primary text-opacity-50 text-xs lg:text-sm font-medium"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;

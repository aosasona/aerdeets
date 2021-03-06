/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { gql } from "graphql-request";
import Layout from "@/defaults/Layout";
import Link from "next/link";
import graphqlClient from "@/utils/graphql.util";
import { IArticle } from "@/utils/types.util";
import { FiShare } from "react-icons/fi";
import { useRouter } from "next/router";
import { DiscussionEmbed } from "disqus-react";
import Moment from "react-moment";
import parse from "html-react-parser";
import RecommendedCard from "@/components/RecommendedCard";
import ShareBubble from "@/components/ShareBubble";
import Back from "@/components/Back";

interface Props {
  article: IArticle;
  recommended: IArticle[];
}

const ArticlePage: NextPage<Props> = ({ article, recommended }) => {
  const router = useRouter();

  const [share, setShare] = useState<boolean>(false);

  // Disqus config
  const disqus = {
    shortname: "aerdeets",
    config: {
      url: `https://aerdeets.com${router.asPath}`,
      identifier: article?.slug,
      title: article?.title,
    },
  };

  // Disable scrolling on body when share is open
  useEffect(() => {
    if (share) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [share]);

  return (
    <Layout
      title={article?.title}
      desc={article?.description || article?.content.html}
      keywords={article?.keywords || ""}
      image={article?.image?.url || "/img/default.jpg"}
    >
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8">
        {/* CONTENT */}
        <section className="lg:col-span-8">
          <Back>Back</Back>

          {/* AUTHOR, CATEGORY AND DATE */}
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-x-2">
              <img
                src={article?.createdBy?.picture || "/img/default.jpg"}
                alt={article?.createdBy?.name || ""}
                className="w-[3.1rem] aspect-square rounded-full border-[3px] border-primary"
              />
              <div className="flex flex-col gap-1">
                <p className="text-neutral-300 text-sm font-medium">
                  {article?.createdBy?.name || ""}
                </p>
                <div className="flex items-center gap-3">
                  {article?.category && (
                    <Link href={`/category/${article?.category?.slug}`}>
                      <div className="w-max bg-primary hover:bg-secondary text-neutral-900 text-[11px] font-semibold uppercase -skew-x-6 cursor-pointer transition-all px-2 pt-[2px]">
                        {article?.category?.name}
                      </div>
                    </Link>
                  )}
                  <Moment
                    date={article?.createdAt}
                    format="D MMMM YYYY"
                    className="text-neutral-600 text-xs font-semibold "
                  />
                </div>
              </div>
            </div>

            {/* SHARE */}
            <div className="h-max relative">
              <button
                onClick={() => setShare(!share)}
                className="text-neutral-300 hover:text-primary share-cta transition-all p-2"
              >
                <FiShare size={16} />
              </button>
              <ShareBubble
                article={article}
                visible={share}
                setVisible={setShare}
              />
            </div>
          </div>

          {/* TITLE */}
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary">
            {article?.title}
          </h1>

          {/* IMAGE */}
          <img
            src={article?.image?.url || "/img/default.jpg"}
            alt={article?.title || ""}
            className="w-full aspect-video object-cover rounded-xl my-5"
          />

          <div className="article-body text-neutral-300 whitespace-pre-line">
            {parse(article?.content?.html || "")}
          </div>
        </section>

        {/* SIDEBAR */}
        <section className="lg:col-span-4 sticky-el">
          <>
            {recommended?.length > 0 && (
              <>
                {/* border-l-4 border-l-primary px-3 */}
                <h1 className="text-2xl lg:text-3xl text-neutral-700 font-bold py-1">
                  More From Aerdeets
                </h1>

                {/* RECOMMENDED */}
                <div className="grid grid-cols-1 gap-1 lg:gap-2 mt-3 lg:mt-4">
                  {recommended.map((article: IArticle, index: number) => (
                    <RecommendedCard article={article} key={index} />
                  ))}
                </div>
              </>
            )}
            {/* DISQUS */}
            <DiscussionEmbed
              shortname={disqus.shortname}
              config={disqus.config}
            />
          </>
        </section>
      </main>
    </Layout>
  );
};

//  Interface for slug param
interface IParams extends ParsedUrlQuery {
  slug: string;
}

// Get articles
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx?.params as IParams;

  const query = gql`
        {
        article(where: { slug: "${slug}" }) {
            title
            slug
            description
            category {
              name
              slug
            }
            content {
              html
            }
            image {
              url
            }
            createdBy {
                name
                picture
            }
            keywords
            featured
            createdAt
        }
        }
    `;

  const data = await graphqlClient.request(query);

  // Get 3 recommended articles
  const recommendedQuery = gql`
  {
    articles(where: {slug_not: "${slug}"}, first:3) {
        title
        slug
        category {
            name
            slug
          }
        image {
            url
        }
        createdAt
    }
}`;

  const recommendedData = await graphqlClient.request(recommendedQuery);

  return {
    props: {
      article: data?.article,
      recommended: recommendedData?.articles,
    },
    revalidate: 10,
  };
};

// Get Paths
export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
    {
      articles(orderBy: createdAt_DESC) {
        id
        slug
      }
    }
  `;

  interface IArticlePaths {
    slug: string;
  }

  const { articles } = await graphqlClient.request(query);

  const paths = articles.map((article: IArticlePaths) => ({
    params: { slug: article?.slug },
  }));

  return { paths, fallback: "blocking" };
};

export default ArticlePage;

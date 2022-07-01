/* eslint-disable @next/next/no-img-element */
import Layout from "@/defaults/Layout";
import Meta from "@/defaults/Meta";
import type { NextPage } from "next";
import { gql } from "graphql-request";
import graphqlClient from "@/utils/graphql.util";
import { IArticle } from "@/utils/types.util";
import Link from "next/link";
import Moment from "react-moment";

interface Props {
  articles: IArticle[];
}

const Home: NextPage<any> = ({ articles }) => {
  return (
    <Layout title="Home">
      {articles?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-8">
          {articles.map((article: IArticle, index: number) => (
            <div key={index} className="flex flex-col gap-4 py-1">
              <img
                src={article?.image?.url}
                alt={article?.title || ""}
                className="w-full aspect-video object-cover rounded-xl"
              />
              <div className="px-1">
                <div className="flex items-center gap-3">
                  {article?.category && (
                    <Link href={`/category/${article?.category?.slug}`}>
                      <div className="w-max bg-primary hover:bg-secondary text-neutral-900 text-xs font-semibold -skew-x-6 cursor-pointer transition-all px-2 py-1">
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
                  <h1 className="text-3xl text-neutral-500 hover:text-primary hover:underline hover:underline-offset-2 font-bold cursor-pointer transition-all mt-2">
                    {article?.title}
                  </h1>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="w-full text-center text-neutral-600 py-10">
          No articles found
        </p>
      )}
    </Layout>
  );
};

export async function getStaticProps() {
  const query = gql`
    {
      articles(orderBy: createdAt_DESC) {
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
        createdAt
      }
    }
  `;
  const data = await graphqlClient.request(query);

  return {
    props: {
      articles: data?.articles,
    },
  };
}

export default Home;

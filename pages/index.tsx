/* eslint-disable @next/next/no-img-element */
import Layout from "@/defaults/Layout";
import Meta from "@/defaults/Meta";
import type { NextPage } from "next";
import { gql } from "graphql-request";
import graphqlClient from "@/utils/graphql.util";
import { IArticle } from "@/utils/types.util";
import Link from "next/link";
import Moment from "react-moment";
import Article from "@/components/Article";

interface Props {
  articles: IArticle[];
}

const Home: NextPage<any> = ({ articles }) => {
  return (
    <Layout title="Home">
      {articles?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {articles.map((article: IArticle, index: number) => (
            <Article article={article} key={index} />
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
    revalidate: 10,
  };
}

export default Home;

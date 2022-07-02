/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect } from "react";
import Layout from "@/defaults/Layout";
import type { NextPage } from "next";
import { gql } from "graphql-request";
import graphqlClient from "@/utils/graphql.util";
import { IArticle } from "@/utils/types.util";
import Link from "next/link";
import Moment from "react-moment";
import Article from "@/components/Article";
import { PAGE_LIMIT } from "config/article.config";
import { GlobalContext } from "@/context/GlobalContext";

interface Props {
  articles: IArticle[];
}

const Home: NextPage<any> = ({ articles }) => {
  const { dispatch } = useContext(GlobalContext);

  useEffect(() => {
    dispatch({
      type: "SET_ARTICLES",
      payload: articles,
    });
  }, [articles, dispatch]);

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
      articles(orderBy: createdAt_DESC, stage: PUBLISHED) {
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
        featured
        createdAt
      }
    }
  `;
  const data = await graphqlClient.request(query);

  let featured: IArticle[] = [];

  if (data?.articles?.length > 0) {
    featured = data.articles.filter((article: IArticle) => article.featured);
  }

  return {
    props: {
      articles: data?.articles,
      featured: featured,
    },
    revalidate: 10,
  };
}

export default Home;

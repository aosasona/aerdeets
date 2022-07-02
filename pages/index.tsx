/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect } from "react";
import type { NextPage } from "next";

import { gql } from "graphql-request";
import Layout from "@/defaults/Layout";
import graphqlClient from "@/utils/graphql.util";
import { IArticle } from "@/utils/types.util";

import Article from "@/components/Article";
import { PAGE_LIMIT } from "config/article.config";
import { GlobalContext } from "@/context/GlobalContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import FeaturedCard from "@/components/FeaturedCard";

interface Props {
  articles: IArticle[];
  featured: IArticle[];
}

const Home: NextPage<any> = ({ articles, featured }) => {
  const { dispatch } = useContext(GlobalContext);

  useEffect(() => {
    dispatch({
      type: "SET_ARTICLES",
      payload: articles,
    });
  }, [articles, dispatch]);

  return (
    <Layout title="Home">
      {featured.length > 0 && (
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          interval={5000}
          className="py-1 mb-4"
        >
          {featured.map((article: IArticle, index: number) => (
            <FeaturedCard article={article} key={index} />
          ))}
        </Carousel>
      )}
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

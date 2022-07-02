/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
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
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Props {
  articles: IArticle[];
  featured: IArticle[];
}

const Home: NextPage<any> = ({ articles, featured }) => {
  const { dispatch } = useContext(GlobalContext);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(
    articles.length > 0 ? Math.ceil(articles.length / PAGE_LIMIT) : 1
  );

  // Get current page articles
  const currentArticles = articles.slice(
    (currentPage - 1) * PAGE_LIMIT,
    currentPage * PAGE_LIMIT
  );

  // Previous page
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Next page
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    dispatch({
      type: "SET_ARTICLES",
      payload: articles,
    });
  }, [articles, dispatch]);

  return (
    <Layout title="Home">
      {/* SECTION TITLE */}
      {/* <CategoryTitle>Featured</CategoryTitle> */}
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
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8">
            {currentArticles.map((article: IArticle, index: number) => (
              <Article article={article} key={index} />
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="grid grid-cols-3 items-center py-8 lg:py-6 lg:mt-10">
              {currentPage > 1 ? (
                <button
                  className="flex items-center place-self-start gap-1 text-primary font-semibold hover:text-secondary transition-all"
                  onClick={previousPage}
                >
                  <FiChevronLeft />
                  <p>Previous</p>
                </button>
              ) : (
                <div></div>
              )}
              <div className="self-center place-self-center">
                <button
                  title="Go to page 1"
                  className="w-10 aspect-square bg-primary text-neutral-900 font-semibold"
                  onClick={() => setCurrentPage(1)}
                >
                  {currentPage}
                </button>
              </div>
              {currentPage < totalPages ? (
                <button
                  className="flex items-center place-self-end gap-1 text-primary font-semibold hover:text-secondary transition-all"
                  onClick={nextPage}
                >
                  <p>Next</p>
                  <FiChevronRight />
                </button>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </>
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
        category {
          name
          slug
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

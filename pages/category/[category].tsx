/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { gql } from "graphql-request";
import graphqlClient from "@/utils/graphql.util";
import Layout from "@/defaults/Layout";
import { IArticle } from "@/utils/types.util";
import Article from "@/components/Article";
import { PAGE_LIMIT } from "config/article.config";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Props {
  articles: IArticle[];
  category_name: string;
}

const Category: NextPage<Props> = ({ articles, category_name }) => {
  const router = useRouter();
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
  return (
    <Layout title={category_name}>
      <h1 className="text-3xl font-bold text-neutral-700">{category_name}</h1>
      <button
        onClick={() => router.push("/")}
        className="flex text-primary text-sm hover:text-secondary items-center font-semibold gap-1 my-4"
      >
        <FiChevronLeft />
        <p>Home</p>
      </button>
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

//  Interface for slug param
interface IParams extends ParsedUrlQuery {
  category: string;
}

// Get paths
export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
    {
      categories {
        slug
      }
    }
  `;

  interface ICategoryPaths {
    slug: string;
  }

  const { categories } = await graphqlClient.request(query);

  const paths = categories.map((category: ICategoryPaths) => ({
    params: { category: category?.slug },
  }));

  return { paths, fallback: false };
};

// Get articles
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { category } = ctx?.params as IParams;

  const query = gql`{
    articles(where: {category: {slug: "${category}"}}, orderBy: createdAt_DESC, stage: PUBLISHED) {
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
      }}
    `;

  const { articles } = await graphqlClient.request(query);

  return {
    props: {
      articles,
      category_name:
        category.split("-").join(" ").charAt(0).toUpperCase() +
        category.split("-").join(" ").slice(1),
    },
  };
};

export default Category;

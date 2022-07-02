import { useState } from "react";
import type { FormEvent } from "react";
import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import { useRouter } from "next/router";
import { gql } from "graphql-request";
import Link from "next/link";
import graphqlClient from "@/utils/graphql.util";
import { IArticle } from "@/utils/types.util";
import { PAGE_LIMIT } from "config/article.config";
import Layout from "@/defaults/Layout";
import Article from "@/components/Article";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import Back from "@/components/Back";

interface Props {
  articles: IArticle[];
  searchQuery: string;
}

const Search: NextPage<Props> = ({ articles, searchQuery }) => {
  const router = useRouter();

  // TODO: USE CACHE DATA FROM CONTEXT IF AVAILABLE

  const [query, setQuery] = useState<string>("");
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
  };
  return (
    <Layout title={`Search - ${searchQuery || ""}`}>
      <h1 className="text-3xl font-bold text-neutral-700">Search</h1>
      {searchQuery && (
        <p className="text-xs text-neutral-400 px-1 my-1">
          Showing results for{" "}
          <span className="text-primary underline underline-offset-2">
            {searchQuery}
          </span>
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-3/6 flex col-span-3 xl:col-span-4 my-3"
      >
        <input
          type="search"
          name="q"
          placeholder="What are you looking for?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-neutral-900 text-base text-primary focus:outline-none placeholder-neutral-700 rounded-none px-3"
        />
        <button className="bg-primary text-neutral-900 hover:bg-secondary focus:bg-secondary p-3 transition-all">
          <FiSearch size={20} />
        </button>
      </form>

      {/* BACK */}
      <Back>Back</Back>

      {/* SEARCH RESULTS */}
      {articles?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8 mt-4">
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
          {!searchQuery ? (
            "No search query"
          ) : (
            <>
              No results for{" "}
              <span className="text-primary underline underline-offset-2">
                {searchQuery}
              </span>
            </>
          )}
        </p>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  // Cache control
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const { query } = ctx;

  const queryString = query?.q as string;

  // IF there is no query
  if (!queryString) {
    return {
      props: {
        articles: [],
        searchQuery: "",
      },
    };
  }

  const graphQuery = gql`
    {
      articles(where: { _search: "${queryString}" }) {
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
    }
  `;

  const { articles } = await graphqlClient.request(graphQuery);

  return {
    props: {
      articles,
      searchQuery: queryString,
    },
  };
};

export default Search;

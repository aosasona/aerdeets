import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "@/defaults/Layout";
import { FiChevronLeft } from "react-icons/fi";

const NotFound: NextPage = () => {
  const router = useRouter();
  return (
    <Layout title="404">
      <main className="flex flex-col w-full h-[70vh] items-center justify-center gap-y-4">
        <h1 className="text-[8rem] lg:text-[9rem] leading-normal text-neutral-800 font-bold">
          404
        </h1>

        <p className="text-neutral-600">Oops! this page does not exist.</p>

        <button
          onClick={() => router.push("/")}
          className="flex items-center bg-primary text-neutral-900 hover:bg-secondary text-sm font-semibold px-4 py-3 mt-5 gap-x-1 hover:gap-x-8 transition-all"
        >
          <FiChevronLeft size={16} />
          <p>Go Back</p>
        </button>
      </main>
    </Layout>
  );
};

export default NotFound;

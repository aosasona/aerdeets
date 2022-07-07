import { useContext, useState } from "react";
import type { FC } from "react";
import Link from "next/link";
import { GlobalContext } from "@/context/GlobalContext";
import { BsX } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import Loader from "./Loader";
import { ICategories } from "@/utils/types.util";

interface Props {
  onClose: () => void;
}

const Menu: FC<Props> = ({ onClose }) => {
  const { state } = useContext(GlobalContext);

  const [search, setSearch] = useState("");

  return (
    <>
      <div className="flex items-center justify-between border-b-[1px] border-b-neutral-800 pb-4 px-1">
        <h2 className="text-primary font-bold text-xl">Menu</h2>
        <BsX
          size={23}
          onClick={onClose}
          className="hover:text-red-500 cursor-pointer"
        />
      </div>
      {state.categories_loading || state.categories < 1 ? (
        <div className="w-full flex justify-center items-center h-[10vh]">
          <Loader />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-3 lg:gap-y-7 py-8 px-1">
            <form
              action="/search"
              className="w-full flex col-span-3 xl:col-span-4"
            >
              <input
                type="search"
                name="q"
                placeholder="What are you looking for?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
                minLength={3}
                className="w-full bg-neutral-900 text-base text-primary focus:outline-none placeholder-neutral-700 rounded-none px-3"
              />
              <button
                name="search"
                type="submit"
                className="bg-primary text-neutral-900 hover:bg-secondary focus:bg-secondary p-3 transition-all"
              >
                <FiSearch size={20} />
              </button>
            </form>
            {/* HOME */}
            <p className="text-neutral-300 hover:text-primary hover:underline hover:underline-offset-4 transition-all px-3 lg:px-4">
              <Link href="/">Home</Link>
            </p>
            {state.categories.map((category: ICategories, index: number) => (
              <div key={index} className="px-3 lg:px-4">
                <p className="text-neutral-300 hover:text-primary hover:underline hover:underline-offset-4 transition-all">
                  <Link href={`/category/${category.slug}`}>
                    {category.name}
                  </Link>{" "}
                </p>
              </div>
            ))}
          </div>
          <h5 className="text-neutral-500 text-center text-xs tracking-wider pt-2 pb-4">
            Built by{" "}
            <a
              href="https://twitter.com/trulyao"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400"
            >
              Ayodeji
            </a>
          </h5>
        </>
      )}
    </>
  );
};

export default Menu;

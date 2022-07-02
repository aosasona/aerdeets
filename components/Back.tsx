import React from "react";
import { FC } from "react";
import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";

interface Props {
  children: React.ReactNode;
}

const Back: FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex text-primary text-sm hover:text-secondary items-center font-semibold gap-1 my-4"
    >
      <FiChevronLeft />
      <p>{children}</p>
    </button>
  );
};

export default Back;

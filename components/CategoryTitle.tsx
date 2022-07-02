import { ReactNode, FC } from "react";

interface Props {
  children: ReactNode;
}

const CategoryTitle: FC<Props> = ({ children }) => {
  return (
    <h2 className="w-max uppercase font-bold border-2 border-white opacity-25 px-4 py-1">
      {children}
    </h2>
  );
};

export default CategoryTitle;

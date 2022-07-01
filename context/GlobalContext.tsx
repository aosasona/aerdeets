import { createContext, useReducer, useEffect } from "react";
import type { FC } from "react";
import { gql } from "graphql-request";
import graphqlClient from "@/utils/graphql.util";
import reducer from "@/utils/reducer.util";

const GlobalContext = createContext<any>(null);
const { Provider } = GlobalContext;

const GlobalProvider: FC<any> = ({ children }) => {
  const initialState = {
    categories: [],
    categories_loading: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const query = gql`
      {
        categories(orderBy: name_ASC) {
          name
          slug
        }
      }
    `;

    graphqlClient
      .request(query)
      .then((data) => {
        dispatch({
          type: "SET_CATEGORIES",
          payload: data.categories,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </Provider>
  );
};

export { GlobalContext, GlobalProvider };

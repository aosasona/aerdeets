import { IAction, IState } from "./types.util";

const cases = {
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_ARTICLES: "SET_ARTICLES",
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case cases.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        categories_loading: false,
      };
    case cases.SET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

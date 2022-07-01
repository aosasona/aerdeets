import { IAction, IState } from "./types.util";

const cases = {
  SET_CATEGORIES: "SET_CATEGORIES",
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case cases.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        categories_loading: false,
      };
    default:
      return state;
  }
};

export default reducer;

export interface ICategories {
  name: string;
  slug: string;
}

export interface IState {
  categories: ICategories[];
  categories_loading: boolean;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IArticle {
  title: string;
  slug: string;
  description: string | null;
  category: ICategories;
  content: {
    html: string;
  };
  image: {
    url: string;
  };
  createdAt: string;
}

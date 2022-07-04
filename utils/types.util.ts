export interface ICategories {
  name: string;
  slug: string;
}

export interface IState {
  articles: IArticle[];
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
    text?: string;
  };
  image: {
    url: string;
  };
  createdBy: {
    name: string;
    picture: string;
  };
  featured: boolean;
  keywords?: string;
  createdAt: string;
}

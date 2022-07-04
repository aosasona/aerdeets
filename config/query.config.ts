import { gql } from "graphql-request";

export const allQuery = gql`
  {
    articles(orderBy: createdAt_DESC, stage: PUBLISHED) {
      title
      slug
      category {
        name
        slug
      }
      description
      content {
        text
      }
      image {
        url
      }
      featured
      createdAt
    }
  }
`;

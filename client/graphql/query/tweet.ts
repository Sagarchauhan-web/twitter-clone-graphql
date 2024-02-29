export const getAllTweetsQuery = `#graphql
  query GetAllTweets {
    getAllTweets {
      id
      content
      imageURL
      author {
        firstName
        lastName
        profileImageUrl
      }
    }
  }`;

export const createTweetMutation = `#graphql
  mutation createTweet($payload: CreateTweetData!) {
  createTweet(payload: $payload) {
    content
    id
    author {
      id
      email
    }
  }
}
`;

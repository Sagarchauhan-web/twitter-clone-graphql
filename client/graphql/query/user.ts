export const verifyUserGoogleTokenQuery = `#graphql
  query verifyGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`;

export const getCurrentUserQuery = `#graphql
  query GetCurrentUser {
    getCurrentUser {
      email
      id
      profileImageUrl
      firstName
      lastName
      tweets {
        id
        content
        author {
          firstName
          lastName
          profileImageUrl
        }
      }
    }
}
`;

export const getUserByIdQuery = `#graphql
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      email
      id
      profileImageUrl
      firstName
      lastName
      tweets {
        id
        content
        author {
          firstName
          lastName
          profileImageUrl
        }
      }
    }
  }
`;

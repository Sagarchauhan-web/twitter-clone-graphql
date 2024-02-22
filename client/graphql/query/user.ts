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
    }
}
`;

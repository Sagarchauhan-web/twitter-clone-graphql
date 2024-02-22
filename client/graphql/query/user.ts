export const verifyUserGoogleTokenQuery = `#graphql
  query verifyGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`;

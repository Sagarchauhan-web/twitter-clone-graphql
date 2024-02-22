const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleToken = token;

    return token;
  },
};

export const resolvers = { queries };

import { Tweet } from '@prisma/client';
import { prismaClient } from '../../clients/db';
import { GraphqlContext } from '../../interfaces';

interface CreateTweetData {
  content: string;
  imageURL?: string;
}

const queries = {
  getAllTweets: async (parent: any, args: any, ctx: GraphqlContext) => {
    // if (!ctx.user || !ctx.user.id) {
    //   throw new Error('You must be logged in to get all tweets');
    // }
    const tweets = await prismaClient.tweet
      .findMany
      //   {
      //   // where: { authorId: ctx.user.id },
      //   // orderBy: { createdAt: 'desc' },
      // }
      ();

    return tweets;
  },
};

const mutations = {
  createTweet: async (
    parent: any,
    { payload }: { payload: CreateTweetData },
    ctx: GraphqlContext,
  ) => {
    if (!ctx.user) throw new Error('You must be logged in to create a tweet');
    const { content, imageURL } = payload;

    const tweet = await prismaClient.tweet.create({
      data: {
        content,
        imageURL,
        author: { connect: { id: ctx.user.id } },
      },
    });

    return tweet;
  },
};

const extraResolver = {
  Tweet: {
    author: async (parent: Tweet) => {
      const author = await prismaClient.user.findUnique({
        where: { id: parent.authorId },
      });

      return author;
    },
  },
};

export const resolvers = {
  mutations,
  queries,
  extraResolver,
};

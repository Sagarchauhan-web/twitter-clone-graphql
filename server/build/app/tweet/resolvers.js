"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const db_1 = require("../../clients/db");
const queries = {
    getAllTweets: (parent, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        // if (!ctx.user || !ctx.user.id) {
        //   throw new Error('You must be logged in to get all tweets');
        // }
        const tweets = yield db_1.prismaClient.tweet
            .findMany();
        return tweets;
    }),
};
const mutations = {
    createTweet: (parent, { payload }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        if (!ctx.user)
            throw new Error('You must be logged in to create a tweet');
        const { content, imageURL } = payload;
        const tweet = yield db_1.prismaClient.tweet.create({
            data: {
                content,
                imageURL,
                author: { connect: { id: ctx.user.id } },
            },
        });
        return tweet;
    }),
};
const extraResolver = {
    Tweet: {
        author: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const author = yield db_1.prismaClient.user.findUnique({
                where: { id: parent.authorId },
            });
            return author;
        }),
    },
};
exports.resolvers = {
    mutations,
    queries,
    extraResolver,
};

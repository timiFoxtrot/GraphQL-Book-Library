import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerErrorCode } from '@apollo/server/errors';
import typeDefs from "./schema";
import resolvers from "./resolver";
import mongoose from "mongoose";
import { getUser } from "./business-logic/users-logic";
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/graphQl-books");
mongoose.connection.on("connected", function () {
    console.log("db connected successfully");
});
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError, error) => {
        // Return a different error message
        if (formattedError.extensions.code ===
            ApolloServerErrorCode.BAD_USER_INPUT) {
            return {
                // ...formattedError,
                message: formattedError.message,
            };
        }
        // Otherwise return the formatted error. This error can also
        // be manipulated in other ways, as long as it's returned.
        return { message: formattedError.message };
    }
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
        const token = req.headers.authorization || "";
        if (token) {
            const user = await getUser(token);
            return { user };
        }
    },
});
console.log(`🚀  Server ready at: ${url}`);

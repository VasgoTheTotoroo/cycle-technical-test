import { sequelize } from "models/index.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "graphql/schemas/index.js";
import { resolvers } from "graphql/resolvers/index.js";

// Connect to the database
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error connecting to database:", err));

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(apolloServer, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

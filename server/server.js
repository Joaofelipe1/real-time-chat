const { GraphQLServer} = require('graphql-yoga');

const typeDefs = `
    type Message {
        id: ID!
        user: String!
        content: String!

    }

    type Query {
        messages: [Messages!]
    }
`

const server = new GraphQLServer();
server.start(({port})=>{
    console.log(`Server on http://localhost:${port}`)
});
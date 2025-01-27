import {ApolloServer, gql} from 'apollo-server'


const typeDefs = gql`
    type Query{
        greet:String
    }
`

const resolvers = {
    Query:{
        greet:()=>{
            return "Hello world"
        }
    }
}



const server = new ApolloServer({ typeDefs, resolvers});

server.listen().then(({ url })=> {
    console.log( `Server ready at ${url}`);
});
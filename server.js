import {ApolloServer, gql} from 'apollo-server'
import { error } from 'console'
import {randomUUID} from 'crypto'
import { title } from 'process'

const users = [
    { 
        id: 1,
        firstName: "joao",
        lastName: "felipe",
        email: "felipe@gmail.com",
        password: "12345"
    },
    {
        id: 2,
        firstName: "daniel",
        lastName: "robert",
        email: "robert@gmail.com",
        password: "34656"
    }
]

const Todos = [
    {
        title:"buy book",
        by: 1
    },
    {
        title:"write code",
        by: 1 
    },
    {
        title:"record video",
        by: 2
    }
]

const typeDefs = gql`
    type Query{
        users:[User]
        user(id:ID!):User
    }

    input UserInput{
        firstName:String!
        lastName:String!
        email:String!
        password:String!
    }

    type Mutation{
        createUser(userNew:UserInput!):User
    }

    type User{
        id:ID!
        firstName:String!
        lastName:String!
        email:String!
        todos:[Todo]
    }

    type Todo {
        title:String!
        by:ID!
    }
`

const resolvers = {
    Query:{
        users:()=>users,
        user:(_, {id}, {userLoggedIn})=>{
            if(!userLoggedIn) throw new Error("You are not logged in")
            return users.find(item=>item.id == id)    
        }
    },
    User:{
        todos:(parent)=>{
            return Todos.filter(todo=>todo.by == parent.id)
        }
    },
    Mutation:{
        createUser:(_,{userNew})=>{
        const newUser = {
            id:crypto.randomUUID(),
                ...userNew
        }
            users.push(newUser)
            return newUser;
        }
    }
}



const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    context:{
        userLoggedIn: true
    }
});

server.listen().then(({ url })=> {
    console.log( `Server ready at ${url}`);
});
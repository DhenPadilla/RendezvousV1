module.exports = 
`
    type User {
        id: Int!,
        firstName: String!,
        lastName: String!,
        username: String!,
        email: String!,
        password: String!,
        status: Int
        groups: [Group!]!
        friends: [User!]!
        rendezvous: [Rendezvous!]!
    }

    type Query {
        getUserByUsername(username: String!): User!
        allUsers: [User!]!
    }

    type Mutation {
        signup(
            firstName: String!, 
            lastName: String!, 
            username: String!, 
            email: String!, 
            password: String!): User
    }
`;

//     type Query {
//         getUser(username: String!): User!
//         allUsers(): [User!]!
//     }

// `
// ;
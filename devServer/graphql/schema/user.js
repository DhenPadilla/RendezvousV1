module.exports = 
`
    type User {
        id: Int!,
        firstName: String!,
        lastName: String!,
        username: String!,
        email: String!,
        password: String!,
        status: Int!
        groups: [Group!]!
        friends: [User!]!
        rendezvous: [Rendezvous!]!
    }

    type Query {
        getUserByUsername(username: String!): User!
        allUsers: [User!]!
    }

    type LoginResponse {
        success: Boolean!,
        message: String,
        token: String,
        refreshToken: String,
        errors: [Error!]
    }

    type Mutation {
        signup(
            firstName: String!, 
            lastName: String!, 
            username: String!, 
            email: String!, 
            password: String!,
            status: Int=0): User

        login(
            username: String!,
            password: String!
        ): LoginResponse
    }
`;

//     type Query {
//         getUser(username: String!): User!
//         allUsers(): [User!]!
//     }

// `
// ;
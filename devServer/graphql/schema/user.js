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
   
    type SignupResponse {
        success: Boolean!,
        message: String,
        user: User,
        token: String,
        errors: [Error!]
    }

    type LoginResponse {
        success: Boolean!,
        message: String,
        token: String,
        errors: [Error!]
    }

    type UserResponse {
        success: Boolean!,
        user: User,
        errors: [Error!]
    }

    type Query {
        getUserByUsername(username: String!): UserResponse!
        allUsers: [User!]!
        getUser: UserResponse!
    }

    type Mutation {
        signup(
            firstName: String!, 
            lastName: String!, 
            username: String!, 
            email: String!, 
            password: String!,
            status: Int=0): SignupResponse

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
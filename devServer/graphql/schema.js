module.exports = 
`
    type Group {
        id: Int!,
        name: String!,
        users: [User!]!
    }

    type User {
        id: Int!,
        firstName: String!,
        lastName: String!,
        username: String!,
        email: String!,
        password: String!,
        status: String!
        groups: [Group!]!
    }

    type Query {
        hi: String
    }
`;
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
        hello: String
    }


`
;
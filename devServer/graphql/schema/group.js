module.exports = 
`
    type Group {
        id: Int!,
        owner: User!
        name: String!,
        users: [User!]!
    }

    type Mutation {
        createGroup(name: String!): Boolean!
    }
`
;
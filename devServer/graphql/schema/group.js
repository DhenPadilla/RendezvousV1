module.exports = 
`
    type Group {
        id: Int!,
        owner: User!
        name: String!,
        users: [User!]!
    }

    type GroupResponse {
        success: Boolean!,
        message: String,
        group: Group,
        errors: [Error!]
    }
    
    type Mutation {
        createGroup(name: String!): GroupResponse!
    }
`
;
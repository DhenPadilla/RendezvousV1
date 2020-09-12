module.exports = 
`
    type Friendship {
        id: Int!,
        user: User!
        friend: User!,
        status: Int!
    }

    type FriendshipResponse {
        success: Boolean!,
        message: String,
        users: [User!]
        errors: [Error!]
    }

    type Query {
        getFriendsForUser: FriendshipResponse
    }

    type Mutation {
        createFriendRequestWithUsername(username: String!): FriendshipResponse!
        acceptFriendRequestWithUsername(username: String!): FriendshipResponse!
    }
`
;
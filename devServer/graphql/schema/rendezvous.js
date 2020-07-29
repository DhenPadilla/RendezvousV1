module.exports = 
`
    type Rendezvous {
        id: Int!,
        status: Int!
        rendezvousLocation: String,
        rendezvousDate: String,
        group: Group,
        users: [User!],
    }


    type Mutation {
        createRendezvous(friendshipId: Int, groupId: Int, status: Int=0, rendezvousLocation: String): Boolean!
    }
`
;
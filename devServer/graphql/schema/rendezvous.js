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
`
;
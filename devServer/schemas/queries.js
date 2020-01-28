const { db } = require("../pgAdaptor");
const { GraphQLObjectType, GraphQLID } = require("graphql");
const { UserType, TeemType } = require("./types");

// Starting point for GraphQL
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    type: "Query",
    fields: {
        teem: {
            type: TeemType,
            args: { id: { type: GraphQLID }},
            resolve(parentValue, args) {
                const query  = 'SELECT * FROM teem WHERE id=$1';
                const values = [args.id];

                return db
                    .one(query, values)
                    .then(res => res)
                    .catch(err => err);
                
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID }},
            resolve(parentValue, args) {
                const query  = 'SELECT * FROM users WHERE id=$1';
                const values = [args.id];

                return db
                    .one(query, values)
                    .then(res => res)
                    .catch(err => err);
            }
        }
    }
});

exports.query = RootQuery;
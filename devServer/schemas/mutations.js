const graphql = require("graphql");
const db = require("../pgAdaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLInt } = graphql;
const { TeemType, UserType } = require("./types");

const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    type: "Mutation",
    fields: {
        addTeem: {
            type: TeemType,
            args: {
                creatorId: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                const query = `INSERT INTO teem(creator_id, created, title, description) 
                               VALUES ($1, $2, $3, $4) RETURNING title`;
                const values = [
                    args.creatorId,
                    new Date(),
                    args.title,
                    args.description
                ];

                return db
                    .one(query, values)
                    .then(res => res)
                    .catch(err => err);
            }
        },
        addUser: {
            type: UserType,
            args: {
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                last_logged_in: { type: GraphQLString },
                fb_id: { type: GraphQLInt }
            },
            resolve(parentValue, args) {
                const query = `INSERT INTO users(first_name, last_name, username, email, joined, last_logged_in, fb_id) 
                               VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING username`;
                const values = [
                    args.first_name,
                    args.last_name,
                    args.username,
                    args.email,
                    new Date(),
                    new Date(),
                    args.fb_id
                ];
                
                return db
                    .one(query, values)
                    .then(res => res)
                    .catch(err => err);
            }
        }
    }
});

exports.mutation = RootMutation;
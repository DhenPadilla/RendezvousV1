const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    type: "Query",
    fields: {
        id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        joined: { type: GraphQLString },
        last_logged_in: { type: GraphQLString }
    }
});

const TeemType = new GraphQLObjectType({
    name: "Teem",
    type: "Query",
    fields: {
      id: { type: GraphQLString },
      creator_id: { type: GraphQLString },
      created: { type: GraphQLString },
      title: { type: GraphQLString },
      description: { type: GraphQLString }
    }
  });
  
  exports.UserType = UserType;
  exports.TeemType = TeemType;
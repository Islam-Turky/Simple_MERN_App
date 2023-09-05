const graphql = require('graphql');
const { GraphQLString, GraphQLObjectType } = graphql;

const userGraphQL = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
});

module.exports =  userGraphQL ;
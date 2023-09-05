const graphql = require('graphql');
const { GraphQLString, GraphQLObjectType } = graphql;

const adminGraphQL = new GraphQLObjectType({
    name: 'Admin',
    fields: () => ({
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
});

module.exports = adminGraphQL;
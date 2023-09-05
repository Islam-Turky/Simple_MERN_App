const graphql = require('graphql');
const { GraphQLString, GraphQLObjectType } = graphql;

const socialGraphQL = new GraphQLObjectType({
    name: 'Social',
    fields: () => ({
        email: { type: GraphQLString },
        facebook: { type: GraphQLString },
        instagram: { type: GraphQLString },
        whatsapp: { type: GraphQLString },
        telegram: { type: GraphQLString }
    })
});

module.exports = socialGraphQL;
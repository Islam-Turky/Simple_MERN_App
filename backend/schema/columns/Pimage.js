const graphql = require('graphql');
const { GraphQLString, GraphQLObjectType } = graphql;

const profileImageGraphQL = new GraphQLObjectType({
    name: 'Profile_Image',
    fields: () => ({
        email: { type: GraphQLString },
        image: { type: GraphQLString }
    })
});

module.exports = profileImageGraphQL;
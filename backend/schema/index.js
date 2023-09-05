// Import Module 
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLSchema } = graphql;

// Import Type Definitions 
const userGraphQL = require('./columns/User');
const adminGraphQL = require('./columns/Admin');
const profileImageGraphQL = require('./columns/Pimage');
const socialGraphQL = require('./columns/Social');
const { User, Admin, Social, profileImage } = require('../mongoDB');

// Extract the data from the database 

// Users 
const extractUsers = async () => {
    const users = await User.find({});
    return users;
};
const UserData = extractUsers();

// Admins 
const extractAdmins = async () => {
    const admins = await Admin.find({});
    return admins;
};
const AdminData = extractAdmins();

// Socials 
const extractSocials = async () => {
    const socials = await Social.find({});
    return socials;
};
const SocialData = extractSocials();

// Profile Images 
const extractProfileImages = async () => {
    const profileImages = await profileImage.find({});
    return profileImages;
};
const ProfileImageData = extractProfileImages();
// End Extract Data from database 

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(userGraphQL),
            resolve(){
                return UserData;
            }
        },
        admins: {
            type: new GraphQLList(adminGraphQL),
            resolve(){
                return AdminData;
            },
        },
        socials: {
            type: new GraphQLList(socialGraphQL),
            resolve(){
                return SocialData;
            },
        },
        profile_images: {
            type: new GraphQLList(profileImageGraphQL),
            resolve(){
                return ProfileImageData;
            },
        }
    }
});

module.exports = new GraphQLSchema({ query: RootQuery });
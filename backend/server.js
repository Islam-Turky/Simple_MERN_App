/*
Modules that we want to Make 
our server.
*/
require('./mongoDB');
const { User, Admin, Social, profileImage } = require('./mongoDB');
const schema = require('./schema/index');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const dotEnv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const bodyParser = require('body-parser');
const  { graphqlHTTP } = require('express-graphql');
// top level module
const app = express();
dotEnv.config();
// Middleware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(cors());
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

// START OUR APPLICATION.
app.get('/', (req, res) => {
    // const allUsers = await User.find({});
    // const allUserNames = allUsers.map(user => {
    //     const { userName, email } = user;
    //     return { userName: userName, email: email };
    // });
    // res.json(allUserNames);
})

app.post('/', async (req, res) => {
    const { email, password, typeUser } = req.body;
    const checkSocial = await Social.findOne({ email: email });
    try {
        if (typeUser === 'user') {
            const checkUser = await User.findOne({ email: email, password: password });
            if(checkUser){
                res.json({ msg:'Ok User exist', name: checkUser.userName, mySocialLinks: checkSocial? checkSocial : '' });
            }else{
                res.json({ msg: 'User not found'});
            }
        }else if(typeUser === 'admin'){
            const checkAdmin = await Admin.findOne({ email: email, password: password, mySocialLinks: checkSocial ? checkSocial : ''});
            if(checkAdmin){
                res.json({msg: 'Ok Admin exist', name: checkAdmin.userName});
            }else{
                res.json({msg: 'Admin not found'});
            }
        }else{
            res.json('No one');
        }
    }catch (error) {
        console.log('Error: ' + error);
    }finally{
        console.log('Login finished');
    }
})

app.post('/signup', async (req, res) => {
    const { name, email, password, typeUser } = req.body;
    try {
        if (typeUser === 'user') {
            const checkUserSignup = await User.findOne({ email: email});
            if (checkUserSignup){
                res.json("User already registered");
            }else{
                res.json("User Not exist");
                await User.insertMany([{ userName: name, email: email, password: password }]);
            }
        }else if (typeUser === 'admin') {
            const checkAdminSignup = await Admin.findOne({ email: email, password: password });
            if (checkAdminSignup){
                res.json("Admin already registered");
            }else{
                res.json("Admin Not exist");
                await Admin.insertMany([{ userName: name, email: email, password: password }]);
            }
        }else{
            console.log("Somthing Wrong!");
        }
    } catch (error) {
        console.log('Error: ' + error);
    }finally{
        console.log("Signup finished!");
    }
})

app.post('/api/sociallinks', async (req, res) => {
    const { theEmail, facebook, instagram, whatsapp, telegram } = req.body;
    try {
        const checkSocial = await Social.findOne({ email: theEmail});
        if (!checkSocial) {
            await Social.insertMany([{ email: theEmail, facebook: facebook, instagram: instagram, whatsapp: whatsapp, telegram: telegram}]);
            res.json({
                msg: 'Your Links Saved Successfully',
                facebook: facebook,
                instagram: instagram,
                whatsapp: whatsapp,
                telegram: telegram
            });
        }else{
            res.json({
                msg: 'Links Existing Already',
                facebook: checkSocial.facebook,
                instagram: checkSocial.instagram,
                whatsapp: checkSocial.whatsapp,
                telegram: checkSocial.telegram
            });
        }
    } catch (error) {
        console.log(error);
    }
})

app.post('/api/images', async (req, res) => {
    const { theEmail, theImage } = req.body;
    const check = await profileImage.findOne({ email: theEmail });
    if (!check) {
        await profileImage.insertMany({ email: theEmail, image: theImage });
        res.json({
            msg: 'Image Added successfully',
            image: theImage
        })
    }else{
        res.json({
            msg: 'Image already exists',
            image: check.image
        })
    }
});

app.post('/api/uploadfile', upload.single('uploadfile'), (req, res) => {
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    })
});

// OUR LOCALHOST.
app.listen(process.env.PORT,() => console.log(`server listening is running successfully...`));
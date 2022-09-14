const auth = require("../middleware/auth");
//const config = require('config');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const moment = require('moment');
const _ = require("lodash");
const nodemailer = require('nodemailer');
const { User, validate } = require("../models/user");
const { ResetPassword } = require("../models/resetPassword");
const express = require("express");
const router = express.Router();


router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});


router.post("/", async (req, res) => {
    // Limit the registration to N users
    //const max_users = config.get("maxUsers")
    const max_users = 1000//process.env.API_MAX_USERS || 1000;
    const user_count = await User.countDocuments({})

    if (user_count >= max_users*1) return res.status(403).send("Max users limit crossed")

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res
        .header("x-auth-token", token)
        .send(_.pick(user, ["_id", "name", "email"]));
});




router.post('/resetPassword', async (req, res) => {
    const email = req.body.email;
    
    let user = await User.findOne({ email })

    if (!user) {
        return res.status(404).send("No user with that email address")
    }
           
    const resetPassword = await ResetPassword.findOne({ userId: user.id })
    if (resetPassword) {
        await ResetPassword.findByIdAndRemove(resetPassword._id)
    }

    const token = await crypto.randomBytes(32).toString('hex')
    const salt = await bcrypt.genSalt(10); 

    const hash = await bcrypt.hash(token, salt)              
            
    await ResetPassword.create({
        userId: user.id,
        resetPasswordToken: hash,
        expire: moment.utc().add(/*config.tokenExpiry*/process.env.API_TOKEN_EXPIRY, 'seconds'),
   })

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // user: config.email,
            // pass: config.mailPassword
            user: process.env.API_EMAIL,
            pass: process.env.API_MAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: "+<RecipeBook>",
        to: user.email,
        subject: 'Reset your account password',
        html: '<h2>RecipeBook</h2>' +
        '<h4><b>Reset Password</b></h4>' +
        '<p>Click this link to reset your password:</p>' +
        //'<a href=http://' + config.clientUrl + 'reset/' + user.id + '/' + token + '">' + config.clientUrl + 'reset/' + user.id + '/' + token + '</a>' +
        '<a href=http://' + process.env.API_CLIENT_URL + 'reset/' + user.id + '/' + token + '">' + process.env.API_CLIENT_URL + 'reset/' + user.id + '/' + token + '</a>' +
        '<br><br>' +
        '<p>-- Thanks</p>'
    }
                       
    let mailSent = await transporter.sendMail(mailOptions)
        
    if (mailSent) {
        return res.send('Check your mail to reset your password.')
    } 
    else {
        return res.status(503).send('Unable to send email.');
    }
})
     



router.post('/storePassword', async (req, res) => {
    const userId = req.body.userId
    const token = req.body.token
    const password = req.body.password
    
    const resetPassword = await ResetPassword.findOne({ userId })    
    if (!resetPassword) {
        return res.status(404).send('Invalid or expired reset token.')
    }
    
    const match = await bcrypt.compare(token, resetPassword.resetPasswordToken) //, function (errBcrypt, resBcrypt) {// the token and the hashed token in the db are verified befor updating the password
    
    //const match = token.toString() === resetPassword.resetPasswordToken.toString();
    if (!match) {
        return res.status(404).send('Invalid or expired reset token.')
    }

    let expireTime = moment.utc(resetPassword.expire)
    let currentTime = new Date();
    
    const salt = await bcrypt.genSalt(10); 
    const hash = await bcrypt.hash( password.toString(), salt)  

    await User.findByIdAndUpdate(
        {_id: userId},
        { password: hash },
        function(err, result) {
            if (err) res.send(err);
           //else res.send(result);
        }
    )
    await ResetPassword.findByIdAndRemove(resetPassword._id) 
        
    res.send("Successfully reset")
})


module.exports = router;
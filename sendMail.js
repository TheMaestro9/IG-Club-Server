exports.SendAnEmail = function (email, emailsubject, content) {
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'Hotmail',
        host: 'smtp-mail.outlook.com',
        port: 587,
        auth: {
            user: 'igclub@outlook.com', // Your email id
            pass: 'IC__1234' // Your password
        }
    }));

    // var mailConfig;
    // if (process.env.NODE_ENV === 'production' ){
    //     // all emails are delivered to destination
    //     mailConfig = {
    //         host: 'smtp.sendgrid.net',
    //         port: 587,
    //         auth: {
    //             user: 'real.user',
    //             pass: 'verysecret'
    //         }
    //     };
    // } else {
    //     // all emails are catched by ethereal.email
    //     mailConfig = {
    //         host: 'smtp.ethereal.email',
    //         port: 587,
    //         auth: {
    //             user: 'vxtzjoewht5c5heq@ethereal.email',
    //             pass: 'JsandZHS4cKRFy2tTR'
    //         }
    //     };
    // }
    // let transporter = nodemailer.createTransport(mailConfig);

    var mailOptions = {
    from: 'igclub@outlook.com', // sender address
    to: email, // list of receivers
    subject: emailsubject, // Subject line
    //text: text //, // plaintext body
    html: content// You can choose to send an HTML body instead
    };
    
    transporter.sendMail(mailOptions, function (error, info) {
        console.log("manatos");
    if (error) {
        //globalCTRL.addErrorLog(error);
        // res.send(error.message);
        console.log("email sending problem: " + error.message);
    } else {
        let url = nodemailer.getTestMessageUrl(info)
        console.log('\n\nPreview URL: ' + url + '\n\n');
        //res.send({'ok':info.response});
    };
 });
}
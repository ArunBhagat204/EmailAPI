const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

app.listen(3000);

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'roslyn.kutch80@ethereal.email',
        pass: 'x612QafsDczbu79Vhm'
    }
});

const successRes = {
    "success": true,
    "message": "Email sent successfully"
}

const failureRes = {
    "success": false,
    "message": "Error message"
}

function sendEmail(req) {
    if("to" in req && "email_body" in req) {
        try {
            transporter.sendMail({
                from: '"Roslyn Kutch" <roslyn.kutch80@ethereal.email>', 
                to: req.to, 
                subject: "Sent from EmailAPI", 
                text: req.email_body
            });
        }
        catch(err) {
            return failureRes;
        }
        return successRes;
    }
    else {
        return failureRes;
    }
}

app.post('/', function (req, res) {
    res.json(sendEmail(req.body));
})


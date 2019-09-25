
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const app = express();
app.use(cors());
app.get('/', (req, res) => {
    res.send("Welcome to the Sendgrid Emailing Server"); 
});

app.get('/login', (req, res)=>{
    const { recipient, sender, topic, text, firstName, companyName, key } = req.query; 
    sgMail.setApiKey(key);
    const recipientMsg = {
        to: recipient,
        from: sender,
        subject: topic,
        templateId: 'd-192838e8358c4d0fb9d1ff822568af8f',
        dynamic_template_data: {
            firstName: firstName,
            companyName:  companyName
        },
        text: text,
    }
    const msReciept = {
        to: sender,
        from: recipient,
        subject: 'Someone Signed Up at Login',
        text: `Company Name: ${companyName}`
    }
    sgMail.send(recipientMsg);
    sgMail.send(msReciept);
});
app.listen(443, ()=>{console.log('hi from server')})
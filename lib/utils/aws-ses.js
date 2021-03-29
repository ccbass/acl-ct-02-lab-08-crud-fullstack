const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const AWS = require('aws-sdk');

const SESDetails = {
    apiVersion: '2010-12-01',
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
    region: process.env.AWS_SES_REGION
};


const sendAWSEmail = (coffee, quantity) => {
  let params = {
    Source: process.env.AWS_SES_EMAIL,
    Destination: { 
      ToAddresses: [
        process.env.AWS_SES_EMAIL,
      ]
    },
    Message: { 
      Body: { 
        Html: {
          Data: `Thanks for your order of ${quantity} bags of ${coffee} coffee!`, 
          Charset: 'UTF-8'
        },
      },
      Subject: { 
        Data: 'Some SES email!', 
        Charset: 'UTF-8'
      }
    },

    ReplyToAddresses: [
      process.env.AWS_SES_EMAIL,
    ],

  };

  new AWS.SES(SESDetails).sendEmail(params).promise().then((res) => {
    console.log(res)
  })
}

module.exports = sendAWSEmail

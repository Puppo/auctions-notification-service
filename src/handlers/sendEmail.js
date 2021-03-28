import AWS from "aws-sdk";

const SES = new AWS.SES({ region: process.env.AWS_REGION });

async function sendEmail(event, context) {
  const record = event.Records[0];
  const email = JSON.parse(record.body);

  const { recipient, subject, body } = email;

  try {
    return await SES.sendEmail({
      Source: process.env.SES_SOURCE,
      Destination: {
        ToAddresses: [recipient],
      },
      Message: {
        Body: {
          Text: {
            Data: body,
          },
        },
        Subject: {
          Data: subject,
        },
      },
    }).promise();
  } catch (ex) {
    console.error(ex);
  }
}

export const handler = sendEmail;

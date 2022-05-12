import nodeMailer from 'nodemailer';
import { workerData } from 'worker_threads';
import { NextApiResponse, NextApiRequest } from 'next';
import Bree from 'bree';

/* For more information - https://nextjs.org/docs/api-routes/api-middlewares */
export const config = {
  api: {
    responseLimit: false,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  // const bree = new Bree({
  //   jobs: [
  //     {
  //       name: 'sendEmail',
  //       cron: '* * * * *',
  //       worker: {
  //         workerData: {
  //           description: 'This job will send emails.',
  //         },
  //       },
  //     },
  //   ],
  // });

  // bree.start();
  try {
    // eslint-disable-next-line no-console
    // console.log('workerData: ', workerData.description);

    // eslint-disable-next-line no-console
    console.log('process.env.EMAIL: ', process.env.EMAIL);

    //Transporter configuration
    const transporter = nodeMailer.createTransport({
      host: 'outlook.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL, //REPLACE WITH YOUR EMAIL ADDRESS
        pass: process.env.EMAIL_PASSWORD, //REPLACE WITH YOUR EMAIL PASSWORD
      },
    });

    //Email configuration
    transporter
      .sendMail({
        from: 'adamgedrake@gmail.com',
        to: 'adamgedrake@gmail.com',
        subject: 'Hello Man!',
        text: 'This is a test email.',
        html: '<b>This is a test email that is very boring.</b>',
      })
      .then(response => {
        return res.status(201).json({ response });
      })
      .catch((error: Error) => {
        return res
          .status(422)
          .json({ error: error.message || error.toString() });
      });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};

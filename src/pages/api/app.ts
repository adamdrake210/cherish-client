import Bree from 'bree';

const bree = new Bree({
  jobs: [
    {
      name: 'sendEmail',
      cron: '* * * * *',
      worker: {
        workerData: {
          description: 'This job will send emails.',
        },
      },
    },
  ],
});

bree.start();

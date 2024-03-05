import { exec } from 'child_process';

// const command = 'pm2 start index.js --name my-discord-bot';
const command = 'npm start';

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing PM2 command: ${error}`);
    return;
  }
  console.log(`PM2 command executed successfully:\n${stdout}`);
});

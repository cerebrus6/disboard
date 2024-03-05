import fs from 'fs';
import path from 'path';
import bot from './main.js';

try {
  // Code that may throw an error
  // For example, you can intentionally throw an error for demonstration purposes:
  const app = new bot;
  app.start();

} catch (error) {
  // Handle the error
  // console.error('An error occurred:', error);

  // Create a timestamp for the log entry
  const timestamp = new Date().toUTCString();

  // Format the log message with the timestamp
  const logMessage = `${timestamp} - Error: ${error.message}\n`;

  // Get the current date in the format "YYYY-MM-DD"
  const currentDate = new Date().toISOString().split('T')[0];

  // Specify the log file path with the current date as the filename
  const logFilePath = path.join('logs', `${currentDate}.log`);

  // Check if the log file exists
  fs.access(logFilePath, (err) => {
    if (err) {
      // Log file doesn't exist; create it and append the error message
      fs.writeFile(logFilePath, logMessage, (createErr) => {
        if (createErr) {
          console.error('Failed to create the log file:', createErr);
        } else {
          console.log('Error logged to:', logFilePath);
        }
      });
    } else {
      // Log file exists; append the error message
      fs.appendFile(logFilePath, logMessage, (appendErr) => {
        if (appendErr) {
          console.error('Failed to write the error log:', appendErr);
        } else {
          console.log('Error logged to:', logFilePath);
        }
      });
    }
  });
}

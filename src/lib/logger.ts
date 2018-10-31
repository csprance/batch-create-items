import * as fs from 'fs';
import * as winston from 'winston';

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: './logs/log.log'
    })
  ]
});

export default logger;

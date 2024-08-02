// customLogger.js
const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

const customLogger = (req, res, next) => {
  const logEntry = `${new Date().toISOString()} ${req.method} ${req.url} ${res.statusCode}\n`;
  logStream.write(logEntry);
  next();
};

module.exports = customLogger;

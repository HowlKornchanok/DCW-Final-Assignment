const cookieSession = require("cookie-session");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const rfs = require("rotating-file-stream");
const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

app.use(morgan('dev'));
app.use(morgan('common', {stream: fs.createWriteStream('logs/access.log')}));

app.use(
  cookieSession({ name: "session", keys: ["Howl"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen("5000", () => {
  console.log("Server is running!");
});


'use strict';


const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'results.log');

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          info =>
            `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
        )
      )
    }),
    new transports.File({
      filename,
      format: format.combine(
        format.printf(
          info =>
            `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
        )
      )
    })
  ]
});

logger.error('error message');
logger.warn('warn message');
logger.info('info message');
logger.verbose('verbose message');
logger.debug('debug message');
logger.silly('silly message');



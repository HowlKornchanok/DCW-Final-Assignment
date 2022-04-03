const cookieSession = require("cookie-session");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');
const Quote = require('inspirational-quotes');

///////////////////////morgan//////////////////////////

app.use(morgan('dev'));
app.use(morgan('common', {stream: fs.createWriteStream('logs/access.log')}));
///////////////////////cookiesession//////////////////
app.use(
  cookieSession({ name: "session", keys: ["Howl"], maxAge: 24 * 60 * 60 * 100 })
);
//////////////////////passport////////////////////////
app.use(passport.initialize());
app.use(passport.session());
/////////////////////cors/////////////////////////////
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET",
    credentials: true,
  })
);
//////////////////////auth////////////////////////////
app.use("/auth", authRoute);
/////////////////////REST API/////////////////////////////
app.use(bodyParser.json());
let users = require('./user.json');


app.get('/user', function (req, res, next) {
  return res.status(200).json({
    code: 1,
    message: 'OK',
    data: users
  })
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin , X-Request-With, Content-Type,Accept' );
  next();
})

app.get('/genquote',(req,res,next) => {
  res.send(Quote.getQuote());
})


app.post('/user', function (req, res, next) {
  let user = {} // สร้าง Object user
  user.id = users.length + 1 // id จำลองมาจาก auto increment ใน database โดยนับจากจำนวน length เริ่มต้นที่ 1
  user.name = req.body.name; // รับค่าจาก body ที่ส่งมาทาง client จาก tag ที่ชื่อว่า "name"
  user.age = Number(req.body.age); // รับค่าจาก body ที่ส่งมาทาง client จาก tag ที่ชื่อว่า "age" พร้อมกับแปลงค่านั้นเป็นตัวเลขโดยฟังก์ชั่น Number()
  user.movie = req.body.movie; // รับค่าจาก body ที่ส่งมาทาง client จาก tag ที่ชื่อว่า "movie"
  users.push(user); // ทำการเพิ่ม Object user เข้าไปใน Array users
  console.log('Users :', user.name, 'Created!')
  return res.status(201).json({
    code: 1,
    message: 'OK',
    data: users
  });
});

app.delete('/user/:id', function (req, res, next) {
  const removeId = req.params.id; // รับค่า params จาก url 
  const position = users.findIndex((val) => { // หา Index จาก array users
    return val.id == removeId;
  });
  users.splice(position, 1); // ลบสมาชิกใน array
  return res.status(200).json({
    code: 1,
    message: 'OK',
    data: users
  })
});

app.listen("5000", () => {
  console.log("Social Login is running!");
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





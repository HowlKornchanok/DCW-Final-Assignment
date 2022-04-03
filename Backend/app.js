const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

let user = require('./user.json');
let app = express();
app.use(bodyParser.json());  // ให้ server(express) ใช้งานการ parse json
app.use(morgan('dev')); // ให้ server(express) ใช้งานการ morgam module
app.use(cors()); // ให้ server(express) ใช้งานการ cors module

app.get('/user', function (req, res, next) {
    return res.status(200).json({
    code: 1,
    message: 'OK',
    data: user
  })
});

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
    data: user
  });
});

app.put('/user', function (req, res, next) {
  const replaceId = req.body.id; // รับค่า params จาก url 
  const position = users.findIndex(function (val) { // หา Index จาก array users
    return val.id == replaceId;
  });
  console.log(user[position]);
  user[position].name = req.body.name; // ทำการกำหนดค่า name ใหม่เข้าไปจาก req.body ที่รับเข้ามา
  user[position].age = Number(req.body.age); // ทำการกำหนดค่า age ใหม่เข้าไปจาก req.body ที่รับเข้ามา
  user[position].movie = req.body.movie; // ทำการกำหนดค่า movie ใหม่เข้าไปจาก req.body ที่รับเข้ามา
  console.log('Users :', user.name, 'Created!')
  return res.status(200).json({
    code: 1,
    message: 'OK',
    data: user
  });
});

app.delete('/user/:id', function (req, res, next) {
  const removeId = req.params.id; // รับค่า params จาก url 
  const position = users.findIndex((val) => { // หา Index จาก array users
    return val.id == removeId;
  });
  user.splice(position, 1); // ลบสมาชิกใน array
  return res.status(200).json({
    code: 1,
    message: 'OK',
    data: user
  })
});

app.listen(3000, function () {
  console.log('Server Listen at http://localhost:3000');
  console.log('User :', user)
});
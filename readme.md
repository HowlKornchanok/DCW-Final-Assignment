
# DCW Final Assignment

## Backend

### logger

- ใช้packages morgan และ winston ร่วมกับ express ซึ่งทำการ catching HTTP method ที่ request เข้ามา ในการสร้าง log file 
- ใช้แพคเกจ morgan ในการสร้าง log file ที่เก็บข้อมูลการ request ที่มายัง server และ respond ที่ server ส่งออก
- ใช้ Winston ใช้ในการสร้าง log file ที่เก็บข้อมูลการทำงานของ server 
- 
### Authentication

- ใช้ package passport ( passport, passport-google-oauth20, passport-github2, passport-facebook) ในการเก็บข้อมูล body client id และ client secret ในการใช้ OAuth โดยทำงานร่วมกับแพคเกจ express ,cros

```
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
```
- แพคเกจ express ในการ catching get /loginstatus และ respond สถานะไปยัง console และ frontend ตามสถานการณ์

```
router.get("/login/success", (req, res) => {

	if (req.user) {

		res.status(200).json({
			success: true,
			message: "successfull",
			user: req.user,
		});
	}
});
```
- ใช้ cors เป็น middleware เพื่อใช้ในการส่งข้อมูล use state ของ user ไปแสดงใน frontend 
-  ใช้เพคเกจ cookie-session ในการสร้าง session เก็บไว้เพื่อไม่ต้องทำการ login ใหม่ทุกครั้ง

# Frontend

- ใช้ react router-dom เพื่อเข้าถึง DOM ให้ทำการ render ในหน้าของแอพพลิเคชั่นตามการเข้าถึง
```
import Home from  "./pages/login";
const  App  = () => {
	return (
		<BrowserRouter>
			<div>
				<Routes>
					<Route
						path="/post/:id"
						element={user  ?  <Post  />  :  <Navigate  to="/login"  />}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}
```

- โดยแอพพลิเคชั่นจะทำงานร่วมกับ Authentication Application โดยดึงข้อมูล use state เป็นรูปและชื่อของ user ด้วย HTTP method GET มาจาก server
```
const [user, setUser] =  useState(null);
	useEffect(() => {
		const  getUser  = () => {
			fetch("http://localhost:5000/auth/login/success", {
				method: "GET",
				credentials: "include",
				headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": true,
			},
		})
	};
	getUser();
}, []);
```
- เมื่อ login/success และให้อณุญาติการเข้าถึง(Access Control Allow Credential) cros

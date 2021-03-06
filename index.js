require('dotenv').config();

var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var sessionMiddleware = require('./middleware/session.middleware');

var authMiddleware = require('./middleware/auth.middleware');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('index', {//path
		name: 'Phuong'
	});
});

// app.get('/styles/custom.css', (req, res)=> {
// 	res.send('abc');
// });

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);

app.listen(port, () => {
	console.log('Example app listening at http://localhost:${port}');
});
const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const cookieParser  = require('cookie-parser');

// EXPRESS
const app = express();
PORT = process.env.PORT || 4000;

// MIDDLE WEAR ----------------------------------------------------------------
app.use(morgan('dev'));
app.use(cookieParser(["wkejfbqiw2pi5b62k456", "IUwefO9HB8guywblf"]));
// use body parser in order to pass in data structes as cookie value types
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// to set a cookie use res.cookie("name", values, {options})
// options can be found here - https://expressjs.com/en/api.html#res.cookie

// Routes ---------------------------------------------------------------------

app.get('/setcookie/:cookiename', (req, res, next) => {
  let cookieName = req.params.cookiename;
  let { value, signed, seconds } = req.query;

  // signed figures out whether or not the cookie is signed with the cookie-parser secret
  res.cookie(cookieName, {value}, { signed, maxAge: seconds * 1000});
  // lets look at the cookies
  return res.redirect('/seecookies');
});

app.get('/seecookies', (req, res, next) => {
  // cookie parser will add the cookies value onto req if the user has cookies for the domain.
  // get all the signed and un-signed cookies from the req object and send it back as json
  return res.json({unSigned: req.cookies, signed: req.signedCookies})
});

app.get('/login', (req, res, next) => {
  let { days } = req.query;
  let oneDayMS = 86400000;
  // add some expires information only to display -> same logic as maxAge
  // if user doesn't add amount of days -> default 10 seconds
  res.cookie('loggedIn', {expires: ( days * oneDayMS || 10000 ) }, {maxAge: ( days * oneDayMS || 10000 )})
  return res.redirect('/profile')
});

// some quick middle wear to check if out cookie is there or not
function isLoggedIn (req, res, next) {
  if(req.cookies.loggedIn) {
    next()
  } else
    return res.redirect('seecookies')
}

app.get('/profile', isLoggedIn, (req, res, next) => {
  let cookie = req.cookies.loggedIn;
  return res.send({login: cookie});
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
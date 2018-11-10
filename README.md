# Express Cookies-Study
#### This is a simple study of how cookies work with [expressjs](https://expressjs.com/) & [cookie-parser](https://www.npmjs.com/package/cookie-parser)
*the server can be started with `node server.js`*

---

### Routes
**GET** - /setcookie/:cookiename
*params* - value, signed, seconds
-> Set a cookie with a name and value

**required**
- `:cookiename` - the name of the cookie you would like to store
- `value` - the value to be stored within the cookie

**optional**
- `signed` - whether the cookie should be signed
- `seconds` - how many seconds until the cookie expires
---
**GET** - /seecookies
-> See the the cookies in storage for the domain

---
**GET** - /login
*params*- days
-> Create a login cookie

optional
- `days` - How many days until the login cookie expires
this is one way *remember me* can be implemented
---
**GET** - /profile
-> view the mock profile of the user and the `loggedIn` cookie

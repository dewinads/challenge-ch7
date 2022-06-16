const express = require("express");
const session = require('express-session');
const flash = require('express-flash');
const passport = require("./lib/passport");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require('method-override');
const router = require("./router");

const {PORT = 3000} = process.env;

const app = express();

//Method override
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended:false}));
app.use(express.json());

app.use(session({
  secret: 'rahasia ya',
  resave: false,
  saveUninitialized: false
}))

app.use(flash())

app.use(passport.initialize());
app.use(passport.session());

// Setup Layout
app.use(expressLayouts);
app.set("layout", "./layouts/app");
app.set("view engine", "ejs");

// Middleware to pass `url` to locals variable so we can use it on view
app.use((req, res, next) => {
    res.locals.url = req.originalUrl;
    next();
  });

app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
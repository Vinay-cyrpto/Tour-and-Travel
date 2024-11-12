const express = require('express');
const app = express();
const port = 3003;
const pool = require('./models/pool');
const body_parser = require('body-parser');
const session = require('express-session');
const { checkLogin } = require('./models/checkLogin');
const Swal = require('sweetalert2');
const path = require('path');

// Serve static files (CSS, JS, images) from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine and views folder (for HBS templates)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Session setup
app.use(session({
    secret: 'kake',
    resave: false,
    saveUninitialized: false
}));

// Body parser setup
app.use(body_parser.urlencoded({
    extended: false
}));
app.use(body_parser.json());

// Route for the homepage
app.get('/', (req, res) => {
    res.render('index', { errorVal: "" });
});





app.get('/register', (req, res) => {
    res.render('login')
})


app.post('/book', (req, res) => {
    const { email, destination, persons, start_date, end_date, details } = req.body;
    let qry = "insert into bookings (Email, Details,Destination, Numbers, Start_date, End_date) values(?,?,?,?,?,?)"
    pool.query(qry, [email, details, destination, persons, start_date, end_date], (err, result) => {
        if (err) {
            console.log(err)
            res.render('index', { errorVal: "A Server Error has Occured !" });
        } else {
            res.render('index', { errorVal: "Booking Successful !" });
        }
    })
});

app.post('/getregistered', (req, res) => {
    const { email, password } = req.body;
    let qry = "insert into users (Email, Password) values(?,?)"
    pool.query(qry, [email, password], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            req.session.email = email;
            res.redirect('/dashboard');
        }
    })
});


/* Dashboard page */

app.get('/dashboard', checkLogin, (req, res) => {
    res.render('dashboard');
})

app.get('/login', (req, res) => {
    res.render('signup')
})


/* Checking for the login credentials */

app.post('/loginform', (req, res) => {
    const { email, password } = req.body;

    pool.query('select * from users where email = ?', [email], (err, obj) => {
        if (err) {
            console.log(err);
            res.send('Server Error ho gya ');
        }

        else {
            if (obj.length == 0) {
                res.send('User not found');

            }

            else {
                if (password != obj[0].Password) {
                    res.send('Invalid Credentials !');
                }

                else {

                    req.session.email = email;
                    res.redirect('/dashboard');
                }
            }
        }
    })
})




/* Rendering the past order page  */

app.get('/history', checkLogin, (req, res) => {

    pool.query('select * from bookings where email = ?', [req.session.email], (err, obj) => {
        if (err) {
            console.log(err);
            res.render('historyPage', { data: [] });
        }

        else {
            res.render('historyPage', { data: obj });
        }
    })


})



/* Logout  */

app.get('/logout', checkLogin, (req, res) => {
    req.session.destroy();

    res.redirect('/login');
})


app.listen(port, () => {
    console.log('server connected');
})
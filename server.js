const express = require('express') //framework
const app = express()
const mongoose = require('mongoose') //work with models
const passport = require('passport')
const session = require('express-session') //sessions & cookies
const MongoStore = require('connect-mongo') //stores sessions in database
const methodOverride = require('method-override')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const profileRoutes = require('./routes/profile')

//Express use environment variables
require('dotenv').config({path: './config/.env'})

//Connect to passport file in config
require('./config/passport')(passport)

//Connect to database
connectDB()

//Use EJS for Views
app.set('view engine', 'ejs')

//Static Folder
app.use(express.static('public'))

//Body Parsing
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Mogran to log
app.use(logger('dev'))

//Use forms for put/delete and look for _method query parameter
app.use(methodOverride('_method'))

//Set up session stored in MongoDB
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            //mongoUrl: process.env.DB_STRING
            client: mongoose.connection.getClient()
        })
    })
)

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Validation messages
app.use(flash())

//Routes the server is listening for
app.use('/', mainRoutes)
app.use('/profile', profileRoutes)

//Server Running on environment variable PORT
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`)
})
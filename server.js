const methodOverride = require('method-override')
const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()
const PORT = process.env.PORT
const app = express()

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(
    () => console.log('connected to the database!~')
    )
//ROUTES
app.get('/', (req,res) =>{
    res.send('Welcome to MY recipe app')
})

const recipeController = require('./controllers/recipeController')
app.use('/recipes', recipeController)

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})

//ERROR PAGE
app.get('*', (req,res) => {
    res.send('404')
})
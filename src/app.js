const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getWeather = require('./utils/weather')
const geocode = require('./utils/geocode')


const app = express()

// define path paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handle bars and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDir))

app.get('',(req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Kasia Fras'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title:'About',
        name: 'Kasia Fras'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        title:'Help',
        name: 'Kasia Fras',
        message: 'If you need help that'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
       return res.send({
            error: 'You must provide the adress'
        })
    }
    geocode(req.query.adress, (error, {latitude, longitude, name} = {}) => {
        if (error) res.send({error})
         else {
             getWeather(latitude, longitude, (error, forecastData) => {
                 if (error) res.send({error})
                  else res.send({
                      forecast: forecastData,
                      name,
                      adress:req.query.adress
                    })
               })
         }
     })
    
})



app.get('/help/*',(req, res) => {
    res.send('help article not found')
})

app.get('*', (req, res) => {
   res.render('404',{
       title:'404',
       errorMessage:'Wrong adress!!!',
       name:'Kasia Fras'
   })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
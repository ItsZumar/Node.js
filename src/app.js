const path = require("path")
const express = require('express')
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

//customizing server
//define paths for express config
const publicDirPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views") //if View dir is not by name views //Customizing view
const partialsPath = path.join(__dirname, "../templates/partials")

//setup Handlebars engine and views loca
app.set("views", viewPath)
app.set('view engine','hbs') 
hbs.registerPartials(partialsPath)

//setup static dir to serve
app.use(express.static(publicDirPath)) //static means do not change 

app.get('', (req, res)=>{
    res.render("index", {
        title: "Weather",
        name: "Cloudy"
    })
})

app.get('/about', (req, res)=>{
    res.render("about", {
        title: "About Me",
        name: "Zumar"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        msg: "Need Help!",
        name: "Zumar Saeed"
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "Must provide search term."
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Error msg."
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
          return req.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
          if(error) {
            return req.send({ error })
          }
          
          res.send({
            forecast: forecastData,  
            address: req.query.address,
            location: location
          })
         
        })
    })  
})

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: "404 page",
        msg: "help article not found.",
        name: "Zumar"
    })
})

app.get('*', (req, res) => {
    res.render("404", {
        title: "404 page",
        msg: "page could not found.",
        name: "Zumar"
    })
})

app.listen(3000, ()=>{
    console.log("port: 3000")
})
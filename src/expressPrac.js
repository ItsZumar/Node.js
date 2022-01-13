const express = require('express')
const app = express()

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, "../public"))

//passing HTML
app.get('/', function (req, res) {
  res.send('<h1>Hello Express!</h1>')
})

//passing JSON
app.get("/help", (req, res)=> {
    res.send([
        {
            name: "Zumar",
            age: 21
        },
        {
            name: "Sara",
            age: 25
        }
    ])
})

app.get('/about', (req, res) => {
    res.send("<h1>Title: About</h1>")
})

app.get('/weather', (req, res) => {
    res.send([
        {
            location: "philadelphia",
            weather: "Cloudy"
        },
        {
            location: "Rawalpindi",
            weather: "Cloudy"
        }
    ])
})

app.listen(3000, ()=>{
    console.log("port: 3000")
})
const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const { read } = require("fs");
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})


app.post("/", function (req, res) {
    const query = req.body.cityname;
    const appid = "864df89ec3990c255e7f37226e60250e"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + units + ""
    https.get(url, function (response) {
        
        response.on("data", function (data) {
            const weatherapp = JSON.parse(data);
            const weatherdisc = weatherapp.weather[0].description;
            const temperature = weatherapp.main.temp;
            const icon = weatherapp.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1><center><italic>The temperature in "+query+" is " + weatherdisc + "</italic></center></h1>")
            res.write("<h1><center><italic>The temperature in "+query+" is " + temperature + "</italic> degree celcius</center></h1>")
            res.write("<center><img src=" + imgurl + "></center>");
            res.send()

        })
    })

})





app.listen(3000, function () {
    console.log("So the thing is I am Working Somehow");
})
const express = require('express');

const path = require('path');

const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;          // heroku will give us a port in environment

const PublicPath = path.join(__dirname , '../public')

app.use(express.static(PublicPath));
 
// app.get('', function (req, res) {
//   res.send('Hello World')               // will never run if express finds the location ../src     Agar woh na mile toh hi ye niche ka run hoga
// })
 
// app.get('/help', function (req, res) {
//     res.send('Help page')               // nhi run hoga
//   })

//   app.get('/about', function (req, res) {
//     res.send({
//         name:'Aniket',                  // nhi run hoga
//         age : 19
//     })
//   })
    
//   app.get('/weather', function (req, res) {
//     res.send('<h1>weather</h1>')
//   })
   
  const viewPath = path.join(__dirname , '../kuchBhi/views')
  app.set('view engine' , 'hbs')
  app.set('views', viewPath)

app.get('/about' , function(req, res){
    res.render('about' , {
        name : 'Anikket',
        title : 'About Me'
    })
})
app.get('/help' , function(req,res){
    res.render('help',{
        name:'Aniket',
        title: 'Help'
    })
})
app.get('/' , function(req,res){
    res.render('' , {
        name:'ANiket',
        title : 'HOMEI'
    })
})



const partialPath = path.join(__dirname, '../kuchBhi/partials')

    hbs.registerPartials(partialPath);


app.get('/help/*' , function(req,res){            // wildCard jaisa h *
    res.send('Help Page Not Found !!');
    })    




//________________________________________________
const forecast = require('./util/forecast');
const geocode = require('./util/geocode');
app.get('/weather' , function(req,res){
    if(!req.query.address){
        return res.send({
            error: 'Pls provide an address to search for .'
        })
    }
    geocode(req.query.address , function(error , data){
        if(error){
            return res.send({error})
        }
        forecast(data.latitude , data.longitude , function(error , data2){
            if(error){
                return res.send({error})
            }
            res.send({
                Location : data.location,
                Temperature : data2.temperature,
                RealFeel : data2.RealFeel
            })
        })
    })
    
})


app.get('*' , function(req,res){            // wildCard jaisa h *
    res.send('My 404 page !!');
})                                             // isko last mei h rakhna pdega



app.listen(port , function(){
    console.log('Server running at port '+ port);
});
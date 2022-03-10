const express = require('express');
//init app
const app = express();
var path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const africastalking = require('africastalking');

//port 
var port =  3000;

  app.use(morgan('dev'));



const ejs =  require('ejs');
// //set templating engine
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/public')));
// //static public folder
app.use('/style', express.static(path.join(__dirname, 'public/css')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/javascript', express.static(path.join(__dirname, 'public/js')));

//bodt-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/',(req,res)=>{
	res.render('./single.ejs')
	
});

app.post('/sms/send',(req,res)=>{
	
	 const credentials = {
        
    
    apiKey: '9fce67f1a8efac71ca8146871acb5c4870c9ab7e4914367e172c8a20192f25e8', // use your sandbox app API key for development in the test environment
     username: 'Mojatu',
      from: 'MojaTu'
}

    // Initialize the SDK
    const AfricasTalking = require('africastalking')(credentials);

    // Get the SMS service
    const sms = AfricasTalking.SMS;

    function sendMessage() {
        const options = {
            // Set the numbers you want to send to in international format
            to: req.body.contact,
            // Set your message
            message: req.body.msgBody,
            // Set your shortCode or senderId
            from: process.env.FROM,
            
        }

        // That’s it, hit send and we’ll take care of the rest
        sms.send(options)
            .then(response => {
                // save data to database
                try {
                    Sms.create(req.body);
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            }
            )
            .catch(console.log);
    }

    sendMessage();
	res.redirect('/');
	
})



//create a server
app.listen(port,console.log(
'App listening to port',port));

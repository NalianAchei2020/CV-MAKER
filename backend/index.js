import express from express;
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors';
import config from "./config";

const app = express();
// body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// cookies middleware
app.use(cookieParser(config.JWT_SECRET))

//cors
app.use(cors({
    origin: '',
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))

// Preflight requests
app.options('*', (req, res) => {
    res.header(
      'Access-Control-Allow-Origin',
      'https://codegisoft-acadamy.onrender.com'
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(204).send();
  });


app.get('/', (res, req) => {
   res.send('Welcome to CV maker') 
})



app.listen()
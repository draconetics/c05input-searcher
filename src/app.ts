import express from 'express'
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get('/', (req, res) => {
  return res.send(`The API is at http://localhost:${app.get('port')}`);
})

app.get('/api/books', (req, res) => {
        const data = [
            {id:1, title:"Harry potter"}
        ]
        res.status(200).json({data})
  })

const db = require('./config/db')
db.connect();
export default app;
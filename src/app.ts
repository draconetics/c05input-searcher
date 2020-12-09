import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import {client} from './config/elasticsearch.config'
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';
import productRoutes from './routes/product.route';
import categoryRoutes from './routes/category.route'
import searchRoutes from './routes/search.route'
import fullRoutes from './routes/full.route';
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//probin conection with elasticsearch
client.ping({
  requestTimeout: 30000
}, function(error:object) {
  if (error) {
      console.trace('Error:', error);
  } else {
      console.log('Connected!');
  }
  // on finish
  //client.close();
});

app.get('/', (req, res) => {
  return res.send(`you are in at root`);
})

app.get('/api/books', (req, res) => {
        const data = [
            {id:1, title:"Harry potter"}
        ]
        res.status(200).json({data})
  })


app.use(productRoutes);  
app.use(categoryRoutes);
app.use(searchRoutes);
//app.use(fullRoutes);

app.use(errorHandler);
app.use(notFoundHandler); 


const db = require('./config/db')
db.connect();
export default app;
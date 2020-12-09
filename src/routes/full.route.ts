import {Router} from 'express'
import { 
    fullDatabase,
  } from '../controllers/full.controller'

const router = Router();

router.get('/api/full', fullDatabase);

export default router;
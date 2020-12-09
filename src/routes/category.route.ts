import {Router} from 'express'
import { resolveTypeReferenceDirective } from 'typescript';
import { 
    getCategoryList, 
    createCategory,
    addProductToCategory,
    deleteCategoryById,
    searchCategory
  } from '../controllers/category.controller'

const router = Router();

router.get('/api/category', getCategoryList);
//router.get('/api/category/:id', getProductById);
router.post('/api/category', createCategory);
router.post('/api/category/newproduct', addProductToCategory);
router.delete('/api/category/:id', deleteCategoryById);
router.get('/api/category/search', searchCategory);

export default router;
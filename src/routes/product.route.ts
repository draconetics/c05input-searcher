import {Router} from 'express'
import { 
    getProductList, 
    createProduct,
    addCategoryToProduct,
    searchProduct,
    deleteProductById
  } from '../controllers/product.controller'

const router = Router();

router.get('/api/product', getProductList);
//router.get('/api/product/:id', getProductById);
router.post('/api/product', createProduct);
router.post('/api/product/newcategory', addCategoryToProduct);
router.get('/api/product/search', searchProduct)
router.delete('/api/product/:id', deleteProductById)
export default router;
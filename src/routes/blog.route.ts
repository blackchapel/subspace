import express, { Router } from 'express';

import BlogController from '../controllers/blog.controller';

// Creating a instance of the class
const blogController = new BlogController();

// Initializing express router
const router: Router = express.Router();

router.get('/blog-stats', blogController.blogStats);

router.get('/blog-search', blogController.blogSearch);

export default router;

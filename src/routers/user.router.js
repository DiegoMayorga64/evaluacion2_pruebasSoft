import { Router } from 'express';
import UserController from '../controllers/user';
import authMiddleware from '../middlewares/auth.middleware';
import isAdminMiddleware from '../middlewares/is-admin.middleware';

const router = Router();

router.get('/', authMiddleware, isAdminMiddleware, UserController.list);

export default router;

import express from 'express';
import router_users from './user.routes.js';
import router_auth from './auth.routes.js';

const router = express.Router();

router.use('/users', router_users);
router.use('/me', router_auth);

export default router;
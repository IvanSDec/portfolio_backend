import express from 'express';
import { ME } from '../controllers/auth.ctrl.js';
import { verifyToken } from '../middleware/auth.js';

const router_auth = express.Router();

router_auth.get('/', verifyToken, ME);

export default router_auth;
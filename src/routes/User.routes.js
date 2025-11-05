import express from 'express';
import { GET_ALL, CREATE_ONE, GET_ONE, DELETE_USER, UPDATE_USER, COMPARE_PASSWORD } from '../controllers/users.ctl.js';

const router_users = express.Router();

router_users.route('/')
    .get(GET_ALL)
    .post(CREATE_ONE);

router_users.route('/individual')
    .get(GET_ONE)
    .put(UPDATE_USER)
    .delete(DELETE_USER);

router_users.route('/compare-password')
    .post(COMPARE_PASSWORD);

export default router_users;

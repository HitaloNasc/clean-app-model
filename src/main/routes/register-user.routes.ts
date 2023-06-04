import Router from 'express';
import { makeRegisterUserController } from '../factories';
import { adaptRoute } from '../adapters';

const router = Router();
const path = '/user';

router.post('/register', adaptRoute(makeRegisterUserController()));

export { router, path };

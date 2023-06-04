import Router from 'express';
import { makeRegisterUserController } from '../factories';
import { adaptRoute } from '../adapters';

const router = Router();
const path = '/user';

router.post('/', adaptRoute(makeRegisterUserController()));

export { router, path };

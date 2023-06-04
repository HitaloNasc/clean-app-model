import { makeRegisterUserController } from './register-user';
import { RegisterUserController } from '@/presentation/controllers';

describe('Register User factory', () => {
    it('should return an instance of RegisterUserController', () => {
        expect(makeRegisterUserController()).toBeInstanceOf(RegisterUserController);
    });
});

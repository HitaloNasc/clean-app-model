import { RegisterUserController } from '@/presentation/controllers';
import { RegisterUser } from '@/usecases/register-user';
import { PrismaUserRepository } from '@/external/repositories/prisma';

export const makeRegisterUserController = () => {
    const userRepository = new PrismaUserRepository();
    const registerUser = new RegisterUser(userRepository);
    const registerUserController = new RegisterUserController(registerUser);
    return registerUserController;
};

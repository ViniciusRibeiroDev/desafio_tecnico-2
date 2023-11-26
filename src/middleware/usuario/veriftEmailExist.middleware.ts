import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../error';

export const verifyEmailExits = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = req.body;

  const repository = AppDataSource.getRepository(User);

  const user = await repository.findOne({
    where: {
      email: email,
    },
  });

  if (user) throw new AppError(`E-mail já existente`, 409);

  next();
};

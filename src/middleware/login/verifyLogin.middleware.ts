import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';
import { compareSync } from 'bcryptjs';
import { AppError } from '../../error';

export const verifyLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const repository = AppDataSource.getRepository(User);
  const { body } = req;

  const user = await repository
    .createQueryBuilder()
    .where('email = :email', { email: body.email })
    .getOne();

  if (!user) throw new AppError(`Usuário e/ou senha inválidos`, 401);

  const senhaBody = body.senha;

  const senhaUser = user.senha;

  const senhaVerify = compareSync(senhaBody, senhaUser);

  if (!senhaVerify) throw new AppError(`Usuário e/ou senha inválidos`, 401);

  res.locals.loginUserResponse = user;

  next();
};

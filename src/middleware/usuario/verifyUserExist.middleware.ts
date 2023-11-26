import { NextFunction, Request, Response } from 'express';
import { User } from '../../entities/user.entity';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';
import jwt from 'jsonwebtoken';

export const verifyUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) throw new AppError('Não autorizado', 401);

  jwt.verify(token, String(process.env.SECRET_KEY), (err: any, decode: any) => {
    if (err) throw new AppError('Sessão inválida', 401);

    console.log(decode, 'decode');

    res.locals.id = decode.sub;
  });

  const repository = AppDataSource.getRepository(User);

  const user = await repository.findOneBy({ token });

  if (user === null) throw new AppError('Usuário não encontrado', 404);

  next();
};

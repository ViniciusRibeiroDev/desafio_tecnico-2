import { fintUserService } from '../../services/usuario/findUser.service';
import { Request, Response } from 'express';

export const findUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = res.locals.id;

  const response = await fintUserService(id);

  return res.status(200).json(response);
};

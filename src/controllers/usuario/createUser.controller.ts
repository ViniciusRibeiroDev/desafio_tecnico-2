import { createUserService } from '../../services/usuario/createUser.service';
import { Request, Response } from 'express';

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { body } = req;

  const response = await createUserService(body);

  return res.status(201).json(response);
};

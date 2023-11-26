import { loginService } from '../../services/login/login.service';
import { Request, Response } from 'express';

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { loginUserResponse } = res.locals;

  const token = await loginService(loginUserResponse);

  return res.status(200).json({ token });
};

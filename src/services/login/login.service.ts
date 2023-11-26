import { sign } from 'jsonwebtoken';
import { Usuario } from '../../interfaces/usuario.inteface';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';

export const loginService = async (data: User) => {
  const repository = AppDataSource.getRepository(User);

  const token = sign({ foo: 'bar' }, process.env.SECRET_KEY!, {
    subject: String(data.id),
    expiresIn: 30 * 60,
  });

  const ultimoLoginDate = new Date().toISOString().split('T')[0];

  await repository
    .createQueryBuilder()
    .update(User)
    .set({
      token: token,
      ultimo_login: ultimoLoginDate,
    })
    .where('id = :id', { id: data.id })
    .execute();

  return token;
};

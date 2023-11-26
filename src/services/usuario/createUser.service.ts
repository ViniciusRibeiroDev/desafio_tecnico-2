import { usuarioResponseSchema } from '../../schemas/usuario.schema';
import { UsuarioRequest } from '../../interfaces/usuario.inteface';
import { Telefone } from '../../entities/telefone.entity';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';
import { sign } from 'jsonwebtoken';
import { loginService } from '../login/login.service';

export const createUserService = async (data: UsuarioRequest) => {
  const repository = AppDataSource.getRepository(User);
  const repositoryTelefone = AppDataSource.getRepository(Telefone);

  const { telefone, ...dataUsuario } = data;

  const ultimoLoginDate = new Date().toISOString().split('T')[0];

  const createUsuario = repository.create({
    ...dataUsuario,
    ultimo_login: ultimoLoginDate,
  });

  let token = await loginService(createUsuario);

  createUsuario.token = token;

  const usuario = await repository.save(createUsuario);

  telefone.map(async (telefone) => {
    const createTelefone = repositoryTelefone.create({
      ...telefone,
      user: usuario,
    });

    await repositoryTelefone.save(createTelefone);
  });

  token = await loginService(usuario);

  return usuarioResponseSchema.parse({ ...createUsuario, token });
};

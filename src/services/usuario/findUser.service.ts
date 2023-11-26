import { capturarUsuarioSchema } from '../../schemas/usuario.schema';
import { Telefone } from '../../entities/telefone.entity';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';

export const fintUserService = async (id: number) => {
  const repository = AppDataSource.getRepository(User);
  const repositoryTelefone = AppDataSource.getRepository(Telefone);

  const user = await repository.findOneBy({ id });

  const telefone = await repositoryTelefone.find({
    where: {
      user: {
        id,
      },
    },
    relations: {
      user: true,
    },
  });

  return capturarUsuarioSchema.parse({ ...user, telefone });
};

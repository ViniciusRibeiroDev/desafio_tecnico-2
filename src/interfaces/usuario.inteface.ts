import {
  capturarUsuarioSchema,
  usuarioRequestSchema,
  usuarioResponseSchema,
  usuarioSchema,
} from '../schemas/usuario.schema';
import { z } from 'zod';

export type UsuarioRequest = z.infer<typeof usuarioRequestSchema>;

export type UsuarioResponse = z.infer<typeof usuarioResponseSchema>;

export type Usuario = z.infer<typeof usuarioSchema>;

export type CapturarUsuario = z.infer<typeof capturarUsuarioSchema>;

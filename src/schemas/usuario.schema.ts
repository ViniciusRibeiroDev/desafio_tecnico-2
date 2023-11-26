import { z } from 'zod';

export const telefoneSchema = z.object({
  id: z.number(),
  numero: z.string().max(10),
  ddd: z.string().max(3),
});

export const usuarioSchema = z.object({
  id: z.number(),
  data_criacao: z.string(),
  data_atualizacao: z.string(),
  ultimo_login: z.string(),
  token: z.string(),
  nome: z.string().max(80),
  email: z.string().max(50),
  senha: z.string(),
  telefone: telefoneSchema.array(),
});

export const telefoneRequestSchema = z.object({
  numero: z.string().max(10),
  ddd: z.string().max(3),
});

export const usuarioRequestSchema = z.object({
  nome: z.string().max(80),
  email: z.string().max(50),
  senha: z.string(),
  telefone: telefoneRequestSchema.array(),
});

export const usuarioResponseSchema = z.object({
  id: z.number(),
  data_criacao: z.string(),
  data_atualizacao: z.string(),
  ultimo_login: z.string(),
  token: z.string(),
});

export const capturarUsuarioSchema = usuarioSchema.omit({
  senha: true,
});

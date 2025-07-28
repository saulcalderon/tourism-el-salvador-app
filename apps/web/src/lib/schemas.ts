import { z } from 'zod';

export const createPlaceSchema = z.object({
  name: z
    .string()
    .min(1, 'Nombre es requerido')
    .min(5, 'El nombre debe tener al menos 5 caracteres'),
  address: z
    .string()
    .min(1, 'Dirección es requerida')
    .min(5, 'La dirección debe tener al menos 5 caracteres'),
  description: z
    .string()
    .min(1, 'Descripción es requerida')
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
  url: z.url('Por favor ingrese una URL válida'),
});

export type CreatePlaceForm = z.infer<typeof createPlaceSchema>;

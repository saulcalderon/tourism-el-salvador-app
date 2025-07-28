'use client';

import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { createPlace } from '@/lib/api';
import { CreatePlaceForm, createPlaceSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function PlaceForm() {
  const router = useRouter();

  const form = useForm<CreatePlaceForm>({
    resolver: zodResolver(createPlaceSchema),
    defaultValues: {
      name: '',
      address: '',
      description: '',
      url: '',
    },
  });

  async function onSubmit(values: CreatePlaceForm) {
    try {
      await createPlace(values);
      toast.success('¡Destino creado exitosamente!');
      router.push('/places');
    } catch (error) {
      console.error('Error creating place:', error);
      toast.error('Error al crear el destino. Por favor, intenta nuevamente.');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre:</FormLabel>
              <FormControl>
                <Input placeholder="Volcán de Santa Ana" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección:</FormLabel>
              <FormControl>
                <Input placeholder="Santa Ana, El Salvador" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción:</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="El volcán más alto de El Salvador..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL imagen:</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full italic"
        >
          {form.formState.isSubmitting ? 'Agregando...' : 'Agregar destino'}
        </Button>
      </form>
    </Form>
  );
}

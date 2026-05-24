'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function addProject(formData: FormData) {
  const name = String(formData.get('name') ?? '');
  const color = String(formData.get('color') ?? '#3498db');

  await prisma.project.create({
    data: { name, color },
  });

  revalidatePath('/dashboard');
}

export async function renameProject(formData: FormData) {
  const id = Number(formData.get('id'));
  const newName = String(formData.get('newName') ?? '');

  await prisma.project.update({
    where: { id },
    data: { name: newName },
  });

  revalidatePath('/dashboard');
}

export async function deleteProject(formData: FormData) {
  const id = Number(formData.get('id'));

  await prisma.project.delete({
    where: { id },
  });

  revalidatePath('/dashboard');
}
 
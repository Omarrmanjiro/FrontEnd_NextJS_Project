'use server';
import { revalidatePath } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
const API_URL = `${BASE_URL}/api/projects`;

export async function addProject(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color }),
  });

  revalidatePath('/dashboard');
}

export async function renameProject(formData: FormData) {
  const id = formData.get('id') as string;
  const newName = formData.get('newName') as string;

  const projectRes = await fetch(`${API_URL}/${id}`);
  const project = await projectRes.json();

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName, color: project.color }),
  });

  revalidatePath('/dashboard');
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;

  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  revalidatePath('/dashboard');
} 
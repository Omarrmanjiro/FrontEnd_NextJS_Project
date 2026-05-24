import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  const projects = await prisma.project.findMany();
  return projects.map((project) => ({ id: String(project.id) }));
}

export default async function ProjectPage({ params }: Props) {
  const project = await prisma.project.findUnique({
    where: { id: Number(params.id) },
  });

  if (!project) {
    notFound();
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>
        <span
          style={{
            display: 'inline-block',
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: project.color,
            marginRight: 8,
          }}
        />
        {project.name}
      </h1>
      <p>Créé le : {project.createdAt.toLocaleDateString('fr-FR')}</p>
      <a href="/dashboard">← Retour au Dashboard</a>
    </div>
  );
}

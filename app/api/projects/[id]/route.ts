import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

function readDB() {
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  return data;
}

function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = readDB();
  const project = db.projects.find((project: any) => project.id === params.id);

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const db = readDB();
  const projectIndex = db.projects.findIndex((project: any) => project.id === params.id);

  if (projectIndex === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const updatedProject = {
    ...db.projects[projectIndex],
    name: body.name,
    color: body.color,
  };

  db.projects[projectIndex] = updatedProject;
  writeDB(db);

  return NextResponse.json(updatedProject);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = readDB();
  const projectIndex = db.projects.findIndex((project: any) => project.id === params.id);

  if (projectIndex === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  db.projects.splice(projectIndex, 1);
  writeDB(db);

  return NextResponse.json({});
}

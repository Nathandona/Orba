import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all available templates
export async function GET() {
  try {
    const templates = await prisma.projectTemplate.findMany({
      where: {
        isActive: true,
        isPublic: true,
      },
      orderBy: [
        { plan: 'asc' }, // free templates first
        { category: 'asc' },
        { name: 'asc' },
      ],
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        plan: true,
        color: true,
        columns: true,
        sampleTasks: true,
      },
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}
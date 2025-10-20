import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET columns for a project
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify project access
    const project = await prisma.project.findFirst({
      where: {
        id,
        OR: [
          { userId: user.id }, // User is owner
          {
            members: {
              some: {
                email: user.email,
                status: 'active'
              }
            }
          }, // User is member
        ],
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const columns = await prisma.column.findMany({
      where: { projectId: id },
      orderBy: { position: 'asc' },
      include: {
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    });

    return NextResponse.json(columns);
  } catch (error) {
    console.error('Error fetching columns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch columns' },
      { status: 500 }
    );
  }
}

// POST create a new column
export async function POST(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify project ownership
    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: user.id, // Only owners can create columns
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found or access denied' }, { status: 404 });
    }

    const body = await req.json();
    const { title, color } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Get the highest position for this project
    const maxPositionColumn = await prisma.column.findFirst({
      where: { projectId: id },
      orderBy: { position: 'desc' },
      select: { position: true },
    });

    const newPosition = (maxPositionColumn?.position || 0) + 1;

    const column = await prisma.column.create({
      data: {
        title: title.trim(),
        color: color || 'border-gray-500',
        position: newPosition,
        projectId: id,
      },
      include: {
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    });

    return NextResponse.json(column);
  } catch (error) {
    console.error('Error creating column:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A column with this title already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create column' },
      { status: 500 }
    );
  }
}
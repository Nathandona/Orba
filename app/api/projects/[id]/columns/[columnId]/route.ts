import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ id: string; columnId: string }>;
}

// PUT update a column
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    const { id, columnId } = await params;

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
        userId: user.id, // Only owners can update columns
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found or access denied' }, { status: 404 });
    }

    // Verify column belongs to project
    const existingColumn = await prisma.column.findFirst({
      where: {
        id: columnId,
        projectId: id,
      },
    });

    if (!existingColumn) {
      return NextResponse.json({ error: 'Column not found' }, { status: 404 });
    }

    const body = await req.json();
    const { title, color, position } = body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title.trim();
    if (color !== undefined) updateData.color = color;
    if (position !== undefined) updateData.position = position;

    const column = await prisma.column.update({
      where: { id: columnId },
      data: updateData,
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
    console.error('Error updating column:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A column with this title already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update column' },
      { status: 500 }
    );
  }
}

// DELETE a column (and all its tasks)
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    const { id, columnId } = await params;

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
        userId: user.id, // Only owners can delete columns
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found or access denied' }, { status: 404 });
    }

    // Verify column belongs to project
    const column = await prisma.column.findFirst({
      where: {
        id: columnId,
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

    if (!column) {
      return NextResponse.json({ error: 'Column not found' }, { status: 404 });
    }

    // Don't allow deletion of the last column (minimum 1 column required)
    const columnCount = await prisma.column.count({
      where: { projectId: id },
    });

    if (columnCount <= 1) {
      return NextResponse.json(
        { error: 'Cannot delete the last column. At least one column is required.' },
        { status: 400 }
      );
    }

    // Delete the column (this will cascade delete all tasks in the column)
    await prisma.column.delete({
      where: { id: columnId },
    });

    return NextResponse.json({
      success: true,
      message: `Column "${column.title}" and ${column._count.tasks} task(s) deleted successfully`
    });
  } catch (error) {
    console.error('Error deleting column:', error);
    return NextResponse.json(
      { error: 'Failed to delete column' },
      { status: 500 }
    );
  }
}
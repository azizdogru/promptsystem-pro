import { NextResponse } from 'next/server';
import { getRoleBySlug, ALL_ROLES } from '@/data/roles';
import { generateRolePdf } from '@/lib/pdfGenerator';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug') || searchParams.get('role');

    const kit = slug ? getRoleBySlug(slug) : ALL_ROLES[0];
    if (!kit) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    }

    const pdfBytes = generateRolePdf(kit);
    const safeRoleName = kit.role.replace(/[^a-zA-Z0-9_-]/g, '_');

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeRoleName}_Executive_AI_Protocol.pdf"`,
      },
    });
  } catch (error) {
    console.error('Download Guide PDF error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}

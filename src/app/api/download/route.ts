import { NextResponse } from 'next/server';
import { getRoleBySlug, ALL_ROLES } from '@/data/roles';
import { generateRoleMarkdown } from '@/lib/markdownGenerator';
import { generateRoleDocx } from '@/lib/docxGenerator';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug') || searchParams.get('role');
    const format = searchParams.get('format') || 'docx';

    const kit = slug ? getRoleBySlug(slug) : ALL_ROLES[0];
    if (!kit) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    }

    const safeRoleName = kit.role.replace(/[^a-zA-Z0-9_-]/g, '_');

    if (format === 'md') {
      const mdContent = generateRoleMarkdown(kit);
      return new NextResponse(mdContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Content-Disposition': `attachment; filename="${safeRoleName}_AI_Master_Playbook.md"`,
        },
      });
    }

    if (format === 'json') {
      const jsonContent = JSON.stringify(
        {
          role: kit.role,
          badge: kit.badge,
          masterSystemPrompt: kit.masterSystemPrompt,
          promptChains: kit.promptChains,
          knowledgeBase: kit.knowledgeBaseSnippets,
        },
        null,
        2
      );
      return new NextResponse(jsonContent, {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Disposition': `attachment; filename="${safeRoleName}_Claude_Project_Config.json"`,
        },
      });
    }

    // Default to DOCX
    const docxBytes = await generateRoleDocx(kit);
    return new NextResponse(Buffer.from(docxBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${safeRoleName}_AI_Operations_Manual.docx"`,
      },
    });
  } catch (error) {
    console.error('Download API error:', error);
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 });
  }
}

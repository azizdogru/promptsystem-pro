import fs from 'fs';
import path from 'path';
import { ALL_ROLES } from '../src/data/roles';
import { generateRoleDocx } from '../src/lib/docxGenerator';
import { generateRolePdf } from '../src/lib/pdfGenerator';
import { generateRoleMarkdown } from '../src/lib/markdownGenerator';
import { generateRoleZip } from '../src/lib/zipGenerator';

const targetSlugs = [
  'high-school-teacher-ai-prompts-system-workflows',
  'general-contractor-ai-prompts-system-workflows',
  'executive-chef-ai-prompts-system-workflows',
  'veterinarian-animal-clinic-ai-prompts-system-workflows',
  'certified-personal-trainer-ai-prompts-system-workflows',
  'staff-software-engineer-ai-prompts-system-workflows',
];

async function run() {
  const outputDir = path.resolve(process.cwd(), 'sample-deliverables');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const slug of targetSlugs) {
    const kit = ALL_ROLES.find((r) => r.slug === slug);

    if (!kit) {
      console.warn(`Role ${slug} not found!`);
      continue;
    }

    console.log(`Generating deliverable assets for: ${kit.role} (${kit.slug})...`);

    // 1. Docx
    const docxBuf = await generateRoleDocx(kit);
    fs.writeFileSync(path.join(outputDir, `${kit.slug}-Operations-Manual.docx`), docxBuf);

    // 2. Markdown
    const mdBuf = generateRoleMarkdown(kit);
    fs.writeFileSync(path.join(outputDir, `${kit.slug}-Master-Playbook.md`), mdBuf, 'utf-8');

    // 3. PDF
    const pdfBuf = generateRolePdf(kit);
    fs.writeFileSync(path.join(outputDir, `${kit.slug}-Executive-Protocol.pdf`), pdfBuf);

    // 4. Complete ZIP bundle
    const zipBuf = await generateRoleZip(kit);
    fs.writeFileSync(path.join(outputDir, `${kit.slug}-Complete-System-Pack.zip`), zipBuf);

    console.log(`✓ Completed ${kit.slug}: DOCX (${docxBuf.length} bytes), MD (${mdBuf.length} chars), PDF (${pdfBuf.length} bytes), ZIP (${zipBuf.length} bytes)`);
  }

  console.log('\nAll sample deliverables successfully created in:', outputDir);
}

run().catch((err) => {
  console.error('Error generating sample deliverables:', err);
  process.exit(1);
});

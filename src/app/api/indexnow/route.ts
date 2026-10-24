import { NextResponse } from 'next/server';

export async function GET() {
  const host = 'promptsystem-pro.vercel.app';
  const key = '8f3e2a9b6c1d4e7f8a0b2c4d6e8f1a3b';
  const keyLocation = `https://${host}/${key}.txt`;

  const urls = [
    `https://${host}/`,
    `https://${host}/sitemap.xml`,
  ];

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation, urlList: urls }),
    });

    return NextResponse.json({
      success: true,
      status: res.status,
      message: 'IndexNow ping sent successfully',
      urlsPinged: urls.length,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

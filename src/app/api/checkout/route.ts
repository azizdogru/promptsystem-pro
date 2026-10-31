import { NextResponse } from 'next/server';
import { getRoleBySlug } from '@/data/roles';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { roleSlug, plan = 'single', email } = body;

    const kit = roleSlug ? getRoleBySlug(roleSlug) : null;
    const isBundle = plan === 'bundle';

    const priceCents = isBundle ? 3900 : 1900;
    const productName = isBundle
      ? 'All-Access AI Operating Systems & Master Prompt Library (All 50+ Roles)'
      : kit
      ? `${kit.role} — AI Operating System & Master Prompt Playbook (Claude & GPT)`
      : 'Professional AI Operating System & Master Prompt Playbook';

    const productDescription = isBundle
      ? 'Instant unlocked access to all 50+ professional role prompt systems, Claude Project setups, custom GPT configurations, Word .docx manuals, and printable PDF cheat sheets.'
      : kit
      ? `Production-grade multi-step prompt chains, XML Claude instructions, and workflow automations for ${kit.role}. Saves ~${kit.hoursSavedWeekly} hours/week.`
      : 'Comprehensive production-grade AI prompt and workflow operating system.';

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://promptsystem-pro.vercel.app');

    const redirectUrl = `${baseUrl}/success?plan=${plan}${roleSlug ? `&slug=${roleSlug}` : ''}`;

    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID || '502656';
    const variantId = process.env.LEMONSQUEEZY_VARIANT_ID || '2280326';

    if (apiKey) {
      try {
        const lsRes = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
          },
          body: JSON.stringify({
            data: {
              type: 'checkouts',
              attributes: {
                custom_price: priceCents,
                product_options: {
                  name: productName,
                  description: productDescription,
                  redirect_url: redirectUrl,
                },
                checkout_data: {
                  email: email || undefined,
                  custom: {
                    role: roleSlug || 'all',
                    plan: plan,
                  },
                },
              },
              relationships: {
                store: {
                  data: {
                    type: 'stores',
                    id: String(storeId),
                  },
                },
                variant: {
                  data: {
                    type: 'variants',
                    id: String(variantId),
                  },
                },
              },
            },
          }),
        });

        if (lsRes.ok) {
          const resJson = await lsRes.json();
          const checkoutUrl = resJson?.data?.attributes?.url;
          if (checkoutUrl) {
            return NextResponse.json({ url: checkoutUrl });
          }
        }
      } catch (e) {
        console.error('Dynamic LemonSqueezy session error:', e);
      }
    }

    const fallbackBaseUrl = process.env.LEMONSQUEEZY_CHECKOUT_URL;
    if (!fallbackBaseUrl || fallbackBaseUrl.includes('44ba076c-b57d-429b-af3d-6962ccf4dc46')) {
      return NextResponse.json({ error: 'Payment gateway temporarily unavailable. Please try again shortly.' }, { status: 503 });
    }

    const fallbackUrl = `${fallbackBaseUrl}?checkout[custom][role]=${roleSlug || 'all'}&checkout[custom][plan]=${plan}&checkout[success_url]=${encodeURIComponent(redirectUrl)}`;

    return NextResponse.json({ url: fallbackUrl });
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json({ error: 'Failed to process checkout' }, { status: 500 });
  }
}

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  Check,
  X,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Clock,
  DollarSign,
  Lock,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

interface Props {
  params: {
    competitor: string;
  };
}

export function generateStaticParams() {
  return [
    { competitor: 'legalzoom' },
    { competitor: 'rocket-lawyer' },
  ];
}

interface CompetitorData {
  slug: string;
  name: string;
  price: string;
  priceSubtext: string;
  model: string;
  headline: string;
  subheadline: string;
  warningCallout: string;
  features: {
    feature: string;
    ourValue: string;
    competitorValue: string;
    ourWin: boolean;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

const COMPETITORS: Record<string, CompetitorData> = {
  'legalzoom': {
    slug: 'legalzoom',
    name: 'LegalZoom',
    price: '$149.00+',
    priceSubtext: 'Per document + upsells',
    model: 'Expensive Pay-Per-Form or $300+/yr Retainer',
    headline: 'PromptSystemPro vs LegalZoom (2026 Comparison)',
    subheadline: 'Why pay $149+ on LegalZoom for enterprise ai prompt architecture & system templates when you can generate the exact same attorney-grade, state-compliant document for just $9.90?',
    warningCallout: 'LegalZoom charges an exorbitant $149 or more for standard legal documents and routinely pushes high-pressure attorney retainer subscriptions. PromptSystemPro gives you full statutory compliance for a transparent one-time payment of $9.90.',
    features: [
      {
        feature: 'Initial Price for Document',
        ourValue: '$9.90 (One-Time)',
        competitorValue: '$149.00+ (Per Document)',
        ourWin: true,
      },
      {
        feature: 'Subscription or Auto-Renew Trap',
        ourValue: 'None (Zero recurring charges)',
        competitorValue: 'Pushes $300+/yr legal retainers',
        ourWin: true,
      },
      {
        feature: 'Completion & Download Time',
        ourValue: 'Under 3 Minutes',
        competitorValue: '15 - 25 Minutes (Heavy upsell maze)',
        ourWin: true,
      },
      {
        feature: '2026 Statutory Compliance Citation',
        ourValue: 'Included (NIST AI Risk Management Framework & LLM Production Standards)',
        competitorValue: 'Generic nationwide boilerplate',
        ourWin: true,
      },
      {
        feature: 'Instant Unrestricted PDF & Print Ready',
        ourValue: 'Yes, full commercial & legal rights',
        competitorValue: 'Basic draft with upgrade prompts',
        ourWin: true,
      },
      {
        feature: 'Specialized Purpose & Clauses',
        ourValue: 'Tailored specifically for production LLM prompt engineering chains, evaluation harnesses, and system instructions',
        competitorValue: 'Broad generalized template',
        ourWin: true,
      },
      {
        feature: 'No Telemarketing or Sales Calls',
        ourValue: '100% Confidential (Zero phone calls)',
        competitorValue: 'Frequent attorney upsell calls',
        ourWin: true,
      },
      {
        feature: 'Guaranteed One-Time Checkout',
        ourValue: 'Single flat payment, keep forever',
        competitorValue: 'Complex multi-tier billing checkout',
        ourWin: true,
      },
    ],
    faq: [
      {
        question: 'Why is PromptSystemPro so much more affordable than LegalZoom?',
        answer: 'LegalZoom carries massive corporate overhead, expensive television advertising, and legal sales networks. PromptSystemPro is a dedicated specialized platform engineered for statutory accuracy, passing 90% savings directly to you.',
      },
      {
        question: 'Is the document from PromptSystemPro as legally valid as LegalZoom?',
        answer: 'Yes. Our documents cite the exact statutory frameworks governing enterprise ai prompt architecture & system templates, ensuring full compliance with current 2026 legal standards.',
      },
      {
        question: 'Will I be charged any hidden subscription fees on PromptSystemPro?',
        answer: 'Never. You pay exactly $9.90 once. There are no monthly memberships, no hidden recurring fees, and no unexpected credit card charges.',
      },
    ],
  },
  'rocket-lawyer': {
    slug: 'rocket-lawyer',
    name: 'Rocket Lawyer',
    price: '$39.99/mo',
    priceSubtext: '$479.88 per year recurring',
    model: 'Subscription Auto-Billing Trap',
    headline: 'PromptSystemPro vs Rocket Lawyer (2026 Comparison)',
    subheadline: 'Beware of the $39.99/month recurring subscription trap. Get your attorney-grade enterprise ai prompt architecture & system templates for a transparent one-time payment of $9.90.',
    warningCallout: 'Rocket Lawyer advertises a "free trial," but requires your credit card and quietly auto-bills $39.99 every month ($479.88/year) unless you cancel within 7 days. Most users only need a single document.',
    features: [
      {
        feature: 'True First-Year Cost',
        ourValue: '$9.90 (One-Time)',
        competitorValue: '$479.88 ($39.99/mo subscription)',
        ourWin: true,
      },
      {
        feature: 'Billing Type',
        ourValue: 'Pay Once, Keep Forever',
        competitorValue: 'Monthly recurring subscription',
        ourWin: true,
      },
      {
        feature: 'Risk of Unexpected Charges',
        ourValue: '0% (No recurring billing)',
        competitorValue: 'High ($39.99/month automatic rebills)',
        ourWin: true,
      },
      {
        feature: '2026 Statutory Legal Compliance',
        ourValue: 'Exact statutory citations (NIST AI Risk Management Framework & LLM Production Standards)',
        competitorValue: 'Broad multi-state templates',
        ourWin: true,
      },
      {
        feature: 'Instant Download Without Membership',
        ourValue: 'Instant clean PDF unlock',
        competitorValue: 'Locked behind account & membership',
        ourWin: true,
      },
      {
        feature: 'Ease of Cancellation',
        ourValue: 'No account or cancellation needed',
        competitorValue: 'Multi-step cancellation process',
        ourWin: true,
      },
      {
        feature: 'Specialized Legal Clauses',
        ourValue: 'Strictly built for production LLM prompt engineering chains, evaluation harnesses, and system instructions',
        competitorValue: 'Standard generic templates',
        ourWin: true,
      },
      {
        feature: 'Privacy & Spam Protection',
        ourValue: 'Zero promotional emails or upsells',
        competitorValue: 'Continuous subscription sales marketing',
        ourWin: true,
      },
    ],
    faq: [
      {
        question: 'How does Rocket Lawyer\'s pricing work compared to PromptSystemPro?',
        answer: 'Rocket Lawyer charges $39.99 every month after their initial 7-day trial. If you forget to cancel, you could pay $120 to $480 for a single document. PromptSystemPro charges a single flat fee of $9.90 with zero monthly billing.',
      },
      {
        question: 'Do I need a continuous monthly subscription for my document?',
        answer: 'No. Most legal documents are one-time transactions. Once your enterprise ai prompt architecture & system templates is executed and downloaded, you do not need an ongoing subscription.',
      },
      {
        question: 'Does PromptSystemPro require an account or credit card trial?',
        answer: 'No account creation, no password to remember, and no recurring trial. Fill out the step-by-step form in 3 minutes and download your completed official document immediately.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const competitor = COMPETITORS[params.competitor];
  if (!competitor) return {};

  const title = `${competitor.headline} | Save Money With PromptSystemPro`;
  const description = competitor.slug === 'legalzoom'
    ? 'Comparing PromptSystemPro vs LegalZoom. Why pay $149+ with high-pressure upsells? Get an official statutory Enterprise AI Prompt Architecture & System Templates for just $9.90 one-time.'
    : 'PromptSystemPro vs Rocket Lawyer comparison. Avoid the $39.99/month ($480/yr) subscription trap. Download your official Enterprise AI Prompt Architecture & System Templates for a flat $9.90.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
    },
    alternates: {
      canonical: `/vs/${params.competitor}`,
    },
  };
}

export default function CompetitorComparisonPage({ params }: Props) {
  const competitor = COMPETITORS[params.competitor];

  if (!competitor) {
    notFound();
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: competitor.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Prompt System Pro AI Prompts (vs ${competitor.name})`,
    description: `Attorney-grade 2026 statutory legal documentation. A transparent, one-time alternative to ${competitor.name} with no monthly subscription traps.`,
    image: 'https://promptsystem-pro.vercel.app/og-image.png',
    sku: `PROMPTSYSTEM-PRO-VS-${competitor.slug.toUpperCase()}-2026`,
    brand: {
      '@type': 'Brand',
      name: 'Prompt System Pro AI Prompts',
    },
    offers: {
      '@type': 'Offer',
      price: '9.90',
      priceCurrency: 'USD',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      url: `https://promptsystem-pro.vercel.app/vs/${competitor.slug}`,
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnOnline',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0.00',
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1240',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2026 Cost & Legal Compliance Comparison</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            {competitor.headline}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {competitor.subheadline}
          </p>

          {/* Quick Winner Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 text-sm mt-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">PromptSystemPro:</span>
              <strong className="text-emerald-400 font-extrabold text-lg">$9.90 One-Time</strong>
            </div>
            <div className="h-4 w-px bg-slate-700 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{competitor.name}:</span>
              <strong className="text-rose-400 font-bold line-through">{competitor.price}</strong>
              <span className="text-xs text-rose-300">({competitor.priceSubtext})</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Warning Callout Box */}
        <div className="bg-amber-50 border-2 border-amber-300/80 rounded-2xl p-6 sm:p-7 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-amber-100 rounded-xl text-amber-800 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-amber-950">
                Consumer Transparency Notice: {competitor.name} Pricing Reality
              </h2>
              <p className="text-sm text-amber-900 leading-relaxed">
                {competitor.warningCallout}
              </p>
            </div>
          </div>
        </div>

        {/* Feature Comparison Matrix */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Head-to-Head Feature Comparison
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Compare key features, statutory compliance, and total out-of-pocket costs before you pay.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs sm:text-sm">
                  <th className="py-4 px-4 sm:px-6 font-bold text-slate-700 w-2/5">Feature / Metric</th>
                  <th className="py-4 px-4 sm:px-6 font-black text-blue-700 bg-blue-50/50 w-3/10">
                    PromptSystemPro (Recommended)
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-bold text-slate-500 w-3/10">
                    {competitor.name}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {competitor.features.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-900">
                      {item.feature}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 bg-blue-50/20 font-bold text-emerald-700">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{item.ourValue}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{item.competitorValue}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Why Brand Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Zero Recurring Fees</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlike {competitor.name}, you are never billed monthly. You pay $9.90 once and own your customized legal document permanently.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">2026 Statutory Codes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our automated system strictly incorporates the latest 2026 statutory requirements for production LLM prompt engineering chains, evaluation harnesses, and system instructions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Instant Access in 3 Minutes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No account creation, no password setup, and no waiting. Your completed document compiles instantly in your browser.
            </p>
          </div>
        </section>

        {/* High-Converting CTA Box */}
        <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Flat $9.90 • 100% Money-Back Guarantee</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ready to Complete Your Enterprise AI Prompt Architecture & System Templates?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Skip {competitor.name}&apos;s expensive fees and confusing subscriptions. Create your attorney-grade enterprise ai prompt architecture & system templates right now.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/30 transition transform active:scale-95"
              >
                <span>Get Prompt Architecture ($9.90)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Detailed FAQ Section */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Everything you need to know about choosing PromptSystemPro over {competitor.name}.
            </p>
          </div>

          <div className="space-y-4">
            {competitor.faq.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2"
              >
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{item.question}</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-6">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

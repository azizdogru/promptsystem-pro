import React from 'react';

export function SeoSchema() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: "Enterprise AI Workflows & Role Prompt Libraries",
    description: "50+ industry-tested AI operating prompt libraries, Custom GPT workflows, and automation playbooks for professionals.",
    brand: {
      '@type': 'Brand',
      name: "PromptSystem Pro",
    },
    offers: {
      '@type': 'Offer',
      price: "29.00",
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: "https://promptsystem-pro.vercel.app",
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: "4.9",
      reviewCount: "142",
      bestRating: '5',
      worstRating: '1',
    },
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: "PromptSystem Pro",
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: "29.00",
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: "4.9",
      reviewCount: "142",
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "What AI models are these prompts designed for?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "All workflows are tested and optimized for GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro to produce high-grade professional deliverables.",
        },
      },
      {
        '@type': 'Question',
        name: "Are these just simple generic prompts?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "No. These are multi-step system architectures featuring role parameters, negative constraints, and few-shot formatting rules.",
        },
      }
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

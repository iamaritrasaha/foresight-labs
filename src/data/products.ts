export type Product = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  status: string;
  accent: string;
  logo: string;
  brandImage?: string;
  deviceLabel: string;
  playStoreUrl: string | null;
  repositoryUrl: string | null;
  privacyPolicyUrl: string | null;
  purpose: string;
  capabilityEyebrow: string;
  capabilityHeading: string;
  capabilitySummary: string;
  capabilities: string[];
  capabilityDescriptions: string[];
  philosophy: string;
  trust: string;
};

export const products: Product[] = [
  {
    name: 'Foresight', slug: 'foresight', tagline: 'Know Today. Prepare Tomorrow.',
    description: 'A privacy-conscious personal life intelligence application that brings tasks, memories, health, relationships, planning and proactive assistance together in one thoughtfully designed experience.',
    status: 'Internal Testing', accent: 'mint', logo: 'F', brandImage: 'images/foresight-app-icon.svg', deviceLabel: 'Daily rhythm',
    playStoreUrl: null, repositoryUrl: null, privacyPolicyUrl: null,
    purpose: 'To make the shape of everyday life easier to see, without turning a person into a set of metrics.',
    capabilityEyebrow: 'Core capabilities',
    capabilityHeading: 'Built around real life.',
    capabilitySummary: 'Planning, personal context, health and assistance come together without crowding the experience.',
    capabilities: ['Tasks and personal planning', 'Memory and relationship context', 'Health information with source-aware privacy', 'Proactive assistance that respects attention'],
    capabilityDescriptions: [
      'Bring tasks, routines and priorities into one calm planning experience.',
      'Keep useful personal context available when it matters, without adding noise.',
      'Present health information with visible sources and privacy-conscious controls.',
      'Offer timely support without turning every moment into another notification.',
    ],
    philosophy: 'Foresight is being shaped as a calm layer between intention and action: useful when needed, quiet when not.',
    trust: 'Personal context deserves care. The product is being built around thoughtful controls, clear provenance and privacy-conscious defaults.',
  },
  {
    name: 'AURA News', slug: 'aura', tagline: 'News, beautifully distilled.',
    description: 'A premium RSS and Atom news reader focused on elegant reading, trusted sources, intelligent organisation, optional AI assistance and a refined frosted-glass interface.',
    status: 'Internal Testing', accent: 'violet', logo: 'A', brandImage: 'images/aura-app-icon.webp', deviceLabel: 'Your reading space',
    playStoreUrl: null, repositoryUrl: null, privacyPolicyUrl: null,
    purpose: 'To bring the pleasure and context back to keeping up, with less noise between a reader and a good story.',
    capabilityEyebrow: 'Reading capabilities',
    capabilityHeading: 'Designed for thoughtful reading.',
    capabilitySummary: 'Direct sources, focused views, considered organisation and optional intelligence support a quieter way to keep up.',
    capabilities: ['RSS and Atom source reading', 'Elegant, focused article views', 'Intelligent organisation and saved reading', 'Optional AI assistance with transparent boundaries'],
    capabilityDescriptions: [
      'Follow publisher feeds directly through RSS and Atom, keeping original sources close.',
      'Read in a calm, distraction-conscious layout designed around the article itself.',
      'Organise saved and unread stories so useful reading is easy to return to.',
      'Use optional assistance with publisher attribution and original links kept visible.',
    ],
    philosophy: 'AURA treats attention as a finite, valuable resource. Every surface is designed to help readers choose, understand and return.',
    trust: 'Publisher attribution and original links stay visible. The source remains authoritative, and optional intelligence never replaces reading.',
  },
  {
    name: 'NovaRX', slug: 'novarx', tagline: 'A clearer way to think about care.',
    description: 'A modern health and medicine-focused digital product being developed under Foresight Labs.',
    status: 'In development', accent: 'blue', logo: 'N', brandImage: 'images/novarx-app-icon.svg', deviceLabel: 'Care overview',
    playStoreUrl: null, repositoryUrl: null, privacyPolicyUrl: null,
    purpose: 'NovaRX is exploring how health and medicine information can feel more understandable, humane and actionable.',
    capabilityEyebrow: 'Health-focused capabilities',
    capabilityHeading: 'Clarity before complexity.',
    capabilitySummary: 'NovaRX explores health and medicine information through calm, practical and carefully bounded experiences.',
    capabilities: ['Health and medicine information', 'Clearer context around care', 'Designed for calm, practical interactions', 'Scope evolving through careful research'],
    capabilityDescriptions: [
      'Explore health and medicine information through a clear, carefully structured experience.',
      'Bring important context forward in language designed to be easier to understand.',
      'Keep interactions calm and practical when the subject itself may feel complicated.',
      'Develop the product through careful research without presenting unfinished ideas as certainty.',
    ],
    philosophy: 'The product is deliberately still taking shape. Its design language starts with clarity, respect and the importance of not over-claiming.',
    trust: 'NovaRX is not a substitute for professional medical advice. Final scope, features and policies will be shared as development progresses.',
  },
];

export const productBySlug = (slug: string) => products.find((product) => product.slug === slug);

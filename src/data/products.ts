export type Product = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  status: string;
  accent: string;
  logo: string;
  brandImage?: string;
  screenshots: string[];
  playStoreUrl: string | null;
  repositoryUrl: string | null;
  privacyPolicyUrl: string | null;
  purpose: string;
  capabilities: string[];
  philosophy: string;
  trust: string;
};

export const products: Product[] = [
  {
    name: 'Foresight', slug: 'foresight', tagline: 'Know Today. Prepare Tomorrow.',
    description: 'A privacy-conscious personal life intelligence application that brings tasks, memories, health, relationships, planning and proactive assistance together in one thoughtfully designed experience.',
    status: 'In development', accent: 'mint', logo: 'F', brandImage: 'images/foresight-app-icon.svg', screenshots: ['Daily rhythm', 'Life context', 'Quiet guidance'],
    playStoreUrl: null, repositoryUrl: null, privacyPolicyUrl: null,
    purpose: 'To make the shape of everyday life easier to see, without turning a person into a set of metrics.',
    capabilities: ['Tasks and personal planning', 'Memory and relationship context', 'Health information with source-aware privacy', 'Proactive assistance that respects attention'],
    philosophy: 'Foresight is being shaped as a calm layer between intention and action: useful when needed, quiet when not.',
    trust: 'Personal context deserves care. The product is being built around thoughtful controls, clear provenance and privacy-conscious defaults.',
  },
  {
    name: 'AURA News', slug: 'aura', tagline: 'News, beautifully distilled.',
    description: 'A premium RSS and Atom news reader focused on elegant reading, trusted sources, intelligent organisation, optional AI assistance and a refined frosted-glass interface.',
    status: 'In development', accent: 'violet', logo: 'A', brandImage: 'images/aura-app-icon.webp', screenshots: ['Your reading space', 'Source clarity', 'A considered queue'],
    playStoreUrl: null, repositoryUrl: null, privacyPolicyUrl: null,
    purpose: 'To bring the pleasure and context back to keeping up, with less noise between a reader and a good story.',
    capabilities: ['RSS and Atom source reading', 'Elegant, focused article views', 'Intelligent organisation and saved reading', 'Optional AI assistance with transparent boundaries'],
    philosophy: 'AURA treats attention as a finite, valuable resource. Every surface is designed to help readers choose, understand and return.',
    trust: 'Publisher attribution and original links stay visible. The source remains authoritative, and optional intelligence never replaces reading.',
  },
  {
    name: 'NovaRX', slug: 'novarx', tagline: 'A clearer way to think about care.',
    description: 'A modern health and medicine-focused digital product being developed under Foresight Labs.',
    status: 'In development', accent: 'blue', logo: 'N', brandImage: 'images/novarx-app-icon.svg', screenshots: ['Care overview', 'Medication context', 'A clearer next step'],
    playStoreUrl: null, repositoryUrl: null, privacyPolicyUrl: null,
    purpose: 'NovaRX is exploring how health and medicine information can feel more understandable, humane and actionable.',
    capabilities: ['Health and medicine information', 'Clearer context around care', 'Designed for calm, practical interactions', 'Scope evolving through careful research'],
    philosophy: 'The product is deliberately still taking shape. Its design language starts with clarity, respect and the importance of not over-claiming.',
    trust: 'NovaRX is not a substitute for professional medical advice. Final scope, features and policies will be shared as development progresses.',
  },
];

export const productBySlug = (slug: string) => products.find((product) => product.slug === slug);

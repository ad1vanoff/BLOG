export const SITE = {
  name: 'Ivanoff Workshop',
  tagline: 'Articles, experiments, and the things I build.',
  description:
    'Long-form articles on building apps, games, and data tools, plus a live catalog of everything I ship.',
  author: 'Alexander Ivanoff',
  // Social handles are optional; leave blank to hide.
  twitter: '',
  github: '',
  email: '',
  locale: 'en_US',
  /** Newsletter form endpoint (Buttondown, ConvertKit, etc.). Empty = form is hidden. */
  newsletterAction: '',
};

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

export function slugifyTag(tag: string) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

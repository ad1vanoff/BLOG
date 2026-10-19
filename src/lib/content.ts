import { getCollection, type CollectionEntry } from 'astro:content';

const live = import.meta.env.PROD;

export async function getArticles() {
  const all = await getCollection('articles', ({ data }) => !(live && data.draft));
  return all.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}
export async function getNotes() {
  const all = await getCollection('notes', ({ data }) => !(live && data.draft));
  return all.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}
export async function getBuilds() {
  const all = await getCollection('builds');
  const rank = { live: 0, beta: 1, building: 2, archived: 3 } as const;
  return all.sort((a, b) => rank[a.data.status] - rank[b.data.status] || a.data.order - b.data.order);
}
export function related(current: CollectionEntry<'articles'>, all: CollectionEntry<'articles'>[], n = 3) {
  const tags = new Set(current.data.tags);
  return all
    .filter((a) => a.id !== current.id)
    .map((a) => ({ a, score: a.data.tags.filter((t) => tags.has(t)).length }))
    .sort((x, y) => y.score - x.score || y.a.data.publishDate.valueOf() - x.a.data.publishDate.valueOf())
    .slice(0, n)
    .map((x) => x.a);
}

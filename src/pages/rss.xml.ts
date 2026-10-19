import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getArticles, getNotes } from '../lib/content';
import { SITE } from '../lib/site';

export async function GET(context: APIContext) {
  const articles = (await getArticles()).map((a) => ({
    title: a.data.title, description: a.data.description, pubDate: a.data.publishDate, link: `/articles/${a.id}/`,
    categories: a.data.tags,
  }));
  const notes = (await getNotes()).map((n) => ({
    title: n.data.title, description: (n.body ?? '').slice(0, 300), pubDate: n.data.publishDate, link: `/notes/${n.id}/`,
    categories: n.data.tags,
  }));
  const items = [...articles, ...notes].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
  return rss({ title: SITE.name, description: SITE.description, site: context.site!, items, customData: `<language>en-us</language>` });
}

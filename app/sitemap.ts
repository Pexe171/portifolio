import type { MetadataRoute } from 'next';
import { listarSlugsDeProjetos } from '@/lib/projetos';
import { siteMetadata } from '@/lib/siteMetadata';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs = await listarSlugsDeProjetos();

  return [
    {
      url: siteMetadata.url,
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${siteMetadata.url}/projetos`,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    ...projectSlugs.map((slug) => ({
      url: `${siteMetadata.url}/projetos/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8
    }))
  ];
}

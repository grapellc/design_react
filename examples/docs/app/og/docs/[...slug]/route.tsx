import { source } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  try {
    const [{ ImageResponse }, { generate: DefaultImage }] = await Promise.all([
      import('@takumi-rs/image-response'),
      import('fumadocs-ui/og/takumi'),
    ]);
    return new ImageResponse(
      <DefaultImage title={page.data.title ?? ''} description={page.data.description ?? ''} site="Grape Design" />,
      { width: 1200, height: 630, format: 'webp' },
    );
  } catch {
    return new Response('OG image unavailable', { status: 503 });
  }
}

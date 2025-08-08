import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Get all content from collections
  const [switches, tutorials, news] = await Promise.all([
    getCollection('switches'),
    getCollection('tutorials'),
    getCollection('news')
  ]);

  // Combine all entries and sort by date
  const allPosts = [
    ...switches.map(post => ({ ...post, collection: 'switches' })),
    ...tutorials.map(post => ({ ...post, collection: 'tutorials' })),
    ...news.map(post => ({ ...post, collection: 'news' }))
  ]
    .filter(post => !post.data.draft) // Filter out drafts
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .slice(0, 20); // Limit to latest 20 posts

  return rss({
    title: 'Thockverse - Mechanical Keyboard Switch Reviews',
    description: 'Your ultimate destination for mechanical keyboard switch reviews, comparisons, and guides. Exploring the universe of switches, one thock at a time.',
    site: context.site || 'https://thockverse.com',
    items: allPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.date),
      link: `/posts/${post.slug}/`,
      author: post.data.author,
      categories: [post.data.category, ...post.data.tags],
      customData: `
        <content:encoded><![CDATA[
          ${post.data.description}
          ${post.data.specs ? `
            <h3>Specifications</h3>
            <ul>
              <li>Actuation Force: ${post.data.specs.actuationforce}</li>
              <li>Bottom-out Force: ${post.data.specs.bottomoutforce}</li>
              <li>Travel Distance: ${post.data.specs.totaltravel}</li>
              <li>Sound Profile: ${post.data.specs.sound}</li>
              <li>Housing Material: ${post.data.specs.material}</li>
            </ul>
          ` : ''}
          ${post.data.rating ? `<p>Rating: ${post.data.rating}/10</p>` : ''}
          <p><a href="${context.site}posts/${post.slug}/">Read the full ${post.collection === 'switches' ? 'review' : 'article'} on Thockverse</a></p>
        ]]></content:encoded>
        ${post.data.heroImage ? `<media:content url="${context.site}${post.data.heroImage.startsWith('/') ? post.data.heroImage.slice(1) : post.data.heroImage}" type="image/jpeg" />` : ''}
      `,
    })),
    customData: `
      <language>en-us</language>
      <managingEditor>hello@thockverse.com (Thockverse Team)</managingEditor>
      <webMaster>hello@thockverse.com (Thockverse Team)</webMaster>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <category>Technology</category>
      <category>Mechanical Keyboards</category>
      <category>Product Reviews</category>
      <generator>Astro</generator>
      <docs>https://cyber.harvard.edu/rss/rss.html</docs>
      <image>
        <url>${context.site}images/thockverse-logo.png</url>
        <title>Thockverse</title>
        <link>${context.site}</link>
        <description>Thockverse Logo</description>
        <width>144</width>
        <height>144</height>
      </image>
    `,
    xmlns: {
      content: "http://purl.org/rss/1.0/modules/content/",
      media: "http://search.yahoo.com/mrss/",
    },
  });
}
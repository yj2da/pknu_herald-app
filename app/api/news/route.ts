import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const targetUrl = 'https://press.pknu.ac.kr/news/articleList.html?sc_section_code=S1N5&view_type=sm';
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const html = await response.text();
    const $ = cheerio.load(html);
    const articles: any[] = [];

    // Updated scraping logic based on HTML analysis
    $('.altlist-webzine-item, .altlist-text-item, .altlist-tile-item, [class*="altlist-"][class*="-item"]').each((i, el) => {
      const titleEl = $(el).find('.auto-titles, .titles, .altlist-subject');
      const title = titleEl.text().trim();
      
      let link = '';
      const linkEl = $(el).find('a[href*="articleView.html"]');
      link = linkEl.attr('href') || '';
      if (link && !link.startsWith('http')) {
        link = `https://press.pknu.ac.kr${link}`;
      }

      const imageEl = $(el).find('.auto-images img, .thumb img, .altlist-image img');
      let image = imageEl.attr('src') || '';
      if (image && !image.startsWith('http')) {
        image = `https://press.pknu.ac.kr${image}`;
      }

      const dateEl = $(el).find('.replace-date, .byline, .altlist-info-item');
      const date = dateEl.text().trim();
      
      if (title && link) {
        articles.push({ title, link, image, date });
      }
    });

    // Fallback if the above doesn't work (searching all article links)
    if (articles.length === 0) {
      $('a[href*="articleView.html"]').each((i, el) => {
        const titleEl = $(el).find('.auto-titles, .titles');
        if (titleEl.length > 0) {
          const title = titleEl.text().trim();
          let link = $(el).attr('href') || '';
          if (link && !link.startsWith('http')) {
            link = `https://press.pknu.ac.kr${link}`;
          }
          
          // Try to find image in a sibling or parent
          let image = '';
          const parent = $(el).closest('.altlist-webzine-item, .altlist-text-item, div, li');
          const imageEl = parent.find('.auto-images img, .thumb img, img');
          image = imageEl.attr('src') || '';
          if (image && !image.startsWith('http')) {
            image = `https://press.pknu.ac.kr${image}`;
          }

          if (title && !articles.some(a => a.link === link)) {
            articles.push({ title, link, image, date: '' });
          }
        }
      });
    }

    return NextResponse.json({ articles });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

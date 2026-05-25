import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get('img');

  // 1. Image Proxy: Source server blocks direct external requests
  if (imageUrl) {
    try {
      const imgRes = await fetch(imageUrl, {
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
          'Referer': 'https://press.pknu.ac.kr/'
        }
      });
      
      if (!imgRes.ok) throw new Error(`Fetch failed: ${imgRes.status}`);
      
      const blob = await imgRes.arrayBuffer();
      const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
      
      return new NextResponse(blob, { 
        headers: { 
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Access-Control-Allow-Origin': '*'
        } 
      });
    } catch (e) {
      console.error('Proxy error:', e);
      return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
    }
  }

  // 2. News Scraping
  try {
    const targetUrl = 'https://press.pknu.ac.kr/news/articleList.html?sc_section_code=S1N5&view_type=sm';
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        'Accept-Charset': 'utf-8'
      }
    });
    
    const buffer = await response.arrayBuffer();
    const decoder = new TextDecoder('utf-8');
    const html = decoder.decode(buffer);
    const $ = cheerio.load(html);
    const articles: any[] = [];

    // The site has multiple list patterns
    $('.altlist-webzine-item, .altlist-text-item, .altlist-tile-item, .table-row, .list-block').each((i, el) => {
      const titleEl = $(el).find('.auto-titles, .altlist-subject, .titles, a[href*="articleView.html"] div');
      let title = titleEl.text().trim();
      
      // Fallback for title if needed
      if (!title) {
        title = $(el).find('a[href*="articleView.html"]').text().trim();
      }

      // English-only filter
      if (/[가-힣]/.test(title)) return;

      let link = $(el).find('a[href*="articleView.html"]').attr('href') || '';
      if (link && !link.startsWith('http')) {
        link = `https://press.pknu.ac.kr${link}`;
      }

      // Find the image - being very aggressive with selectors
      const imageEl = $(el).find('img');
      let image = imageEl.attr('src') || imageEl.attr('data-src') || '';
      
      // If image not found in parent, check adjacent elements or the entire row
      if (!image) {
        // Some NDSoft layouts have image in a separate class but same parent container
        const sibImage = $(el).parent().find('img').first();
        image = sibImage.attr('src') || sibImage.attr('data-src') || '';
      }

      if (image && !image.startsWith('http')) {
        image = image.startsWith('//') ? `https:${image}` : `https://press.pknu.ac.kr${image}`;
      }
      
      // Filter out icons/logos and apply proxy
      let finalImage = '';
      const lowerImg = image.toLowerCase();
      if (image && !lowerImg.includes('logo') && !lowerImg.includes('ndsoft') && !lowerImg.includes('icon')) {
        finalImage = `/api/news?img=${encodeURIComponent(image)}`;
      }

      const date = $(el).find('.replace-date, .byline, .altlist-info-item, .list-dated').text().trim();
      
      if (title && link) {
        articles.push({ title, link, image: finalImage, date });
      }
    });

    return NextResponse.json({ articles });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

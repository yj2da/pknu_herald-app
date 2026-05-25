import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get('img');

  // 1. Image Proxy: Source server might be blocking direct external requests
  if (imageUrl) {
    try {
      const imgRes = await fetch(imageUrl, {
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
          'Referer': 'https://press.pknu.ac.kr/' 
        }
      });
      
      if (!imgRes.ok) throw new Error('Image fetch failed');
      
      const blob = await imgRes.arrayBuffer();
      const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
      
      return new NextResponse(blob, { 
        headers: { 
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable' 
        } 
      });
    } catch (e) {
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

    $('.altlist-webzine-item, .altlist-text-item, .altlist-tile-item').each((i, el) => {
      const titleEl = $(el).find('.auto-titles, .altlist-subject');
      const title = titleEl.text().trim();
      
      // English-only filter
      if (/[가-힣]/.test(title)) return;

      let link = $(el).find('a[href*="articleView.html"]').attr('href') || '';
      if (link && !link.startsWith('http')) link = `https://press.pknu.ac.kr${link}`;

      // Improved Image Extraction
      const imageEl = $(el).find('img');
      let image = imageEl.attr('src') || imageEl.attr('data-src') || '';
      
      if (image && !image.startsWith('http')) {
        image = image.startsWith('//') ? `https:${image}` : `https://press.pknu.ac.kr${image}`;
      }
      
      // Filter out logos/system images and apply proxy
      let finalImage = '';
      if (image && !image.toLowerCase().includes('logo') && !image.toLowerCase().includes('ndsoft')) {
        finalImage = `/api/news?img=${encodeURIComponent(image)}`;
      }

      const date = $(el).find('.replace-date, .byline, .altlist-info-item').text().trim();
      
      if (title && link) {
        articles.push({ title, link, image: finalImage, date });
      }
    });

    return NextResponse.json({ articles });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

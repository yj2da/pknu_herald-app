'use client';

import React, { useEffect, useState } from 'react';

interface Article {
  title: string;
  link: string;
  image: string;
  date: string;
}

const NewsFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const formatMetadata = (text: string) => {
    if (!text) return '';
    return text
      // 1. Separate common categories from the following text
      .replace(/^(쇼츠|오디오|기획영상|기획|취재|보도|뉴스|NewsBy)([가-힣A-Za-z])/g, '$1 $2')
      // 2. Ensure space before "기자"
      .replace(/([가-힣A-Za-z0-9])(기자)/g, '$1 $2')
      // 3. Ensure space after "기자"
      .replace(/(기자)([가-힣A-Za-z0-9])/g, '$1 $2')
      // 4. Ensure space before dates (YYYY-MM-DD or YYYY.MM.DD)
      .replace(/(\d{4}[-.]\d{2}[-.]\d{2})/g, ' $1')
      // 5. Clean up multiple spaces
      .replace(/\s+/g, ' ')
      .trim();
  };

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          setArticles(data.articles);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-white">
        <div className="w-8 h-8 border-4 border-gray-100 border-t-[#4A7DFF] rounded-full animate-spin"></div>
      </div>
    );
  }

  const hero = articles[0];
  const breaking = articles[1];
  const latest = articles.slice(2);

  return (
    <div className="bg-[#F8F9FB] min-h-full pb-12">
      {/* Header Simplified - Strictly Title Only */}
      <header className="bg-white px-5 py-5 border-b border-gray-100 flex items-center justify-center sticky top-0 z-40">
        <h1 className="text-[17px] font-black text-gray-900 tracking-tight uppercase">PKNU_HERALD</h1>
      </header>

      <div className="px-4 py-5 space-y-6">
        {/* Hero Section */}
        {hero && (
          <section>
            <div className="flex items-center space-x-1 mb-2">
              <span className="text-[11px] font-bold text-[#4A7DFF]">NEWS DESK</span>
            </div>
            <a href={hero.link} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative group active:scale-[0.98] transition-transform">
               {hero.image && (
                 <div className="aspect-video overflow-hidden">
                    <img src={hero.image} alt="main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 </div>
               )}
               <div className="p-4 pr-14 relative">
                  <h2 className="text-[17px] font-bold text-gray-900 leading-tight line-clamp-2 mb-2">
                    {hero.title}
                  </h2>
                  <p className="text-[11px] text-gray-400">{formatMetadata(hero.date)}</p>
               </div>
            </a>
          </section>
        )}

        {/* Breaking News Section */}
        {breaking && (
          <section>
            <a href={breaking.link} target="_blank" rel="noopener noreferrer" className="flex items-center bg-white rounded-2xl p-4 shadow-sm border border-gray-50 active:bg-gray-50 transition-colors">
               <div className="flex-1 pr-3">
                  <h3 className="text-[15px] font-bold text-gray-900 leading-snug line-clamp-2">
                    {breaking.title}
                  </h3>
                  <p className="mt-2 text-[10px] text-gray-400 font-medium">{formatMetadata(breaking.date)}</p>
               </div>
               {breaking.image && (
                 <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={breaking.image} alt="thumb" className="w-full h-full object-cover" />
                 </div>
               )}
            </a>
          </section>
        )}

        {/* Latest News Section */}
        <section>
          <div className="space-y-3">
            {latest.map((article, idx) => (
              <a key={idx} href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center bg-white rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-gray-50 active:bg-gray-50 transition-colors">
                 <div className="flex-1 pr-3">
                    <h3 className="text-[14px] font-bold text-gray-800 leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="mt-1 text-[10px] text-gray-400">{formatMetadata(article.date)}</p>
                 </div>
                 {article.image ? (
                   <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 shadow-inner">
                      <img src={article.image} alt="thumb" className="w-full h-full object-cover" />
                   </div>
                 ) : (
                   <div className="w-5 h-5 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
                   </div>
                 )}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewsFeed;

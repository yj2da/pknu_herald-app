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
      {/* Header */}
      <header className="bg-white px-5 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-40">
        <span className="text-[15px] font-bold text-gray-800">알림</span>
        <div className="w-10 h-10 bg-[#4A7DFF] rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
           </svg>
        </div>
      </header>

      <div className="px-4 py-5 space-y-6">
        {/* Hero Section */}
        {hero && (
          <section>
            <div className="flex items-center space-x-1 mb-2">
              <span className="text-[11px] font-bold text-[#4A7DFF]">뉴스데스크</span>
              <span className="text-[11px] text-gray-300">|</span>
              <span className="text-[11px] text-gray-400 font-medium">Herald News</span>
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
                  <p className="text-[11px] text-gray-400">{hero.date}</p>
                  
                  {/* Bookmark UI */}
                  <div className="absolute right-3 -top-6 w-10 h-14 bg-[#4A7DFF] rounded-b-md shadow-md flex flex-col items-center justify-center space-y-1">
                     <div className="w-4 h-[2px] bg-white opacity-80"></div>
                     <div className="w-4 h-[2px] bg-white opacity-80"></div>
                  </div>
               </div>
            </a>
          </section>
        )}

        {/* Breaking News Section */}
        {breaking && (
          <section>
            <div className="text-[12px] font-bold text-gray-400 mb-3 ml-1 uppercase tracking-wider">속보</div>
            <a href={breaking.link} target="_blank" rel="noopener noreferrer" className="flex items-center bg-white rounded-2xl p-4 shadow-sm border border-gray-50 active:bg-gray-50 transition-colors">
               <div className="flex-1 pr-3">
                  <h3 className="text-[15px] font-bold text-gray-800 leading-snug line-clamp-2">
                    {breaking.title}
                  </h3>
                  <p className="mt-2 text-[10px] text-gray-400 font-medium">{breaking.date}</p>
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
          <div className="text-[12px] font-bold text-gray-400 mb-3 ml-1 uppercase tracking-wider">주요뉴스</div>
          <div className="space-y-3">
            {latest.map((article, idx) => (
              <a key={idx} href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center bg-white rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-gray-50 active:bg-gray-50 transition-colors">
                 <div className="flex-1 pr-3">
                    <h3 className="text-[14px] font-bold text-gray-800 leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="mt-1 text-[10px] text-gray-400">{article.date}</p>
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

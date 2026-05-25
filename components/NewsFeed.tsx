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
      <div className="flex flex-col items-center justify-center h-full bg-white">
        <div className="w-10 h-10 border-4 border-gray-100 border-t-[#4A7DFF] rounded-full animate-spin"></div>
      </div>
    );
  }

  const heroArticle = articles[0];
  const breakArticle = articles[1];
  const listArticles = articles.slice(2);

  return (
    <div className="bg-[#F8F9FB] min-h-full font-sans">
      {/* Header mirroring the image */}
      <header className="relative bg-white pt-6 pb-4 flex flex-col items-center">
        <span className="text-[14px] font-medium text-gray-500">알림</span>
        <div className="absolute -right-4 top-2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 z-40">
          <div className="w-10 h-10 bg-[#4A7DFF] rounded-full flex items-center justify-center shadow-md">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
             </svg>
          </div>
        </div>
      </header>

      <div className="px-5 pt-4 overflow-x-hidden">
        {heroArticle && (
          <section className="mb-6 relative">
             <div className="flex items-center space-x-1 mb-2">
                <span className="text-[12px] font-bold text-[#4A7DFF]">뉴스데스크</span>
                <span className="text-[12px] text-gray-300">|</span>
                <span className="text-[12px] text-gray-400">Herald</span>
             </div>
             <a href={heroArticle.link} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl overflow-visible shadow-sm border border-gray-100 relative group">
                <h2 className="p-4 text-[18px] font-bold text-gray-900 leading-tight pr-12">
                  {heroArticle.title}
                </h2>
                <div className="px-4 pb-2 text-[10px] text-gray-400">
                  {heroArticle.date || 'PKNU Herald'}
                </div>
                
                {/* Floating Bookmark Icon from Image */}
                <div className="absolute -right-3 bottom-12 w-12 h-16 bg-[#4A7DFF] rounded-b-md shadow-lg flex items-center justify-center z-20">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="10" x2="16" y2="10"></line>
                      <line x1="8" y1="14" x2="16" y2="14"></line>
                   </svg>
                </div>

                {heroArticle.image && (
                  <div className="aspect-video overflow-hidden">
                    <img src={heroArticle.image} alt="hero" className="w-full h-full object-cover" />
                  </div>
                )}
             </a>
          </section>
        )}

        {/* Breaking News Card from Image */}
        {breakArticle && (
          <section className="mb-6">
            <div className="text-[12px] font-bold text-[#4A7DFF] mb-2 px-1">속보</div>
            <a href={breakArticle.link} target="_blank" rel="noopener noreferrer" className="flex items-center bg-white rounded-xl p-4 shadow-sm border border-gray-100 group relative">
               <div className="flex-1 pr-3">
                  <h3 className="text-[15px] font-bold text-gray-900 leading-snug line-clamp-2">
                    {breakArticle.title}
                  </h3>
                  <div className="mt-2 text-[11px] text-gray-400">{breakArticle.date}</div>
               </div>
               {breakArticle.image && (
                 <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-50 flex-shrink-0">
                    <img src={breakArticle.image} alt="thumb" className="w-full h-full object-cover" />
                 </div>
               )}
               <div className="absolute right-2 bottom-2">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
               </div>
            </a>
          </section>
        )}

        {/* List Section */}
        <div className="space-y-4">
          <div className="text-[12px] font-bold text-gray-400 mb-2 px-1">주요뉴스</div>
          {listArticles.map((article, idx) => (
            <a key={idx} href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center bg-white rounded-xl p-3 shadow-sm border border-gray-100 group relative">
               <div className="flex-1 pr-3">
                  <h3 className="text-[14px] font-bold text-gray-800 leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="mt-1 text-[10px] text-gray-400">{article.date}</div>
               </div>
               {article.image && (
                 <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={article.image} alt="thumb" className="w-full h-full object-cover" />
                 </div>
               )}
               <div className="absolute right-2 bottom-2">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F3F4F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
               </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;

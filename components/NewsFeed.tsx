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
  const [today, setToday] = useState('');

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    setToday(now.toLocaleDateString('en-US', options).toUpperCase());

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
      <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-black">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  const heroArticle = articles[0];
  const listArticles = articles.slice(1);

  return (
    <div className="bg-[#F8F9FB] min-h-full pb-10">
      <header className="px-5 pt-4 pb-4 bg-white border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-[18px] font-bold text-gray-800">Herald News</h1>
        <div className="w-8 h-8 bg-[#4B7BF5] rounded-full flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </div>
      </header>

      <div className="px-4 pt-6">
        {heroArticle && (
          <section className="mb-8">
            <div className="flex items-center space-x-2 mb-3">
              <span className="px-2 py-0.5 bg-blue-50 text-[#4B7BF5] text-[11px] font-bold rounded">TOP NEWS</span>
            </div>
            <a href={heroArticle.link} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 group">
              {heroArticle.image && (
                <div className="aspect-[16/9] overflow-hidden rounded-xl mb-4">
                  <img
                    src={heroArticle.image}
                    alt={heroArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <h2 className="text-[17px] font-bold text-gray-900 leading-snug">
                {heroArticle.title}
              </h2>
              <div className="flex items-center justify-between mt-4">
                <span className="text-[11px] text-gray-400 font-medium">{heroArticle.date}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"></path>
                </svg>
              </div>
            </a>
          </section>
        )}

        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[11px] font-bold rounded uppercase">Latest</span>
          </div>
          {listArticles.length > 0 ? (
            listArticles.map((article, idx) => (
              <a
                key={idx}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-white rounded-xl p-3 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-50 group"
              >
                <div className="flex-1 pr-3">
                  <h3 className="text-[14px] font-bold text-gray-800 leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-2">
                    {article.date || 'Herald News'}
                  </p>
                </div>
                {article.image ? (
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <path d="M9 18l6-6-6-6"></path>
                  </svg>
                )}
              </a>
            ))
          ) : !heroArticle && (
            <p className="text-center text-sm text-gray-400 py-20">No articles available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;

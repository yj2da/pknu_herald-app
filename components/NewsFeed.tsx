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
    <div className="bg-white dark:bg-black min-h-full pb-10">
      <header className="px-5 pt-8 pb-4 border-b border-gray-100 dark:border-gray-900">
        <p className="text-[10px] font-bold text-red-600 tracking-widest mb-1">{today}</p>
        <h1 className="text-4xl font-extrabold text-black dark:text-white tracking-tight">Herald</h1>
      </header>

      <div className="px-5">
        {heroArticle && (
          <article className="mt-6 mb-10">
            <a href={heroArticle.link} target="_blank" rel="noopener noreferrer" className="group">
              {heroArticle.image && (
                <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={heroArticle.image}
                    alt={heroArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <h2 className="text-2xl font-bold text-black dark:text-white leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                {heroArticle.title}
              </h2>
              <div className="flex items-center mt-3 space-x-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Top Story</span>
                <span className="text-[10px] text-gray-300">•</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-tighter">{heroArticle.date}</span>
              </div>
            </a>
          </article>
        )}

        <div className="space-y-6">
          {listArticles.length > 0 ? (
            listArticles.map((article, idx) => (
              <a
                key={idx}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-between py-4 border-b border-gray-50 dark:border-gray-900 last:border-0 group"
              >
                <div className="flex-1 pr-4">
                  <h3 className="text-[16px] font-bold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-gray-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[11px] font-medium text-gray-400 mt-2 uppercase tracking-tighter">
                    {article.date || 'Herald News'}
                  </p>
                </div>
                {article.image && (
                  <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                      }}
                    />
                  </div>
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

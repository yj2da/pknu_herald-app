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
      <div className="flex flex-col items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-sm text-gray-500">뉴스를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-full">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Herald News</h1>
        <p className="text-xs text-gray-500">부경언론사 실시간 기사</p>
      </header>
      <div className="space-y-4">
        {articles.length > 0 ? (
          articles.map((article, idx) => (
            <a
              key={idx}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {article.image && (
                <div className="h-32 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-[10px] text-gray-400 mt-2">{article.date}</p>
              </div>
            </a>
          ))
        ) : (
          <p className="text-center text-sm text-gray-500 py-10">기사가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;

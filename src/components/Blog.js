import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpen } from 'lucide-react';
import { posts } from '../posts';
import { motion } from 'framer-motion';

function Blog() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    Promise.all(posts.map(p => fetch(p.file).then(res => res.text()))).then(setContents);
  }, []);

  return (
    <section id="blog" className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold flex items-center gap-2 text-red-500">
        <BookOpen /> Artigos
      </h1>
      <div className="space-y-10 w-full max-w-3xl">
        {contents.map((content, idx) => (
          <motion.article
            key={posts[idx].slug}
            className="p-4 rounded bg-gray-100 dark:bg-gray-800"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-semibold mb-2">{posts[idx].title}</h2>
            <ReactMarkdown>{content}</ReactMarkdown>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Blog;

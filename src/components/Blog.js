import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpen } from 'lucide-react';
import posts from '../data/posts.json';
import { motion } from 'framer-motion';
import anime from 'animejs';

function Blog() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      anime({
        targets: '#loading-posts',
        opacity: [0, 1],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        duration: 1000,
      });
    }
    Promise.all(posts.map((p) => fetch(p.file).then((res) => res.text()))).then((data) => {
      setContents(data);
      setLoading(false);
    });
  }, [loading]);

  return (
    <section id="blog" className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold flex items-center gap-2 text-red-500">
        <BookOpen /> Artigos
      </h1>
      {loading ? (
        <p id="loading-posts" className="text-gray-400">
          Carregando em breve...
        </p>
      ) : (
        <div className="space-y-10 w-full max-w-3xl">
          {contents.map((content, idx) => (
            <motion.article
              key={posts[idx].slug}
              className="p-4 rounded bg-gray-800"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-2xl font-semibold mb-2">{posts[idx].title}</h2>
              <ReactMarkdown>{content}</ReactMarkdown>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Blog;

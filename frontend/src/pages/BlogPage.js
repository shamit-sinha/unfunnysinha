import { useState, useEffect } from 'react';
import { useScrollAnimation, useScrollAnimationMultiple } from '@/hooks/useScrollAnimation';
import { Clock, ArrowRight } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function AnimatedSection({ className = '', children }) {
  const ref = useScrollAnimation();
  return <div ref={ref} className={`animate-on-scroll ${className}`}>{children}</div>;
}

function StaggerSection({ className = '', children }) {
  const ref = useScrollAnimationMultiple();
  return <div ref={ref} className={`stagger-children ${className}`}>{children}</div>;
}

export default function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API}/blog`);
        setArticles(res.data);
      } catch (err) {
        console.error('Failed to fetch blog articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div data-testid="blog-page">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <span className="font-body text-xs uppercase tracking-[0.25em] text-brand-primary mb-4 block animate-fade-in-up" style={{ animationDelay: '0ms', animationFillMode: 'both' }}>
              Journal & Insights
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-brand-text leading-[1.1] tracking-tight animate-fade-in-up" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
              Thoughts on<br /><span className="italic text-brand-primary">filmmaking</span>
            </h1>
            <p className="font-body text-base md:text-lg text-brand-muted mt-6 max-w-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
              Articles, insights, and behind-the-scenes perspectives on the art and 
              craft of filmmaking. Free knowledge to help you grow as a creator.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {loading ? (
            <div data-testid="blog-loading" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/2] rounded-2xl bg-brand-surface mb-5" />
                  <div className="h-3 bg-brand-surface rounded w-1/4 mb-3" />
                  <div className="h-5 bg-brand-surface rounded w-3/4 mb-3" />
                  <div className="h-3 bg-brand-surface rounded w-full" />
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div data-testid="blog-empty" className="text-center py-20">
              <p className="font-body text-brand-muted">No articles yet. Check back soon!</p>
            </div>
          ) : (
            <StaggerSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <div
                  key={article.id}
                  data-testid={`blog-article-card-${i}`}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[3/2] rounded-2xl overflow-hidden mb-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-body text-xs uppercase tracking-[0.15em] text-brand-primary">{article.category}</span>
                      <span className="w-1 h-1 rounded-full bg-brand-border" />
                      <span className="font-body text-xs text-brand-muted flex items-center gap-1">
                        <Clock size={12} /> {article.read_time}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-medium text-brand-text group-hover:text-brand-primary transition-colors duration-200">
                      {article.title}
                    </h3>
                    <p className="font-body text-sm text-brand-muted leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 font-body text-sm text-brand-primary font-medium">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </StaggerSection>
          )}
        </div>
      </section>
    </div>
  );
}

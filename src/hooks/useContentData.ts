
import { useState, useEffect } from 'react';

interface ContentPoint {
  title: string;
  description: string;
}

interface ContentData {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    title: string;
    subtitle: string;
    icon: string;
    color: string;
  };
  features: string[];
  content: {
    title: string;
    description: string;
    image: string;
    points: ContentPoint[];
  };
  usage: {
    title: string;
    steps: string[];
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

export const useContentData = (platform: string) => {
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await import(`../data/${platform}-content.json`);
        setData(response.default);
      } catch (error) {
        console.error(`Failed to load content for ${platform}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [platform]);

  return { data, loading };
};

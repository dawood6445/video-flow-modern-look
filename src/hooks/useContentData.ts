
import { useState, useEffect } from 'react';

interface ContentPoint {
  title: string;
  description: string;
}

interface DemoFeature {
  title: string;
  description: string;
  image: string;
}

interface Demo {
  title: string;
  description: string;
  image: string;
  features_demo: DemoFeature[];
}

interface DetailedContentSection {
  title: string;
  content: string;
}

interface DetailedContent {
  sections: DetailedContentSection[];
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
    intro?: string;
    steps: string[];
    tips?: string[];
  };
  demo?: Demo;
  detailed_content?: DetailedContent;
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

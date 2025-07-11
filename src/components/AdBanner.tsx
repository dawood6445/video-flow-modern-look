
import { X } from 'lucide-react';
import { useState } from 'react';

interface AdBannerProps {
  position: 'top' | 'bottom' | 'left' | 'right';
  children?: React.ReactNode;
}

const AdBanner = ({ position, children }: AdBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-r from-orange-400 to-pink-400 text-white flex items-center justify-center';
      case 'bottom':
        return 'fixed bottom-0 left-0 right-0 z-50 h-16 bg-gradient-to-r from-pink-400 to-purple-400 text-white flex items-center justify-center';
      case 'left':
        return 'fixed left-0 top-1/2 transform -translate-y-1/2 z-40 w-32 h-80 bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-r-lg shadow-lg flex items-center justify-center';
      case 'right':
        return 'fixed right-0 top-1/2 transform -translate-y-1/2 z-40 w-32 h-80 bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-l-lg shadow-lg flex items-center justify-center';
      default:
        return '';
    }
  };

  return (
    <div className={getPositionClasses()}>
      <div className="relative w-full h-full flex items-center justify-center">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-current hover:text-white/80 transition-colors z-10"
        >
          <X className="h-4 w-4" />
        </button>
        {children || (
          <div className="text-center px-4">
            <p className="text-sm font-medium">Advertisement</p>
            <p className="text-xs opacity-80">Google Ads Space</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdBanner;

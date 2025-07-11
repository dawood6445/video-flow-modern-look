
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
        return 'fixed top-0 left-0 right-0 z-50 ad-banner';
      case 'bottom':
        return 'fixed bottom-0 left-0 right-0 z-50 ad-banner';
      case 'left':
        return 'fixed left-0 top-1/2 transform -translate-y-1/2 z-40 ad-sidebar w-32 h-80';
      case 'right':
        return 'fixed right-0 top-1/2 transform -translate-y-1/2 z-40 ad-sidebar w-32 h-80';
      default:
        return 'ad-banner';
    }
  };

  return (
    <div className={getPositionClasses()}>
      <div className="relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-white hover:text-gray-200 z-10"
        >
          <X className="h-4 w-4" />
        </button>
        {children || (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-sm font-medium">Advertisement</p>
              <p className="text-xs opacity-80">Google Ads Space</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdBanner;

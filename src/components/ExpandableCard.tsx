import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useRouter } from 'next/navigation';
import LocalShipping from '@mui/icons-material/LocalShipping';
import WbSunny from '@mui/icons-material/WbSunny';
import NightlightRound from '@mui/icons-material/NightlightRound';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Score from './Score';

// Define the Item interface
export interface GPS {
  lat: number;
  lng: number;
}

export interface Item {
  id: string | number;
  name: string;
  location: string;
  image: string;
  description: string;
  type: string;
  rating: string | number | number[];
  gps: GPS;
  cuisine?: string;
  priceRange?: string;
  hours: string;
  specialties?: string[];
  schedule?: string;
  highlights?: string[];
}

// Define props interface
interface ExpandableCardProps {
  item: Item;
}

// Placeholder function for authentication check
const isAuthenticated = () => {
  // Replace with your actual authentication logic
  return true;
};

export default function ExpandableCard({ item }: ExpandableCardProps): React.ReactElement {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const router = useRouter();

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  const handleDirectoryClick = () => {
    router.push(`/directory/${item.id}`);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Food Truck':
        return <LocalShipping className="h-5 w-5" />;
      case 'Day Market':
        return <WbSunny className="h-5 w-5" />;
      default:
        return <NightlightRound className="h-5 w-5" />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'Food Truck':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Day Market':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  return (
    <div 
      className={`
        max-w-sm bg-white dark:bg-gray-800 rounded-2xl overflow-hidden 
        shadow-md hover:shadow-xl transition-all duration-300 
        ${expanded ? 'z-10 scale-105' : ''} transform
      `}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image 
          src={item.image} 
          alt={item.name} 
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeStyles(item.type)}`}>
            {getTypeIcon(item.type)}
            <span className="ml-1">{item.type}</span>
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Score rating={Array.isArray(item.rating) ? item.rating : [Number(item.rating)]} />
          </div>
          <button 
            onClick={handleExpandClick}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <span className="mr-1">Details</span>
            <ExpandMoreIcon className={`h-4 w-4 transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-3 text-sm">
              <p className="flex items-center text-gray-600 dark:text-gray-300">
                <LocationOnIcon className="w-5 h-5 mr-2 text-red-500" />
                <span>{item.location}</span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  ({item.gps.lat.toFixed(4)}, {item.gps.lng.toFixed(4)})
                </span>
              </p>
              <div className="flex justify-end mt-4">
                {isAuthenticated() ? (
                  <button
                    onClick={handleDirectoryClick}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    <LockOpenIcon className="h-4 w-4 mr-1" />
                    View Full Details
                  </button>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg cursor-not-allowed"
                  >
                    <LockIcon className="h-4 w-4 mr-1" />
                    Sign in to View
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

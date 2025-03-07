import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';

// Define the Item interface
interface Item {
  name: string;
  location: string;
  image: string;
  description: string;
  type: string;
  rating: string | number;
  gps: string;
}

// Define props interface
interface ExpandableCardProps {
  item: Item;
}

export default function ExpandableCard({ item }: ExpandableCardProps): React.ReactElement {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{item.name}</div>
        <p className="text-gray-700 text-base">{item.location}</p>
      </div>
      <Image className="w-full" src={item.image} alt={item.name} width={150} height={150} />
      <div className="px-6 pt-4 pb-2">
        <p className="text-gray-700 text-base">{item.description}</p>
        <button onClick={handleExpandClick} className="inline-flex items-center mt-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-full">
          <span className="mr-2">More Info</span>
          <ExpandMoreIcon />
        </button>
      </div>
      {expanded && (
        <div className="px-6 pt-4 pb-2">
          <p className="text-gray-700 text-base">
            <strong>Type:</strong> {String(item.type)}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Rating:</strong> {String(item.rating)}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Location:</strong> {String(item.location)}
          </p>
          <p className="text-gray-700 text-base">
            <strong>GPS:</strong> {String(item.gps)}
          </p>
        </div>
      )}
    </div>
  );
}

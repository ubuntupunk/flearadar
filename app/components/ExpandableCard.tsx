import React from 'react';
import { styled } from '@mui/material/';
import Card from '@mui/material/';
import CardHeader from '@mui/material/';
import CardMedia from '@mui/material/';
import CardContent from '@mui/material/';
import CardActions from '@mui/material/';
import Collapse from '@mui/material/';
import Avatar from '@mui/material/';
import IconButton, { IconButtonProps } from '@mui/material/';
import Typography from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/';
import { red } from '@mui/material/colors';

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

// Extend IconButtonProps with custom expand property
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled(({ expand, ...props }: ExpandMoreProps) => (
  <IconButton {...props} />
))(({ theme, expand }) => ({
  marginLeft: '10px',
  transition: 'transform 0.2s',
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
}));

export default function ExpandableCard({ item }: ExpandableCardProps): JSX.Element {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {item.name.charAt(0)}
          </Avatar>
        }
        title={item.name}
        subheader={item.location}
      />
      <CardMedia
        component="img"
        height="194"
        image={item.image}
        alt={item.name}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">
            <strong>Type:</strong> {String(item.type)}
          </Typography>
          <Typography variant="body2">
            <strong>Rating:</strong> {String(item.rating)}
          </Typography>
          <Typography variant="body2">
            <strong>Location:</strong> {String(item.location)}
          </Typography>
          <Typography variant="body2">
            <strong>GPS:</strong> {String(item.gps)}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
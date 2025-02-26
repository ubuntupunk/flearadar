import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { red } from '@mui/material/colors';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    ...(props => ({
        transform: props.expand ? 'rotate(180deg)' : 'rotate(0deg)',
    })),
}));

export default function ExpandableCard({ item }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {item.name.charAt(0)} {/* Display first letter of the name */}
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
                    <Typography >
                        <strong>Type:</strong> {item.type}
                    </Typography>
                     <Typography >
                        <strong>Rating:</strong> {item.rating}
                    </Typography>
                    <Typography >
                        <strong>Location:</strong> {item.location}
                    </Typography>
                    <Typography >
                        <strong>GPS:</strong> {item.gps}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
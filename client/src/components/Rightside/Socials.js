import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PinterestIcon from '@material-ui/icons/Pinterest';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

const Socials = [
    {
        "id": 1,
        "name": "Facebook",
        "label": "Facebook",
        "value": "Facebook",
        "link": "https://www.facebook.com/",
        "icon": <FacebookIcon style={{height:"100%",width:"100%"}}/>
    },
    {
        "id": 2,
        "name": "Instagram",
        "label": "Instagram",
        "value": "Instagram",
        "link": "https://www.instagram.com/",
        "icon": <InstagramIcon style={{height:"100%",width:"100%"}}/>
    },
    {
        "id": 3,
        "name": "LinkedIn",
        "label": "LinkedIn",
        "value": "LinkedIn",
        "link": "https://www.linkedin.com/",
        "icon": <LinkedInIcon style={{height:"100%",width:"100%"}}/>
    },
    {
        "id": 4,
        "name": "Pinterest",
        "label": "Pinterest",
        "value": "Pinterest",
        "link": "https://www.pinterest.de/",
        "icon": <PinterestIcon style={{height:"100%",width:"100%"}}/>
    },
    {
        "id": 5,
        "name": "Twitter",
        "label": "Twitter",
        "value": "Twitter",
        "link": "https://twitter.com/",
        "icon": <TwitterIcon style={{height:"100%",width:"100%"}}/>
    },
    {
        "id": 6,
        "name": "YouTube",
        "label": "YouTube",
        "value": "YouTube",
        "link": "https://www.youtube.com/",
        "icon": <YouTubeIcon style={{height:"100%",width:"100%"}}/>
    }

];

export default Socials;
import React from 'react';

const TikTokLogo = () => (
  <svg width="118" height="42" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#25F4EE"}}/>
        <stop offset="100%" style={{stopColor:"#FE2C55"}}/>
      </linearGradient>
      
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#FF0050"}}/>
        <stop offset="100%" style={{stopColor:"#25F4EE"}}/>
      </linearGradient>
    </defs>
    
    <rect width="300" height="80" fill="#000000"/>
    
    <g transform="translate(20, 15)">
      <path d="M56.17 13.47c-2.73-2.66-4.55-6.22-5.23-10.13-.09-.52-.16-1.05-.21-1.57V0h-13.8v54.77c-.02 6.38-5.21 11.55-11.6 11.55-1.88 0-3.65-.45-5.22-1.24a11.585 11.585 0 0 1-6.38-10.36c0-6.4 5.19-11.6 11.6-11.6 1.23 0 2.41.19 3.52.54V29.64c-1.15-.16-2.32-.24-3.48-.24C11.35 29.43 0 40.78 0 54.77c0 8.78 4.46 16.51 11.24 21.06a25.22 25.22 0 0 0 14.12 4.29c14.01 0 25.36-11.35 25.36-25.35V26.78a32.785 32.785 0 0 0 19.12 6.12V19.19c-2.11 0-4.2-.34-6.18-1.01-1.39-.47-4.02-1.31-7.5-4.71z"
            fill="url(#gradient1)"
            transform="scale(0.4)"/>
      
      <path d="M56.17 13.47c-2.73-2.66-4.55-6.22-5.23-10.13-.09-.52-.16-1.05-.21-1.57V0h-13.8v54.77c-.02 6.38-5.21 11.55-11.6 11.55-1.88 0-3.65-.45-5.22-1.24a11.585 11.585 0 0 1-6.38-10.36c0-6.4 5.19-11.6 11.6-11.6 1.23 0 2.41.19 3.52.54V29.64c-1.15-.16-2.32-.24-3.48-.24C11.35 29.43 0 40.78 0 54.77c0 8.78 4.46 16.51 11.24 21.06a25.22 25.22 0 0 0 14.12 4.29c14.01 0 25.36-11.35 25.36-25.35V26.78a32.785 32.785 0 0 0 19.12 6.12V19.19c-2.11 0-4.2-.34-6.18-1.01-1.39-.47-4.02-1.31-7.5-4.71z"
            fill="url(#gradient2)"
            opacity="0.7"
            transform="scale(0.4) translate(2, 2)"/>
    </g>
    
    <g transform="translate(70, 25)">
      <text fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="white">
        TikTok
      </text>
    </g>
  </svg>
);

export default TikTokLogo;

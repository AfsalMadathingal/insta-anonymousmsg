// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 text-white text-center py-2">
      <p className='text-sm '>
        Made with <i className="fa fa-heart text-red-500"></i> by Afsal 
        <i
        onClick={() => window.open('https://afsalmadathingal.online')} 
        className='cursor-pointer fa fa-link text-white ml-2'></i>
        <i
        onClick={() => window.open('https://github.com/afsalmadathingal')} 
        className="cursor-pointer fa fa-github text-white ml-2"></i>
        <i
        onClick={() => window.open('https://www.linkedin.com/in/afsalmadathingal/')} 
        className=" cursor-pointer fa fa-linkedin text-white ml-2"></i>
      </p>
    </footer>
  );
};

export default Footer;

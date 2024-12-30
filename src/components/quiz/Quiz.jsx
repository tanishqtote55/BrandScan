import React from 'react';
import html2canvas from 'html2canvas';
import { FaShareAlt } from 'react-icons/fa';
import { MdDownload } from 'react-icons/md';
import logo from '../../assets/PSF25.png';

const BrandScan = ({ username, mode, correctAns, attemptedQs, accuracy }) => {

  const handleShare = async () => {
  const element = document.getElementById('brandscan-container');
  try {
    const canvas = await html2canvas(element);
    canvas.toBlob(async (blob) => {
      if (navigator.share) {
        const file = new File([blob], 'BrandScan.png', { type: 'image/png' });
        await navigator.share({
          title: 'BrandScan Stats',
          text: `Check out my BrandScan stats! Play your game now: ${window.location.href}`,
          files: [file],
        });
      } else {
        alert('Share functionality is not supported in this browser.');
      }
    });
  } catch (err) {
    console.error('Error sharing:', err);
  }
};


  const handleDownload = () => {
    const element = document.getElementById('brandscan-container');
    html2canvas(element).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'BrandScan.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <div
      id="brandscan-container"
      className="bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white p-6 shadow-2xl max-w-md mx-auto font-sans transform transition-all duration-500"
      style={{ maxWidth: '100%', margin: '0 auto' }}
    >
      <img
        src={logo}
        alt="Pune Startup Fest"
        className="mx-auto w-28 mb-6 animate-pulse"
      />

      <h2 className="text-2xl font-extrabold text-center mb-3 font-serif tracking-wider">
        {username}
      </h2>

      <p className="text-center text-purple-400 text-3xl mb-8 font-bold tracking-wide uppercase">
        BrandScan
      </p>

      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-xl text-center shadow-lg">
          <p className="font-bold text-lg text-purple-400">Mode Played</p>
          <p className="text-gray-300 text-xl">{mode}</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-xl text-center shadow-lg">
            <p className="font-bold text-lg text-purple-400">Attempted Qs</p>
            <p className="text-gray-300 text-xl">{attemptedQs}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl text-center shadow-lg">
            <p className="font-bold text-lg text-purple-400">Correct Answers</p>
            <p className="text-gray-300 text-xl">{correctAns}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl text-center shadow-lg">
          <p className="font-bold text-lg text-purple-400">Accuracy</p>
          <p className="text-gray-300 text-2xl">{accuracy}%</p>
        </div>
      </div>

      <h3 className="text-center text-blue-400 font-semibold mt-10 mb-4 text-xl tracking-wider animate-none">
        VOYAGE OF VISIONARIES
      </h3>

      <div className="flex justify-between items-center mt-8">
        <FaShareAlt
          className="text-purple-500 cursor-pointer text-3xl transform hover:scale-110 transition duration-300"
          onClick={handleShare}
        />
        <button
          className="bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-md transform hover:bg-purple-700 hover:scale-105 transition duration-300"
          onClick={handleDownload}
        >
          <MdDownload className="inline-block mr-2 text-2xl" />
          Download
        </button>
      </div>
    </div>
  );
};

export default BrandScan;

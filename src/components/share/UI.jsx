import React from 'react';
import html2canvas from 'html2canvas';
import { FaShareAlt } from 'react-icons/fa';
import { MdDownload } from 'react-icons/md';
import logo from '../../assets/PSF25.png';

const BrandScan = ({ username, mode, correctAns, attemptedQs, accuracy }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out my BrandScan stats!',
        text: `Username: ${username}\nMode Played: ${mode}\nCorrect Answers: ${correctAns}\nAccuracy: ${accuracy}%`,
        url: window.location.href,
      }).catch((err) => console.error('Error sharing:', err));
    } else {
      alert('Share functionality is not supported in this browser.');
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
      className="scale-75 bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white p-8 shadow-2xl max-w-lg mx-auto font-sans transform transition-all duration-500 hover:shadow-purple-600"
      style={{ maxWidth: '100%', margin: '0 auto' }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="Pune Startup Fest"
        className="mx-auto w-32 mb-8 animate-pulse"
      />

      {/* Username */}
      <h2 className="text-3xl font-extrabold text-center mb-4 font-serif tracking-wider text-gradient">
        {username}
      </h2>

      {/* Title */}
      <p className="text-center text-purple-300 text-4xl mb-8 font-extrabold uppercase tracking-wide animate-fade-in">
        BrandScan
      </p>

      {/* Stats Section */}
      <div className="space-y-8">
        {/* Mode Played */}
        <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-6 rounded-xl text-center shadow-lg">
          <p className="font-bold text-xl text-purple-200 uppercase">Mode Played</p>
          <p className="text-white text-2xl mt-2">{mode}</p>
        </div>

        {/* Attempted Questions and Correct Answers */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-6 rounded-xl text-center shadow-lg">
            <p className="font-bold text-xl text-purple-200 uppercase">Attempted Qs</p>
            <p className="text-white text-2xl mt-2">{attemptedQs}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-6 rounded-xl text-center shadow-lg">
            <p className="font-bold text-xl text-purple-200 uppercase">Correct Answers</p>
            <p className="text-white text-2xl mt-2">{correctAns}</p>
          </div>
        </div>

        {/* Accuracy */}
        <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-6 rounded-xl text-center shadow-lg">
          <p className="font-bold text-xl text-purple-200 uppercase">Accuracy</p>
          <p className="text-white text-3xl mt-2">{Math.round(accuracy)}%</p>
        </div>
      </div>

      {/* Vision Statement */}
      <h3 className="text-center text-purple-400 font-semibold mt-10 mb-6 text-2xl tracking-wide">
        Voyage of Visionaries
      </h3>

      {/* Buttons */}
      <div className="flex justify-around items-center mt-8 space-x-4">
        <FaShareAlt
          className="text-purple-400 cursor-pointer text-4xl transform hover:scale-125 transition duration-300 animate-spin-slow"
          onClick={handleShare}
        />
        <button
          className="bg-purple-600 text-white py-3 px-8 rounded-full font-semibold text-lg shadow-md transform hover:bg-purple-700 hover:scale-110 transition duration-300"
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

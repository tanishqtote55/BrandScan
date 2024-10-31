import React, { useState } from 'react';
import './Scoreboard.css'; // Import specific CSS for Scoreboard
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Scoreboard = ({ score, totalQuestions, dummyScores }) => {
    const [showModal, setShowModal] = useState(false);

    const shareMessage = encodeURIComponent(
        `I just completed the BrandScan practice game for the Pune Startup Fest and scored ${score}/${totalQuestions}! Think you can beat my score? 💯 Test your brand knowledge and take on the challenge! Play now and share your results! [Link to game] #BrandScanChallenge #PuneStartupFest #ThinkYouKnowBrands.`
    );

    const copyMessage = () => {
        const messageToCopy = `I just completed the BrandScan practice game for the Pune Startup Fest and scored ${score}/${totalQuestions}! Think you can beat my score? 💯 Test your brand knowledge and take on the challenge! Play now and share your results! [Link to game] #BrandScanChallenge #PuneStartupFest #ThinkYouKnowBrands.`;
        navigator.clipboard.writeText(messageToCopy);
        alert("Message copied! You can now share it.");
    };

    const shareOnLinkedIn = () => {
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}&text=${shareMessage}`;
        window.open(linkedInUrl, "_blank");
    };

    const shareOnWhatsAppHybrid = () => {
        const whatsappAppUrl = `whatsapp://send?text=${shareMessage}`;
        const whatsappWebUrl = `https://wa.me/?text=${shareMessage}`;

        const link = document.createElement('a');
        link.href = whatsappAppUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
            if (!document.hasFocus()) {
                return; // WhatsApp app opened successfully
            }
            window.open(whatsappWebUrl, "_blank");
        }, 500);
    };

    const openInstagram = () => {
        const instagramUrl = "https://www.instagram.com"; // Replace with your specific profile link if desired
        window.open(instagramUrl, "_blank");
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="scoreboard">
            <h2>Congratulations!</h2>
            <p>Your Score: {score} / {totalQuestions}</p>
            <p>Accuracy: {(score / totalQuestions * 100).toFixed(2)}%</p>

            <div className="share-buttons">
                <button className="share-button" onClick={toggleModal}>Share</button>
                <button className="share-button" onClick={() => window.location.reload()}>Re-attempt</button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleModal}>&times;</span>
                        <h3>Share:</h3>
                        <textarea
                            readOnly
                            value={`I just completed the BrandScan practice game for the Pune Startup Fest and scored ${score}/${totalQuestions}! Think you can beat my score? 💯 Test your brand knowledge and take on the challenge! Play now and share your results! [Link to game] #BrandScanChallenge #PuneStartupFest #ThinkYouKnowBrands.`}
                        />
                        <button className="copy-button" onClick={copyMessage}>Copy Message</button>

                        <div className="social-icons">
                            <span onClick={shareOnLinkedIn} style={{ cursor: 'pointer', color: '#0077B5' }}>
                                <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '24px', margin: '0 10px' }} />
                            </span>
                            <span onClick={shareOnWhatsAppHybrid} style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '24px', color: '#25D366', margin: '0 10px' }} />
                            </span>
                            <span onClick={openInstagram} style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '24px', color: '#E1306C', margin: '0 10px' }} />
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Scoreboard;

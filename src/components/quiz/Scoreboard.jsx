import React, { useState } from 'react';
import './Scoreboard.css'; // Import specific CSS for Scoreboard
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const Scoreboard = ({ score, totalQuestions, dummyScores }) => {
    const [showModal, setShowModal] = useState(false);
    
    const finalScores = [...dummyScores, { username: "You", score }];
    const sortedScores = finalScores.sort((a, b) => b.score - a.score);
    const userRank = sortedScores.findIndex(user => user.username === "You") + 1;

    const shareMessage = encodeURIComponent(
        `I just completed the BrandScan practice game for the Pune Startup Fest and scored ${score}/${totalQuestions} ! Think you can beat my score? 💯 Test your brand knowledge and take on the challenge! Play now and share your results! [Link to game] #BrandScanChallenge #PuneStartupFest #ThinkYouKnowBrands.`
    );

    const copyMessage = () => {
        const messageToCopy = `I just completed the BrandScan practice game for the Pune Startup Fest and scored ${score}/${totalQuestions} ! Think you can beat my score? 💯 Test your brand knowledge and take on the challenge! Play now and share your results! [Link to game] #BrandScanChallenge #PuneStartupFest #ThinkYouKnowBrands.`;
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

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="scoreboard">
            <h2>Quiz Over!</h2>
            <p>Your Score: {score} / {totalQuestions}</p>
            <p>Your Rank: {userRank}</p>

            <h3>Scoreboard:</h3>
            <ul>
                {sortedScores.map((user, i) => (
                    <li key={i} className={user.username === "You" ? "highlight" : ""}>
                        {i + 1}. {user.username}: {user.score} {user.username === "You" ? "(You)" : ""}
                    </li>
                ))}
            </ul>

            <button onClick={toggleModal}>Share</button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleModal}>&times;</span>
                        <h3>Share:</h3>
                        <textarea
                            readOnly 
                            value={`I just completed the BrandScan practice game for the Pune Startup Fest and scored ${score}/${totalQuestions} ! Think you can beat my score? 💯 Test your brand knowledge and take on the challenge! Play now and share your results! [Link to game] #BrandScanChallenge #PuneStartupFest #ThinkYouKnowBrands.`}
                        />
                        <button class="copy-button" onClick={copyMessage}>Copy Message</button>

                        <div className="social-icons">
                            <span onClick={shareOnLinkedIn} style={{ cursor: 'pointer', color: '#0077B5' }}> 
                                <i className="fab fa-linkedin" style={{ fontSize: '24px', margin: '0 10px' }}></i>
                            </span>
                            <span onClick={shareOnWhatsAppHybrid} style={{ cursor: 'pointer' }}>
                                <i className="fab fa-whatsapp" style={{ fontSize: '24px', margin: '0 10px', color: 'green' }}></i>
                            </span>
                            <span style={{ cursor: 'pointer' }}>
                                <i className="fab fa-instagram" style={{ fontSize: '24px', margin: '0 10px', color: '#E1306C' }}></i>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Scoreboard;




// import React, { useState } from 'react';
// import './Scoreboard.css'; // Import specific CSS for Scoreboard

// const Scoreboard = ({ score, totalQuestions, dummyScores }) => {
//     const [showShareOptions, setShowShareOptions] = useState(false);

//     const finalScores = [...dummyScores, { username: "You", score }];
//     const sortedScores = finalScores.sort((a, b) => b.score - a.score);
//     const userRank = sortedScores.findIndex(user => user.username === "You") + 1;
//     const shareMessage = encodeURIComponent(
//         `I just scored ${score}/${totalQuestions} in the BrandScan practice game for Pune Startup Fest! Think you can beat my score? 💯 Play now and share your results! #BrandScanChallenge #PuneStartupFest #ThinkYouKnowBrands`
//     );

//     const toggleShareOptions = () => {
//         setShowShareOptions(!showShareOptions);
//     };

//     const shareOnLinkedIn = () => {
//         const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}&text=${shareMessage}`;
//         window.open(linkedInUrl, "_blank");
//     };

//     const shareOnWhatsAppHybrid = () => {
//         const whatsappAppUrl = `whatsapp://send?text=${shareMessage}`;
//         const whatsappWebUrl = `https://wa.me/?text=${shareMessage}`;

//         const link = document.createElement('a');
//         link.href = whatsappAppUrl;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);

//         setTimeout(() => {
//             if (!document.hasFocus()) {
//                 return;
//             }
//             window.open(whatsappWebUrl, "_blank");
//         }, 500);
//     };

//     const copyMessage = () => {
//         navigator.clipboard.writeText(`Check out this awesome game: ${window.location.href}`);
//         alert("Message copied! You can now paste it into Instagram.");
//     };

//     return (
//         <div className="scoreboard">
//             <h2>Quiz Over!</h2>
//             <p>Your Score: {score} / {totalQuestions}</p>
//             <p>Your Rank: {userRank}</p>

//             <h3>Scoreboard:</h3>
//             <ul>
//                 {sortedScores.map((user, i) => (
//                     <li key={i} className={user.username === "You" ? "highlight" : ""}>
//                         {i + 1}. {user.username}: {user.score} {user.username === "You" ? "(You)" : ""}
//                     </li>
//                 ))}
//             </ul>

//             <div className="share-buttons">
//                 <button onClick={toggleShareOptions}>Share</button>

//                 {showShareOptions && (
//                     <div className="social-icons">
//                         <span onClick={shareOnLinkedIn} style={{ cursor: 'pointer' }}>
//                             <i className="fab fa-linkedin" style={{ fontSize: '24px', margin: '0 10px' }}></i>
//                         </span>
//                         <span onClick={shareOnWhatsAppHybrid} style={{ cursor: 'pointer' }}>
//                             <i className="fab fa-whatsapp" style={{ fontSize: '24px', margin: '0 10px', color: 'green' }}></i>
//                         </span>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Scoreboard;


// import React from 'react';
// import './Scoreboard.css'; // Import specific CSS for Scoreboard

// const Scoreboard = ({ score, totalQuestions, dummyScores }) => {
//     const finalScores = [...dummyScores, { username: "You", score }];
//     const sortedScores = finalScores.sort((a, b) => b.score - a.score);
//     const userRank = sortedScores.findIndex(user => user.username === "You") + 1;

//     return (
//         <div className="scoreboard">
//             <h2>Quiz Over!</h2>
//             <p>Your Score: {score} / {totalQuestions}</p>
//             <p>Your Rank: {userRank}</p>

//             <h3>Scoreboard:</h3>
//             <ul>
//                 {sortedScores.map((user, i) => (
//                     <li key={i} className={user.username === "You" ? "highlight" : ""}>
//                         {i + 1}. {user.username}: {user.score} {user.username === "You" ? "(You)" : ""}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Scoreboard;
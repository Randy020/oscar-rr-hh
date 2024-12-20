"use client"; 
import { useState } from "react";

const VideoWithMuteButton = () => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="video-container">
      <style jsx>{`
  .custom-video {
    height: 220px; /* Ajusta la altura aquí */
  }
`}</style>
      
      <video
        autoPlay
        loop
        muted={isMuted}
        width="150%"
        height="auto"
        className="custom-video rounded-[10px] shadow-1"
      >
        <source
          src="Videomarketing.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <button
        onClick={toggleMute}
        className="mute-button"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        <i className={`fas ${isMuted ? "fa-volume-mute" : "fa-volume-up"}`}></i>
      </button>

      <style jsx>{`
        .video-container {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }

        .mute-button {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          border-radius: 30%;
          padding: 10px;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.3s;
        }

        .mute-button:hover {
          background: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  );
};

export default VideoWithMuteButton;

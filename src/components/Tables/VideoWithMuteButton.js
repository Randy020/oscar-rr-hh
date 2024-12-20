"use client";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/lib/firebaseConfig"; // Asegúrate de que tienes la configuración de Firebase en este archivo

const VideoWithMuteButton = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);

  // Instancia de Firestore
  const db = getFirestore(app);

  // Obtiene la URL del video de Firestore
  useEffect(() => {
    const fetchVideoUrl = async () => {
      const docRef = doc(db, "videos", "videoDocumentId"); // Usar el ID real del documento
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const url = docSnap.data().url;
        setVideoUrl(url); // Aquí estamos obteniendo la URL desde el campo "url"
        console.log("URL del video:", url); // Imprime la URL en la consola
      } else {
        console.log("No such document!");
      }
    };

    fetchVideoUrl();
  }, [db]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!videoUrl) {
    return <div>Loading...</div>; // Muestra un mensaje mientras se carga el video
  }

   // Extrae el ID de video de YouTube desde la URL
   const getYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const youtubeVideoId = getYouTubeVideoId(videoUrl);

  return (
    <div className="video-container">
      <style jsx>{`
        .custom-video {
          height: 220px; /* Ajusta la altura aquí */
        }
      `}</style>
      



      {/* Reemplazamos el video con un iframe para mostrar el video de YouTube */}
      <div className="video-wrapper">
        {youtubeVideoId && (
          <iframe
            width="100%"
            height="400px"
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=${isMuted ? 1 : 0}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>


     { /*<button
        onClick={toggleMute}
        className="mute-button"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        <i className={`fas ${isMuted ? "fa-volume-mute" : "fa-volume-up"}`}></i>
      </button>*/}

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

import React from "react";

const BuscarEmpleo = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-dark dark:text-white mb-6">
      Cómo publicar tu oferta de empleo
      </h1>

      <div className="w-full max-w-4xl aspect-video">
        <iframe
          className="w-full h-full rounded-lg shadow-lg"
          src="https://firebasestorage.googleapis.com/v0/b/rr-hh-project.firebasestorage.app/o/videostutoriales%2Fofc-2.mp4?alt=media&token=2b81718f-48ee-41e0-8121-0fa299f1bee9"
          title="Cómo buscar empleo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default BuscarEmpleo;

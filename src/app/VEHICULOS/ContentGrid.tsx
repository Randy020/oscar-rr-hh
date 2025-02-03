"use client";
import React from "react";
import VideoWithMuteToggle from "@/components/Tables/VideoWithMuteButton";
import ChatCard from "@/components/Chat/ChatCard";
import InmueblesList from "./InmueblesList";

const MyRenderComponent: React.FC = () => {
  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
      <div className="col-span-12 xl:col-span-8">

        {/* Muestra el ChatCard solo en móvil */}
        <div className="block md:hidden mb-4">
          <ChatCard />
        </div>

        {/* Tabla visible siempre */}
        <InmueblesList />
      </div>

      {/* ChatCard para versión de escritorio */}
      <div className="relative">
        <div className="hidden md:block absolute z-10">
          <ChatCard />
        </div>
      </div>
    </div>
  );
};

export default MyRenderComponent;

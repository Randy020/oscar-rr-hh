"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";
import VideoWithMuteToggle from "@/components/Tables/VideoWithMuteButton"
import Link from 'next/link';
import Image from 'next/image';

const ECommerce: React.FC = () => {
  return (
    <>
      
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
       
      <div className="col-span-12 xl:col-span-8">
  <div className="flex flex-col items-center justify-center">
    <Image 
      src="/img/hacia bajo.gif" 
      alt="Descripción del GIF" 
      width={150} 
      height={100} 
      priority 
      className="rotate-90"  // Clase de Tailwind CSS para rotar la imagen
    />
  </div>

  <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mt-8 mb-4">
    <span className="block md:hidden">
      Coloca  <Link href="/forms/form-layout" className="text-blue-500 hover:underline">aquí</Link> tu mejor curriculum y aplica para miles de ofertas de empleo para ti
    </span>
    <span className="hidden md:block">
      Coloca tu curriculum <Link href="/forms/form-layout" className="text-blue-500 hover:underline">aquí</Link> y aplica para miles de ofertas de empleo para ti
    </span>
  </h1>

  <VideoWithMuteToggle />

  {/* Muestra el ChatCard solo en móvil */}
  <div className="block md:hidden mb-4">
    <ChatCard />
  </div>

  {/* Tabla visible siempre */}
  <TableOne />
</div>

{/* ChatCard oculto en versión PC, posicionado fuera del flujo de layout */}
<div className="relative">
  <div className="hidden md:block absolute z-10">
    <ChatCard />
  </div>
</div>


      </div>
    </>
  );
};

export default ECommerce;

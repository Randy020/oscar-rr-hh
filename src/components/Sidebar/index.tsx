"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Typography } from '@mui/material';
import { useAuth } from "@/context/AuthContext"; 
import Publicar from "./publicar"

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "Busca lo que quieras aqui",
    menuItems: [
      {
        label: "INMUEBLES",
        route: "/INMUEBLES",
      },{
        label: "VEHICULOS",
        route: "/VEHICULOS",
      },{
        label: "ANIMALES O MASCOTAS",
        route: "/Animales",
      },{
        label: "ELECTRODOMESTICOS",
        route: "/Electrodomesticos",
      },{
        label: "CELULARES, LAPTOP y PC",
        route: "/Celulares",
      },{
        label: "OTROS",
        route: "/Otros",
      },
     
     
      {
        icon: (
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.25 7C2.25 6.58579 2.58579 6.25 3 6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H3C2.58579 7.75 2.25 7.41421 2.25 7ZM16.5 6.25C16.7951 6.25 17.0628 6.42309 17.1839 6.69223L21.6839 16.6922C21.8539 17.07 21.6855 17.514 21.3078 17.6839C20.93 17.8539 20.486 17.6855 20.3161 17.3078L18.8787 14.1136H14.1213L12.6839 17.3078C12.514 17.6855 12.07 17.8539 11.6922 17.6839C11.3145 17.514 11.1461 17.07 11.3161 16.6922L15.8161 6.69223C15.9372 6.42309 16.2049 6.25 16.5 6.25ZM14.7963 12.6136H18.2037L16.5 8.82764L14.7963 12.6136ZM2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H10C10.4142 11.25 10.75 11.5858 10.75 12C10.75 12.4142 10.4142 12.75 10 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12ZM2.25 17C2.25 16.5858 2.58579 16.25 3 16.25H8C8.41421 16.25 8.75 16.5858 8.75 17C8.75 17.4142 8.41421 17.75 8 17.75H3C2.58579 17.75 2.25 17.4142 2.25 17Z"
              fill=""
            />
          </svg>
        ),
        label: "EMPLEOS",
        route: "/",
      },
      {
        
        label: "Colocar oferta de empleo",
        route: "/forms/form-elements",
      },
      {
        label: "Servicios que ofrecemos",
        route: "/servicios",
      },
      {
        label: "Sobre Nosotros",
        route: "/abaut",
      },
      {
        label: "Lo Que Dicen Nuestros Clientes",
        route: "/nuestro-clientes",
      },
      {
        label: "Casos de éxito",
        route: "/Casos-de-exito",
      },
      {
        label: "Blog",
        route: "/blog",
      },
      {
        label: "Contactanos",
        route: "/contact",
      },
      {      
        label: "Ayuda",
        route: "#",
        children: [ 
          {
            label: "Gmail",
            route: "https://mail.google.com/mail/?view=cm&fs=1&to=oficina@empleooscarfungconsulting.com&su=Asunto%20del%20correo&body=Mensaje%20inicial",
          },
          {
            label: "Whatsapp",
            route: "https://chat.whatsapp.com/BaQ6qYZN0cv2Tw5TyPR4Ip",
          },
          {
            label: "Telefono",
            route: "tel:+18493759917",
          },
        ],
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { userStatus } = useAuth(); 
  const pathname = usePathname();

  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
    <aside
  className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-[rgb(0,102,204)] text-white lg:static lg:translate-x-0 ${
    sidebarOpen
      ? "translate-x-0 duration-300 ease-linear"
      : "-translate-x-full"
  }`}
>


        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 xl:py-10">
          <Link href="/">
          <Image
              width={176}
              height={32}
              src={"/images/lg-v-O-n.png"}
              alt="Logo"
              priority
              className="dark:hidden"
              style={{ width: "auto", height: "auto" }}
            />
            <Image
              width={176}
              height={32}
              src={"/images/lg-v-O-n.png"}
              alt="Logo"
              priority
              className="hidden dark:block"
              style={{ width: "auto", height: "auto" }}
            />
            <Typography sx={{ fontWeight: 'bold', fontSize: '21px' }}>
            Oscar Fung Consulting
            </Typography>
            <Typography 
  sx={{
    fontWeight: 'bold', 
    fontSize: '16px', 
    textAlign: 'center', 
    backgroundColor: 'yellow', 
    color: 'rgb(18 42 72 / var(--tw-bg-opacity))', 
    padding: '6px 12px', 
    borderRadius: '4px' // Opcional para bordes redondeados
  }}
>
  Vende y Compra lo que quieras
</Typography>

<Publicar/>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-1 px-4 px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-5 text-xl font-medium text-white">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-2 ">
                {group.menuItems.map((menuItem, menuIndex) => (
  menuItem.label === "Gestion Empelador" ? (
    // Mostrar solo si userStatus es "empleador"
    userStatus === "empleador" && (
      <SidebarItem
        key={menuIndex}
        item={menuItem}
        pageName={pageName}
        setPageName={setPageName}
      />
    )
  ) : (
    // Mostrar los demás elementos sin restricciones
    <SidebarItem
      key={menuIndex}
      item={menuItem}
      pageName={pageName}
      setPageName={setPageName}
    />
  )
))}

                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>  
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;

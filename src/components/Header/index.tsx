import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import SearchForm from "@/components/Header/SearchForm";
import { useState } from "react";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  return (
    <div>
    <header className="sticky top-0 z-999 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark">
      <div className="flex flex-grow items-center justify-between px-4 py-5 shadow-2 md:px-5 2xl:px-10">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-dark-3 dark:bg-dark-2 lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-dark delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-dark duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            OFC
          </Link>
        </div>

        <div className="hidden xl:block">
          <div>
            <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
            INICIO
            </h1>
            <p className="font-medium">Solución del panel de administración de OFC</p>
          </div>
        </div>

        <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Search Form --> */}
            <SearchForm />
            {/* <!-- Search Form --> */}

            {/* <!-- Dark Mode Toggle --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggle --> */}

          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
    <div className="relative">
 <div
  onClick={() => setIsAccordionOpen(!isAccordionOpen)}
  style={{
    display: 'inline-block', // Se adapta al contenido
    position: 'relative',
    left: '30px',
    backgroundColor: 'rgb(37 78 170)', // Fondo llamativo (dorado)
    padding: '10px 15px', // Espaciado interno
    borderRadius: '8px', // Bordes redondeados
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra para resaltar
    cursor: 'pointer', // Indica que es interactivo
  }}
  className="mt-4"
>
  <label
    style={{
      fontWeight: 'bold',
      fontSize: '18px',
      color: 'rgb(255 255 255)', // Color de texto oscuro para contraste
    }}
    className="block"
  >
    Atención: ¿Cómo usar la página?
  </label>
  <span
    style={{
      color: 'rgb(255 255 255)', // Color llamativo (naranja fuerte)
      fontWeight: 'bold',
      textDecoration: 'underline',
      fontSize: '16px',
    }}
  >
    Clickea aquí para saber cómo
  </span>
</div>


{isAccordionOpen && (
  <div
    className="absolute mt-2 w-auto rounded-md p-4 shadow-lg"
    style={{
      left: '30px', // Distancia consistente desde la izquierda
      zIndex: 1000, // Asegura que esté por encima de otros elementos
      backgroundColor: '#FFFACD', // Fondo llamativo (amarillo claro)
      border: '1px solid #FFD700', // Borde dorado para consistencia
      color: '#333', // Texto oscuro para contraste
      maxWidth: '300px', // Limita el ancho para evitar desbordes
    }}
  >
    <ul className="space-y-2">
      <li>
        <Link
          href="/tutoriales/buscar-empleo"
          className="hover:underline font-medium text-dark"
          style={{ color: '#FF4500' }} // Naranja llamativo para los links
        >
          - Cómo buscar empleo
        </Link>
      </li>
      <li>
        <Link
          href="/tutoriales/oferta-empleo"
          className="hover:underline font-medium text-dark"
          style={{ color: '#FF4500' }} // Naranja llamativo para los links
        >
          - Cómo publicar tu oferta de empleo
        </Link>
      </li>
      <li>
        <Link
          href="/tutoriales/subir-publicidad"
          className="hover:underline font-medium text-dark"
          style={{ color: '#FF4500' }} // Naranja llamativo para los links
        >
          - Cómo subir tu publicidad
        </Link>
      </li>
    </ul>
  </div>
)}

</div>
    </div>
  );
};

export default Header;

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
    <header className="sticky top-0 z-999 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark">
      <div className="flex flex-grow items-center justify-between px-4 py-5 shadow-2 md:px-5 2xl:px-10">
        <div className="hidden xl:block relative">
          <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
            INICIO
          </h1>
          <p className="font-medium">Solución del panel de administración de OFC</p>

          <div className="relative">
            <h3
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              className="font-medium cursor-pointer text-dark dark:text-white mt-4"
            >
              Atencion: ¿Cómo usar la página?
            </h3>

            {isAccordionOpen && (
              <div className="absolute left-0 mt-2 w-64 rounded-md border border-stroke bg-white p-4 shadow-lg dark:border-stroke-dark dark:bg-gray-dark">
                <ul className="space-y-2 text-dark dark:text-white">
                  <li>
                    <Link href="/tutoriales/buscar-empleo" className="hover:underline">
                      - Cómo buscar empleo
                    </Link>
                  </li>
                  <li>
                    <Link href="/tutoriales/buscar-empleo" className="hover:underline">
                      - Cómo publicar tu oferta de empleo
                    </Link>
                  </li>
                  <li>
                    <Link href="/tutoriales/subir-publicidad" className="hover:underline">
                      - Cómo subir tu publicidad
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <SearchForm />
            <DarkModeSwitcher />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;

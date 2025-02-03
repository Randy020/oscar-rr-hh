"use client"; // Para Next.js App Router

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Para Next.js 13+ (App Router)

type Category = {
  name: string;
  path: string;
};

const categories: Category[] = [
  { name: "Inmuebles", path: "/InmueblesList" },
  { name: "Vehículos", path: "/VEHICULOS" },
  { name: "Animales", path: "/Animales" },
  { name: "Electrodomésticos", path: "/Electrodomesticos" },
  { name: "Celulares", path: "/Celulares" },
  { name: "Otros", path: "/Otros" },
];

const SearchDropdown: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const router = useRouter();

  const handleSelect = (path: string): void => {
    router.push(path); // Redirecciona a la ruta seleccionada
  };

  return (
    <div className="relative w-full max-w-[300px]">
      <input
        type="text"
        placeholder="Buscar categoría..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        className="w-full rounded-full border border-stroke bg-gray-2 py-3 pl-5 pr-10 text-dark focus:border-primary focus:outline-none dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus:border-primary"
      />

      {showDropdown && (
        <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md dark:bg-dark-3">
          {categories
            .filter((category) =>
              category.name.toLowerCase().includes(query.toLowerCase())
            )
            .map((category) => (
              <li
                key={category.path}
                onMouseDown={() => handleSelect(category.path)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-4"
              >
                {category.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;

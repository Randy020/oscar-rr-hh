import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Obtener el año actual

  return (
    <footer className="bg-white text-dark py-4 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto text-center">
        <h1 className="text-lg">
          Creado por{' '}
          <a
            href="https://www.fleestingdevelopers.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Fleesting Developers
          </a>
        </h1>
        <p className="text-sm mt-2">
          &copy; {currentYear} Fleesting Developers. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

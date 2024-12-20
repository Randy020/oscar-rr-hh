import Image from 'next/image';

export default function Team() {
  const teamMembers = [
    {
      title: 'Profesionales certificados',
      description:
        'Nuestro equipo está compuesto por especialistas en Recursos Humanos con certificaciones reconocidas. Cada miembro aporta una visión única y experiencia en diversas áreas, lo que enriquece nuestro enfoque en las soluciones que ofrecemos.',
      image:
        'https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_clip,w_960,h_720,f_auto,q_auto/unsplashcom/photo-1635698517166-880ee3180969',
    },
    {
      title: 'Compromiso y dedicación',
      description:
        'En OFP Consulting, cada profesional está comprometido con el éxito de nuestros clientes. Trabajamos en estrecha colaboración para entender las necesidades específicas de cada empresa y ofrecer las mejores soluciones en gestión de talento.',
      image:
        'https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_clip,w_960,h_720,f_auto,q_auto/unsplashcom/photo-1672132855420-6bd49fc4374f',
    },
    {
      title: 'Enfoque multidisciplinario',
      description:
        'Nuestro equipo combina diversas disciplinas que incluyen psicología, administración y coaching. Esta diversidad de conocimientos nos permite abordar los desafíos de Recursos Humanos desde múltiples perspectivas, asegurando una solución integral y efectiva.',
      image:
        'https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_clip,w_960,h_720,f_auto,q_auto/unsplashcom/photo-1588151699823-82d2839a0b43',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center">
          Expertos a tu servicio
        </h2>
        <p className="mt-4 text-lg text-gray-600 text-center">
          La fuerza detrás de tu éxito
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 shadow-lg rounded-2xl transform transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative w-full h-56 overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-gray-800 text-center">
                {item.title}
              </h3>
              <p className="mt-4 text-gray-600 text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { FaLeaf, FaMicroscope, FaHandsHelping, FaGlobe } from 'react-icons/fa';

const Motivation = () => {
  const reasons = [
    {
      icon: <FaLeaf className="text-green-600 text-4xl" />,
      title: 'Preserve Nature',
      description: 'Highlight the importance of Ethiopian medicinal plants and their role in biodiversity.',
    },
    {
      icon: <FaMicroscope className="text-green-600 text-4xl" />,
      title: 'Scientific Research',
      description: 'Encourage research into the medicinal properties of these plants.',
    },
    {
      icon: <FaHandsHelping className="text-green-600 text-4xl" />,
      title: 'Community Contribution',
      description: 'Engage the community in preserving traditional knowledge.',
    },
    {
      icon: <FaGlobe className="text-green-600 text-4xl" />,
      title: 'Global Awareness',
      description: 'Spread awareness about Ethiopian medicinal plants worldwide.',
    },
  ];

  return (
    <section id="motivation-section" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Reason for This Work</h2>
        <p className="text-lg text-gray-600 mb-12">
          This project aims to preserve and promote the rich heritage of Ethiopian medicinal plants, fostering research and global awareness.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Motivation;
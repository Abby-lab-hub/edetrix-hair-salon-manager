import React, { useState } from 'react';

export default function CatalogSelector({ onStyleSelected }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const catalog = [
    {
      id: 1,
      name: 'Classic Fade',
      category: 'mens',
      price: 25,
      image: '💈',
      description: 'Clean, sharp fade with precise lines'
    },
    {
      id: 2,
      name: 'Pompadour',
      category: 'mens',
      price: 35,
      image: '🎩',
      description: 'Voluminous top with tapered sides'
    },
    {
      id: 3,
      name: 'Undercut',
      category: 'mens',
      price: 30,
      image: '✂️',
      description: 'Short sides with longer top'
    },
    {
      id: 4,
      name: 'Layers',
      category: 'womens',
      price: 45,
      image: '✨',
      description: 'Flowing layers for movement and texture'
    },
    {
      id: 5,
      name: 'Bob Cut',
      category: 'womens',
      price: 40,
      image: '👱',
      description: 'Timeless shoulder-length bob'
    },
    {
      id: 6,
      name: 'Pixie Cut',
      category: 'womens',
      price: 35,
      image: '🧖',
      description: 'Short and chic for a bold look'
    },
    {
      id: 7,
      name: 'Afro',
      category: 'curly',
      price: 40,
      image: '🌀',
      description: 'Defined and sculpted natural curls'
    },
    {
      id: 8,
      name: 'Braids',
      category: 'curly',
      price: 55,
      image: '🧣',
      description: 'Intricate braiding styles'
    },
    {
      id: 9,
      name: 'Locs',
      category: 'curly',
      price: 50,
      image: '🔗',
      description: 'Beautiful and well-maintained locs'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Styles' },
    { id: 'mens', label: 'Mens' },
    { id: 'womens', label: 'Womens' },
    { id: 'curly', label: 'Curly Hair' }
  ];

  const filteredCatalog = selectedCategory === 'all'
    ? catalog
    : catalog.filter(item => item.category === selectedCategory);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Our Hairstyle Catalog</h2>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-2 rounded-full font-medium transition ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Catalog Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredCatalog.map(style => (
          <div
            key={style.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
            onClick={() => onStyleSelected(style)}
          >
            <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-8 text-6xl text-center">
              {style.image}
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">{style.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{style.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">${style.price}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
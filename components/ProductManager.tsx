'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  views: number;
  leads: number;
}

interface ProductManagerProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export default function ProductManager({ products, setProducts }: ProductManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Electronics'
  });

  const categories = ['Electronics', 'Vehicles', 'Furniture', 'Clothing', 'Books', 'Others'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setProducts(products.map(p =>
        p.id === editingId
          ? { ...p, ...formData, price: parseFloat(formData.price) }
          : p
      ));
      setEditingId(null);
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        views: 0,
        leads: 0
      };
      setProducts([...products, newProduct]);
    }
    setFormData({ name: '', price: '', description: '', category: 'Electronics' });
    setShowAddForm(false);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category: product.category
    });
    setEditingId(product.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('क्या आप वाकई इस उत्पाद को हटाना चाहते हैं?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">उत्पाद प्रबंधन</h2>
          <p className="text-gray-600">अपने Facebook Marketplace उत्पादों को प्रबंधित करें</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingId(null);
            setFormData({ name: '', price: '', description: '', category: 'Electronics' });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          नया उत्पाद जोड़ें
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {editingId ? 'उत्पाद संपादित करें' : 'नया उत्पाद जोड़ें'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">उत्पाद का नाम</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">कीमत (₹)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">श्रेणी</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">विवरण</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingId ? 'अपडेट करें' : 'जोड़ें'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                  setFormData({ name: '', price: '', description: '', category: 'Electronics' });
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                रद्द करें
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-md p-12 border border-gray-200 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">कोई उत्पाद नहीं मिला। नया उत्पाद जोड़ने के लिए ऊपर बटन क्लिक करें।</p>
          </div>
        ) : (
          products.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">{product.description}</p>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-blue-600">₹{product.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-purple-50 px-3 py-2 rounded-lg">
                    <p className="text-purple-600 font-medium">{product.views} व्यूज</p>
                  </div>
                  <div className="bg-green-50 px-3 py-2 rounded-lg">
                    <p className="text-green-600 font-medium">{product.leads} लीड्स</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

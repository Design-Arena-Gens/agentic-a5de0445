'use client';

import { useState } from 'react';
import { Search, MapPin, DollarSign, TrendingUp, Phone, Mail, UserPlus } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
}

interface CustomerFinderProps {
  products: Product[];
}

interface PotentialCustomer {
  id: number;
  name: string;
  location: string;
  interest: string;
  budget: string;
  score: number;
  phone: string;
  email: string;
}

export default function CustomerFinder({ products }: CustomerFinderProps) {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [searching, setSearching] = useState(false);
  const [customers, setCustomers] = useState<PotentialCustomer[]>([]);

  const findCustomers = () => {
    setSearching(true);
    setTimeout(() => {
      const mockCustomers: PotentialCustomer[] = [
        {
          id: 1,
          name: 'Amit Kumar',
          location: 'Delhi, India',
          interest: 'Electronics में बहुत रुचि',
          budget: '₹50,000 - ₹70,000',
          score: 95,
          phone: '+91 98765 43211',
          email: 'amit.k@example.com'
        },
        {
          id: 2,
          name: 'Neha Singh',
          location: 'Mumbai, India',
          interest: 'नए स्मार्टफोन की तलाश में',
          budget: '₹60,000 - ₹80,000',
          score: 88,
          phone: '+91 98765 43212',
          email: 'neha.s@example.com'
        },
        {
          id: 3,
          name: 'Rajesh Verma',
          location: 'Bangalore, India',
          interest: 'iPhone में रुचि',
          budget: '₹55,000 - ₹75,000',
          score: 82,
          phone: '+91 98765 43213',
          email: 'rajesh.v@example.com'
        },
        {
          id: 4,
          name: 'Priya Sharma',
          location: 'Pune, India',
          interest: 'अच्छी स्थिति वाला फोन चाहिए',
          budget: '₹50,000 - ₹65,000',
          score: 76,
          phone: '+91 98765 43214',
          email: 'priya.s@example.com'
        },
        {
          id: 5,
          name: 'Vikram Patel',
          location: 'Ahmedabad, India',
          interest: 'प्रीमियम स्मार्टफोन चाहते हैं',
          budget: '₹60,000 - ₹70,000',
          score: 70,
          phone: '+91 98765 43215',
          email: 'vikram.p@example.com'
        }
      ];
      setCustomers(mockCustomers);
      setSearching(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">संभावित ग्राहक खोजें</h2>
        <p className="text-gray-600">AI का उपयोग करके अपने उत्पादों के लिए संभावित खरीदारों को ढूंढें</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">उत्पाद चुनें</label>
            <select
              value={selectedProduct || ''}
              onChange={(e) => setSelectedProduct(parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">-- उत्पाद चुनें --</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} ({product.category})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={findCustomers}
            disabled={!selectedProduct || searching}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {searching ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>ग्राहक खोज रहे हैं...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>ग्राहक खोजें</span>
              </>
            )}
          </button>
        </div>
      </div>

      {customers.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {customers.length} संभावित ग्राहक मिले
            </h3>
            <div className="text-sm text-gray-600">
              मैच स्कोर के आधार पर सॉर्ट किया गया
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customers.map(customer => (
              <div
                key={customer.id}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{customer.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {customer.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-bold text-green-600">{customer.score}%</div>
                    <div className="text-xs text-gray-600">मैच स्कोर</div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">रुचि</p>
                      <p className="text-sm text-gray-600">{customer.interest}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">बजट रेंज</p>
                      <p className="text-sm text-gray-600">{customer.budget}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${customer.phone}`} className="hover:text-blue-600">
                      {customer.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${customer.email}`} className="hover:text-blue-600">
                      {customer.email}
                    </a>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <UserPlus className="w-4 h-4" />
                    लीड जोड़ें
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                    संपर्क करें
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {customers.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 border border-gray-200 text-center">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">कोई उत्पाद चुनें और ग्राहक खोजने के लिए बटन क्लिक करें</p>
          <p className="text-sm text-gray-500 mt-2">
            AI आपके उत्पाद के लिए सबसे अच्छे संभावित खरीदारों को ढूंढेगा
          </p>
        </div>
      )}
    </div>
  );
}

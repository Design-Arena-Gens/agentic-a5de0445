'use client';

import { useState } from 'react';
import {
  ShoppingBag,
  Users,
  TrendingUp,
  MessageSquare,
  Sparkles,
  Plus,
  Search,
  BarChart3,
  Target,
  Megaphone
} from 'lucide-react';
import ProductManager from '@/components/ProductManager';
import LeadGenerator from '@/components/LeadGenerator';
import AdCreator from '@/components/AdCreator';
import Analytics from '@/components/Analytics';
import CustomerFinder from '@/components/CustomerFinder';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'iPhone 13 Pro',
      price: 65000,
      description: 'Excellent condition, 256GB',
      category: 'Electronics',
      views: 245,
      leads: 12
    },
    {
      id: 2,
      name: 'Royal Enfield Classic 350',
      price: 125000,
      description: '2022 model, well maintained',
      category: 'Vehicles',
      views: 389,
      leads: 8
    }
  ]);

  const [leads, setLeads] = useState([
    {
      id: 1,
      productId: 1,
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      interest: 'high',
      message: 'Is the price negotiable?',
      date: new Date()
    },
    {
      id: 2,
      productId: 1,
      name: 'Priya Patel',
      phone: '+91 87654 32109',
      interest: 'medium',
      message: 'Can I see the phone tomorrow?',
      date: new Date()
    }
  ]);

  const stats = {
    totalProducts: products.length,
    totalViews: products.reduce((sum, p) => sum + p.views, 0),
    totalLeads: leads.length,
    conversionRate: '18.5%'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Facebook Marketplace AI Agent</h1>
                <p className="text-sm text-gray-600">आपके बिक्री को बढ़ाने के लिए AI-powered सहायक</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                ✓ Active
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">कुल उत्पाद</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProducts}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">कुल व्यूज</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalViews}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">कुल लीड्स</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalLeads}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">कन्वर्जन रेट</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.conversionRate}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <button
                onClick={() => setActiveTab('products')}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-all hover:scale-105 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <ShoppingBag className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">उत्पाद प्रबंधन</h3>
                    <p className="text-sm text-gray-600">अपने उत्पाद जोड़ें और प्रबंधित करें</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('customers')}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-all hover:scale-105 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Search className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">ग्राहक खोजें</h3>
                    <p className="text-sm text-gray-600">संभावित खरीदारों को ढूंढें</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('ads')}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-all hover:scale-105 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Megaphone className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">विज्ञापन बनाएं</h3>
                    <p className="text-sm text-gray-600">AI से विज्ञापन जेनरेट करें</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('leads')}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-all hover:scale-105 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <MessageSquare className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">लीड्स प्रबंधन</h3>
                    <p className="text-sm text-gray-600">अपने लीड्स देखें और संपर्क करें</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-all hover:scale-105 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <BarChart3 className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">एनालिटिक्स</h3>
                    <p className="text-sm text-gray-600">बिक्री विश्लेषण और सुझाव</p>
                  </div>
                </div>
              </button>

              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">AI सुझाव</h3>
                    <p className="text-sm text-white/90">स्वचालित अनुकूलन चालू है</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">हाल की गतिविधि</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <p className="text-sm text-gray-700">नया लीड प्राप्त: <strong>Rahul Sharma</strong> ने iPhone 13 Pro में रुचि दिखाई</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <p className="text-sm text-gray-700">विज्ञापन अभियान सक्रिय: Royal Enfield के लिए 50+ व्यूज</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <p className="text-sm text-gray-700">AI सुझाव: अपने उत्पाद की कीमत 5% कम करने पर बिक्री बढ़ सकती है</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <ProductManager products={products} setProducts={setProducts} />
        )}

        {activeTab === 'customers' && (
          <CustomerFinder products={products} />
        )}

        {activeTab === 'ads' && (
          <AdCreator products={products} />
        )}

        {activeTab === 'leads' && (
          <LeadGenerator leads={leads} products={products} setLeads={setLeads} />
        )}

        {activeTab === 'analytics' && (
          <Analytics products={products} leads={leads} />
        )}

        {/* Back to Dashboard */}
        {activeTab !== 'dashboard' && (
          <button
            onClick={() => setActiveTab('dashboard')}
            className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← डैशबोर्ड पर वापस जाएं
          </button>
        )}
      </div>
    </div>
  );
}

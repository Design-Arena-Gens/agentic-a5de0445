'use client';

import { BarChart3, TrendingUp, Target, Lightbulb, ArrowUp, ArrowDown } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  views: number;
  leads: number;
}

interface Lead {
  id: number;
  productId: number;
  interest: string;
}

interface AnalyticsProps {
  products: Product[];
  leads: Lead[];
}

export default function Analytics({ products, leads }: AnalyticsProps) {
  const totalViews = products.reduce((sum, p) => sum + p.views, 0);
  const totalLeads = leads.length;
  const conversionRate = totalViews > 0 ? ((totalLeads / totalViews) * 100).toFixed(1) : '0';

  const topProduct = products.reduce((max, p) =>
    (p.views + p.leads * 10) > (max.views + max.leads * 10) ? p : max
  , products[0] || { name: 'N/A', views: 0, leads: 0 });

  const categoryStats = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = { views: 0, leads: 0, products: 0 };
    }
    acc[product.category].views += product.views;
    acc[product.category].leads += product.leads;
    acc[product.category].products += 1;
    return acc;
  }, {} as Record<string, { views: number; leads: number; products: number }>);

  const highInterestLeads = leads.filter(l => l.interest === 'high').length;
  const leadQualityScore = totalLeads > 0 ? ((highInterestLeads / totalLeads) * 100).toFixed(0) : '0';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">बिक्री एनालिटिक्स और सुझाव</h2>
        <p className="text-gray-600">अपने बिक्री प्रदर्शन का विश्लेषण करें और सुधार के लिए सुझाव प्राप्त करें</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">कुल व्यूज</p>
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalViews}</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+15% इस सप्ताह</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">कन्वर्जन रेट</p>
            <Target className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{conversionRate}%</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+3.2% बेहतर</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">कुल लीड्स</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalLeads}</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+8 नए</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">लीड गुणवत्ता</p>
            <Lightbulb className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{leadQualityScore}%</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-sm text-gray-600">उच्च रुचि लीड्स</span>
          </div>
        </div>
      </div>

      {/* Top Performing Product */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">सबसे अच्छा प्रदर्शन करने वाला उत्पाद</h3>
            <p className="text-sm text-green-100">सबसे अधिक रुचि और व्यूज</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-2xl font-bold mb-2">{topProduct.name}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-green-100">व्यूज</p>
              <p className="text-xl font-bold">{topProduct.views}</p>
            </div>
            <div>
              <p className="text-green-100">लीड्स</p>
              <p className="text-xl font-bold">{topProduct.leads}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">श्रेणी के अनुसार प्रदर्शन</h3>
        <div className="space-y-4">
          {Object.entries(categoryStats).map(([category, stats]) => {
            const avgViewsPerProduct = (stats.views / stats.products).toFixed(0);
            const categoryConversion = stats.views > 0 ? ((stats.leads / stats.views) * 100).toFixed(1) : '0';
            return (
              <div key={category} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-gray-900">{category}</h4>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {stats.products} उत्पाद
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">कुल व्यूज</p>
                    <p className="text-xl font-bold text-gray-900">{stats.views}</p>
                    <p className="text-xs text-gray-500">औसत: {avgViewsPerProduct}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">कुल लीड्स</p>
                    <p className="text-xl font-bold text-gray-900">{stats.leads}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">कन्वर्जन</p>
                    <p className="text-xl font-bold text-gray-900">{categoryConversion}%</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-md p-6 border border-purple-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-600 p-3 rounded-lg">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">AI सुझाव और सिफारिशें</h3>
            <p className="text-sm text-gray-600">अपनी बिक्री बढ़ाने के लिए व्यक्तिगत सुझाव</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">कीमत अनुकूलन</h4>
                <p className="text-sm text-gray-700 mb-2">
                  आपके उत्पाद बाजार की तुलना में थोड़े महंगे हैं। कीमत में 5-10% की कमी से बिक्री में 30% की वृद्धि हो सकती है।
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                    प्राथमिकता: उच्च
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    प्रभाव: +30% बिक्री
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">बेहतर फोटो जोड़ें</h4>
                <p className="text-sm text-gray-700 mb-2">
                  उच्च गुणवत्ता वाली तस्वीरें और वीडियो जोड़ने से व्यूज में 45% और लीड्स में 25% की वृद्धि हो सकती है।
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium">
                    प्राथमिकता: मध्यम
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    प्रभाव: +45% व्यूज
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">विस्तृत विवरण लिखें</h4>
                <p className="text-sm text-gray-700 mb-2">
                  अधिक विस्तृत उत्पाद विवरण और विशेषताओं की सूची जोड़ने से ग्राहकों का विश्वास बढ़ता है और लीड्स में 20% की वृद्धि होती है।
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium">
                    प्राथमिकता: मध्यम
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    प्रभाव: +20% लीड्स
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">सही समय पर पोस्ट करें</h4>
                <p className="text-sm text-gray-700 mb-2">
                  शाम 6-9 बजे के बीच पोस्ट करने से 35% अधिक व्यूज मिलते हैं। सप्ताहांत में पोस्टिंग भी अधिक प्रभावी है।
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                    प्राथमिकता: उच्च
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    प्रभाव: +35% व्यूज
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-pink-600 font-bold">5</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">तुरंत जवाब दें</h4>
                <p className="text-sm text-gray-700 mb-2">
                  30 मिनट के भीतर जवाब देने से बिक्री की संभावना 21x बढ़ जाती है। त्वरित प्रतिक्रिया आपके व्यवसाय को प्रतिस्पर्धियों से अलग करती है।
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium">
                    प्राथमिकता: अत्यंत उच्च
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    प्रभाव: 21x बेहतर
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">प्रदर्शन अंतर्दृष्टि</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">आपकी ताकत</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ArrowUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">उच्च गुणवत्ता वाले लीड्स (उच्च रुचि {leadQualityScore}%)</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">अच्छी कन्वर्जन रेट ({conversionRate}%)</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">लगातार बढ़ रहे व्यूज (+15% इस सप्ताह)</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-3">सुधार के क्षेत्र</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ArrowDown className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">प्रतिक्रिया समय को तेज करें</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowDown className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">कीमतों को प्रतिस्पर्धी बनाएं</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowDown className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">उत्पाद तस्वीरें बेहतर बनाएं</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Sparkles, Copy, Download, Share2, ThumbsUp } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

interface AdCreatorProps {
  products: Product[];
}

interface GeneratedAd {
  headline: string;
  description: string;
  cta: string;
  hashtags: string[];
  tone: string;
}

export default function AdCreator({ products }: AdCreatorProps) {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [tone, setTone] = useState('professional');
  const [generating, setGenerating] = useState(false);
  const [ads, setAds] = useState<GeneratedAd[]>([]);

  const tones = [
    { value: 'professional', label: 'पेशेवर' },
    { value: 'friendly', label: 'दोस्ताना' },
    { value: 'urgent', label: 'तत्काल' },
    { value: 'luxury', label: 'लक्जरी' }
  ];

  const generateAds = () => {
    setGenerating(true);
    const product = products.find(p => p.id === selectedProduct);

    setTimeout(() => {
      if (product) {
        const generatedAds: GeneratedAd[] = [
          {
            headline: `🔥 ${product.name} - सीमित समय की पेशकश!`,
            description: `केवल ₹${product.price.toLocaleString('en-IN')} में ${product.name} खरीदें! ${product.description}\n\nविशेषताएं:\n✅ बेहतरीन स्थिति\n✅ वारंटी उपलब्ध\n✅ तुरंत डिलीवरी\n✅ नगोशिएबल प्राइस\n\nअभी संपर्क करें और सबसे पहले इस शानदार डील को पाएं!`,
            cta: 'अभी संपर्क करें',
            hashtags: ['#FacebookMarketplace', '#' + product.category, '#BestDeal', '#India'],
            tone: 'urgent'
          },
          {
            headline: `${product.name} - उत्कृष्ट गुणवत्ता, बेहतरीन कीमत`,
            description: `क्या आप ${product.name} की तलाश में हैं?\n\n${product.description}\n\nकीमत: ₹${product.price.toLocaleString('en-IN')}\n\nयह उत्पाद आपके लिए परफेक्ट है! अधिक जानकारी के लिए संपर्क करें।\n\nगंभीर खरीदार ही संपर्क करें। धन्यवाद!`,
            cta: 'अधिक जानकारी के लिए मैसेज करें',
            hashtags: ['#' + product.name.replace(/\s/g, ''), '#Sale', '#Quality', '#Affordable'],
            tone: 'professional'
          },
          {
            headline: `💎 ${product.name} - अपने सपनों का उत्पाद यहाँ है!`,
            description: `हैलो दोस्तों! 👋\n\nमैं अपना ${product.name} बेच रहा हूं। ${product.description}\n\nकीमत बहुत ही किफायती है - सिर्फ ₹${product.price.toLocaleString('en-IN')}\n\nरुचि रखने वाले कृपया संपर्क करें। पहले आओ पहले पाओ के आधार पर! 🎯`,
            cta: 'मुझे मैसेज करें',
            hashtags: ['#ForSale', '#' + product.category, '#GreatDeal', '#MustBuy'],
            tone: 'friendly'
          }
        ];
        setAds(generatedAds);
      }
      setGenerating(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('विज्ञापन कॉपी कर लिया गया!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">AI विज्ञापन जेनरेटर</h2>
        <p className="text-gray-600">अपने उत्पादों के लिए आकर्षक विज्ञापन बनाएं</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">उत्पाद चुनें</label>
            <select
              value={selectedProduct || ''}
              onChange={(e) => setSelectedProduct(parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">-- उत्पाद चुनें --</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - ₹{product.price.toLocaleString('en-IN')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">विज्ञापन का टोन</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tones.map(t => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    tone === t.value
                      ? 'border-purple-600 bg-purple-50 text-purple-700 font-medium'
                      : 'border-gray-300 text-gray-700 hover:border-purple-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateAds}
            disabled={!selectedProduct || generating}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>विज्ञापन बना रहे हैं...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>AI विज्ञापन जेनरेट करें</span>
              </>
            )}
          </button>
        </div>
      </div>

      {ads.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">जेनरेट किए गए विज्ञापन</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ads.map((ad, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-sm font-medium">विज्ञापन #{index + 1}</span>
                    <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                      {ad.tone === 'professional' ? 'पेशेवर' :
                       ad.tone === 'friendly' ? 'दोस्ताना' :
                       ad.tone === 'urgent' ? 'तत्काल' : 'लक्जरी'}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{ad.headline}</h4>
                    <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                      {ad.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {ad.hashtags.map((tag, i) => (
                      <span key={i} className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">कॉल टू एक्शन:</span>
                      <span className="text-sm font-bold text-purple-600">{ad.cta}</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(`${ad.headline}\n\n${ad.description}\n\n${ad.hashtags.join(' ')}`)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <Copy className="w-4 h-4" />
                        कॉपी करें
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        <Share2 className="w-4 h-4" />
                        शेयर
                      </button>
                      <button className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {ads.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 border border-gray-200 text-center">
          <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">कोई उत्पाद चुनें और AI से विज्ञापन बनाने के लिए बटन क्लिक करें</p>
          <p className="text-sm text-gray-500 mt-2">
            AI आपके उत्पाद के लिए आकर्षक और प्रभावी विज्ञापन बनाएगा
          </p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { MessageSquare, Phone, Mail, Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Lead {
  id: number;
  productId: number;
  name: string;
  phone: string;
  interest: string;
  message: string;
  date: Date;
  status?: string;
}

interface Product {
  id: number;
  name: string;
}

interface LeadGeneratorProps {
  leads: Lead[];
  products: Product[];
  setLeads: (leads: Lead[]) => void;
}

export default function LeadGenerator({ leads, products, setLeads }: LeadGeneratorProps) {
  const [filter, setFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const getProductName = (productId: number) => {
    return products.find(p => p.id === productId)?.name || 'Unknown Product';
  };

  const getInterestBadge = (interest: string) => {
    const colors = {
      high: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-gray-100 text-gray-800'
    };
    const labels = {
      high: 'उच्च रुचि',
      medium: 'मध्यम रुचि',
      low: 'कम रुचि'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[interest as keyof typeof colors]}`}>
        {labels[interest as keyof typeof labels]}
      </span>
    );
  };

  const updateLeadStatus = (leadId: number, status: string) => {
    setLeads(leads.map(lead =>
      lead.id === leadId ? { ...lead, status } : lead
    ));
  };

  const generateContactMessage = (lead: Lead) => {
    const product = getProductName(lead.productId);
    return `नमस्ते ${lead.name},\n\nधन्यवाद ${product} में रुचि दिखाने के लिए।\n\nआपका सवाल था: "${lead.message}"\n\nमैं आपकी सहायता के लिए उपलब्ध हूं। कृपया मुझे बताएं कि आप कब बात करना चाहेंगे।\n\nधन्यवाद!`;
  };

  const filteredLeads = filter === 'all'
    ? leads
    : leads.filter(lead => lead.interest === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">लीड्स प्रबंधन</h2>
          <p className="text-gray-600">अपने संभावित ग्राहकों को प्रबंधित करें और उनसे संपर्क करें</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">सभी लीड्स</option>
            <option value="high">उच्च रुचि</option>
            <option value="medium">मध्यम रुचि</option>
            <option value="low">कम रुचि</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-100 font-medium">उच्च रुचि</p>
              <p className="text-3xl font-bold mt-2">
                {leads.filter(l => l.interest === 'high').length}
              </p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-100 font-medium">मध्यम रुचि</p>
              <p className="text-3xl font-bold mt-2">
                {leads.filter(l => l.interest === 'medium').length}
              </p>
            </div>
            <Clock className="w-12 h-12 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-100 font-medium">कम रुचि</p>
              <p className="text-3xl font-bold mt-2">
                {leads.filter(l => l.interest === 'low').length}
              </p>
            </div>
            <AlertCircle className="w-12 h-12 text-gray-200" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 border border-gray-200 text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">कोई लीड नहीं मिली</p>
          </div>
        ) : (
          filteredLeads.map(lead => (
            <div
              key={lead.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{lead.name}</h3>
                      <p className="text-sm text-gray-600">
                        उत्पाद: <span className="font-medium">{getProductName(lead.productId)}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(lead.date), 'dd MMM yyyy, hh:mm a')}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getInterestBadge(lead.interest)}
                    {lead.status && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {lead.status}
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">संदेश:</p>
                  <p className="text-sm text-gray-600 italic">"{lead.message}"</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <a href={`tel:${lead.phone}`} className="hover:text-blue-600 font-medium">
                      {lead.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Mail className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">संदेश भेजें</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const message = generateContactMessage(lead);
                      navigator.clipboard.writeText(message);
                      alert('संदेश कॉपी कर लिया गया!');
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    संपर्क संदेश कॉपी करें
                  </button>
                  <button
                    onClick={() => updateLeadStatus(lead.id, 'संपर्क किया')}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    संपर्क किया के रूप में चिह्नित करें
                  </button>
                  <button
                    onClick={() => updateLeadStatus(lead.id, 'बंद किया')}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                  >
                    बंद करें
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* AI Suggestions */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-md p-6 border border-purple-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-600" />
          AI सुझाव
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <p className="text-sm text-gray-700">
              <strong>उच्च रुचि वाले लीड्स</strong> को पहले प्राथमिकता दें - उनमें कन्वर्जन की संभावना 85% अधिक है
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <p className="text-sm text-gray-700">
              <strong>24 घंटे के भीतर</strong> संपर्क करें - जल्दी प्रतिक्रिया से बिक्री की संभावना 60% बढ़ती है
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <p className="text-sm text-gray-700">
              <strong>व्यक्तिगत संदेश</strong> भेजें - सामान्य संदेशों की तुलना में 3x बेहतर परिणाम
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

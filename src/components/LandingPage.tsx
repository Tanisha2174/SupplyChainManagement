import React from 'react';
import { Package, Truck, BarChart3, Brain, Zap, ArrowRight, Activity, MapPin, TrendingUp, Shield, Clock, Users } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'inventory' | 'routes') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: "AI-Powered Forecasting",
      description: "Advanced machine learning algorithms predict demand patterns with 95% accuracy across all product categories."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Real-Time Optimization",
      description: "Dynamic inventory rebalancing and automated stock adjustments based on live demand signals."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Risk Mitigation",
      description: "Proactive identification of stockouts and overstock situations before they impact operations."
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "24/7 Monitoring",
      description: "Continuous surveillance of inventory levels, demand patterns, and supply chain disruptions."
    }
  ];

  const stats = [
    { label: "Stores Monitored", value: "4,700+", icon: <MapPin className="w-6 h-6" /> },
    { label: "Daily Transactions", value: "265M", icon: <Activity className="w-6 h-6" /> },
    { label: "Inventory Accuracy", value: "99.2%", icon: <BarChart3 className="w-6 h-6" /> },
    { label: "Cost Reduction", value: "18%", icon: <TrendingUp className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-9xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Walmart AI Operations</h1>
                <p className="text-sm text-gray-600">Agentic Supply Chain Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600">System Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-8xl mx-20 px-8 py-16">
        <div className="text-center mb-16">
          {/* Prominent Branding */}
          <div className="mb-8">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg text-lg font-bold">
              Powered by OpenAI GPT-4o Mini | Built for Walmart
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Agentic AI-Powered
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> AI Operations</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Revolutionizing retail operations through autonomous AI agents that intelligently manage inventory, 
            predict demand patterns, and optimize logistics across the entire supply chain network.
          </p>
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">Powered by OpenAI GPT-4o Mini</span>
            </div>
            <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-700">Built for Walmart</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 rounded-full">
              <Activity className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">Live System</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Multi-Agent Network</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Inventory Management Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Inventory Management</h3>
                <p className="text-gray-600">AI-powered demand forecasting & stock optimization</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Real-time inventory tracking across 6 stores</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Predictive demand forecasting with 95% accuracy</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Automated rebalancing recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Multi-agent AI system monitoring</span>
              </div>
            </div>

            <button 
              onClick={() => onNavigate('inventory')}
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold group-hover:shadow-lg"
            >
              <span>Access Inventory Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Truck Routes Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Truck Route Optimization</h3>
                <p className="text-gray-600">Intelligent logistics & delivery route planning</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Dynamic route optimization algorithms</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Real-time traffic and weather integration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Fleet management and tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Delivery performance analytics</span>
              </div>
            </div>

            <button 
              onClick={() => onNavigate('routes')}
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold group-hover:shadow-lg"
            >
              <span>Access Route Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powered by Autonomous AI Agents</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our autonomous AI agents work collaboratively using GPT-4o Mini to optimize every aspect of retail operations through intelligent decision-making and real-time adaptation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Development Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the talented team behind this innovative agentic AI supply chain management system
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                TM
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Team Member 1</h3>
              <p className="text-sm text-gray-600 mb-2">AI Systems Architect</p>
              <p className="text-xs text-gray-500">Inventory Management & Forecasting</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                TM
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Team Member 2</h3>
              <p className="text-sm text-gray-600 mb-2">Logistics Optimization Lead</p>
              <p className="text-xs text-gray-500">Route Planning & Fleet Management</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                TM
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Team Member 3</h3>
              <p className="text-sm text-gray-600 mb-2">Data Science Engineer</p>
              <p className="text-xs text-gray-500">Machine Learning & Analytics</p>
            </div>

            {/* Team Member 4 */}
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                TM
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Team Member 4</h3>
              <p className="text-sm text-gray-600 mb-2">Full-Stack Developer</p>
              <p className="text-xs text-gray-500">Frontend & Backend Development</p>
            </div>
          </div>

          {/* Project Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200 mb-4">
                <span className="text-sm font-semibold text-gray-700">Walmart Sparkathon 2025 Project</span>
              </div>
              <p className="text-sm text-gray-600 max-w-3xl mx-auto">
                This agentic AI supply chain management system was developed as part of the Walmart Sparkathon 2025, 
                leveraging OpenAI's GPT-4o Mini to create autonomous agents that revolutionize retail operations through 
                intelligent inventory management and logistics optimization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
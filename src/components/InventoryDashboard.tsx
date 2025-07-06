import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Package, TrendingUp, AlertTriangle, CheckCircle, Truck, MapPin, Activity, Zap, RefreshCw, Eye, Settings, Brain, Target, ArrowUp, ArrowDown, Minus } from 'lucide-react';

const InventoryDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [realTimeData, setRealTimeData] = useState({});

  // Multi-store backend data with different estimates
  const multiStoreBackendData = {
    "store_1001": {
      "demand_forecast": {
        "region": "Dallas North",
        "time_horizon_days": 7,
        "forecasts": {
          "cereal": { "predicted_demand": 93, "confidence": 0.85, "trend": "decreasing" },
          "milk": { "predicted_demand": 280, "confidence": 0.85, "trend": "increasing" },
          "juice": { "predicted_demand": 120, "confidence": 0.85, "trend": "increasing" },
          "bread": { "predicted_demand": 190, "confidence": 0.85, "trend": "increasing" },
          "eggs": { "predicted_demand": 150, "confidence": 0.82, "trend": "stable" },
          "yogurt": { "predicted_demand": 85, "confidence": 0.88, "trend": "decreasing" }
        },
        "total_predicted_demand": 918
      },
      "inventory_recommendations": {
        "cereal": { "current_stock": 100, "recommended_adjustment": -7 },
        "milk": { "current_stock": 300, "recommended_adjustment": 0 },
        "juice": { "current_stock": 100, "recommended_adjustment": 20 },
        "bread": { "current_stock": 200, "recommended_adjustment": -10 },
        "eggs": { "current_stock": 180, "recommended_adjustment": -30 },
        "yogurt": { "current_stock": 90, "recommended_adjustment": -5 }
      }
    },
    "store_1002": {
      "demand_forecast": {
        "region": "Dallas Central",
        "time_horizon_days": 7,
        "forecasts": {
          "cereal": { "predicted_demand": 145, "confidence": 0.91, "trend": "increasing" },
          "milk": { "predicted_demand": 420, "confidence": 0.89, "trend": "increasing" },
          "juice": { "predicted_demand": 180, "confidence": 0.87, "trend": "stable" },
          "bread": { "predicted_demand": 310, "confidence": 0.93, "trend": "increasing" },
          "eggs": { "predicted_demand": 220, "confidence": 0.86, "trend": "increasing" },
          "yogurt": { "predicted_demand": 125, "confidence": 0.84, "trend": "stable" }
        },
        "total_predicted_demand": 1400
      },
      "inventory_recommendations": {
        "cereal": { "current_stock": 120, "recommended_adjustment": 25 },
        "milk": { "current_stock": 400, "recommended_adjustment": 20 },
        "juice": { "current_stock": 180, "recommended_adjustment": 0 },
        "bread": { "current_stock": 280, "recommended_adjustment": 30 },
        "eggs": { "current_stock": 200, "recommended_adjustment": 20 },
        "yogurt": { "current_stock": 130, "recommended_adjustment": -5 }
      }
    },
    "store_1003": {
      "demand_forecast": {
        "region": "Dallas South",
        "time_horizon_days": 7,
        "forecasts": {
          "cereal": { "predicted_demand": 78, "confidence": 0.79, "trend": "decreasing" },
          "milk": { "predicted_demand": 195, "confidence": 0.83, "trend": "stable" },
          "juice": { "predicted_demand": 95, "confidence": 0.81, "trend": "decreasing" },
          "bread": { "predicted_demand": 165, "confidence": 0.86, "trend": "stable" },
          "eggs": { "predicted_demand": 110, "confidence": 0.78, "trend": "decreasing" },
          "yogurt": { "predicted_demand": 65, "confidence": 0.80, "trend": "decreasing" }
        },
        "total_predicted_demand": 708
      },
      "inventory_recommendations": {
        "cereal": { "current_stock": 85, "recommended_adjustment": -7 },
        "milk": { "current_stock": 200, "recommended_adjustment": -5 },
        "juice": { "current_stock": 110, "recommended_adjustment": -15 },
        "bread": { "current_stock": 170, "recommended_adjustment": -5 },
        "eggs": { "current_stock": 130, "recommended_adjustment": -20 },
        "yogurt": { "current_stock": 70, "recommended_adjustment": -5 }
      }
    },
    "store_1004": {
      "demand_forecast": {
        "region": "Dallas East",
        "time_horizon_days": 7,
        "forecasts": {
          "cereal": { "predicted_demand": 210, "confidence": 0.94, "trend": "increasing" },
          "milk": { "predicted_demand": 580, "confidence": 0.92, "trend": "increasing" },
          "juice": { "predicted_demand": 240, "confidence": 0.90, "trend": "increasing" },
          "bread": { "predicted_demand": 380, "confidence": 0.95, "trend": "increasing" },
          "eggs": { "predicted_demand": 290, "confidence": 0.91, "trend": "increasing" },
          "yogurt": { "predicted_demand": 160, "confidence": 0.89, "trend": "increasing" }
        },
        "total_predicted_demand": 1860
      },
      "inventory_recommendations": {
        "cereal": { "current_stock": 150, "recommended_adjustment": 60 },
        "milk": { "current_stock": 450, "recommended_adjustment": 130 },
        "juice": { "current_stock": 180, "recommended_adjustment": 60 },
        "bread": { "current_stock": 300, "recommended_adjustment": 80 },
        "eggs": { "current_stock": 220, "recommended_adjustment": 70 },
        "yogurt": { "current_stock": 140, "recommended_adjustment": 20 }
      }
    },
    "store_1005": {
      "demand_forecast": {
        "region": "Dallas West",
        "time_horizon_days": 7,
        "forecasts": {
          "cereal": { "predicted_demand": 125, "confidence": 0.87, "trend": "stable" },
          "milk": { "predicted_demand": 340, "confidence": 0.88, "trend": "increasing" },
          "juice": { "predicted_demand": 155, "confidence": 0.85, "trend": "stable" },
          "bread": { "predicted_demand": 245, "confidence": 0.90, "trend": "increasing" },
          "eggs": { "predicted_demand": 185, "confidence": 0.84, "trend": "stable" },
          "yogurt": { "predicted_demand": 105, "confidence": 0.86, "trend": "stable" }
        },
        "total_predicted_demand": 1155
      },
      "inventory_recommendations": {
        "cereal": { "current_stock": 130, "recommended_adjustment": -5 },
        "milk": { "current_stock": 350, "recommended_adjustment": -10 },
        "juice": { "current_stock": 160, "recommended_adjustment": -5 },
        "bread": { "current_stock": 250, "recommended_adjustment": -5 },
        "eggs": { "current_stock": 190, "recommended_adjustment": -5 },
        "yogurt": { "current_stock": 110, "recommended_adjustment": -5 }
      }
    },
    "store_1006": {
      "demand_forecast": {
        "region": "Dallas Northwest",
        "time_horizon_days": 7,
        "forecasts": {
          "cereal": { "predicted_demand": 165, "confidence": 0.83, "trend": "increasing" },
          "milk": { "predicted_demand": 385, "confidence": 0.86, "trend": "increasing" },
          "juice": { "predicted_demand": 200, "confidence": 0.82, "trend": "stable" },
          "bread": { "predicted_demand": 285, "confidence": 0.88, "trend": "increasing" },
          "eggs": { "predicted_demand": 215, "confidence": 0.85, "trend": "stable" },
          "yogurt": { "predicted_demand": 135, "confidence": 0.87, "trend": "increasing" }
        },
        "total_predicted_demand": 1385
      },
      "inventory_recommendations": {
        "cereal": { "current_stock": 140, "recommended_adjustment": 25 },
        "milk": { "current_stock": 360, "recommended_adjustment": 25 },
        "juice": { "current_stock": 200, "recommended_adjustment": 0 },
        "bread": { "current_stock": 270, "recommended_adjustment": 15 },
        "eggs": { "current_stock": 210, "recommended_adjustment": 5 },
        "yogurt": { "current_stock": 130, "recommended_adjustment": 5 }
      }
    }
  };

  // Get current store data or aggregate all stores
  const getCurrentStoreData = () => {
    if (selectedStore === 'all') {
      // Aggregate all stores data
      const aggregatedForecasts = {};
      const aggregatedRecommendations = {};
      let totalPredictedDemand = 0;

      Object.values(multiStoreBackendData).forEach(storeData => {
        totalPredictedDemand += storeData.demand_forecast.total_predicted_demand;
        
        Object.entries(storeData.demand_forecast.forecasts).forEach(([product, data]) => {
          if (!aggregatedForecasts[product]) {
            aggregatedForecasts[product] = {
              predicted_demand: 0,
              confidence: 0,
              trend: data.trend,
              count: 0
            };
          }
          aggregatedForecasts[product].predicted_demand += data.predicted_demand;
          aggregatedForecasts[product].confidence += data.confidence;
          aggregatedForecasts[product].count += 1;
        });

        Object.entries(storeData.inventory_recommendations).forEach(([product, data]) => {
          if (!aggregatedRecommendations[product]) {
            aggregatedRecommendations[product] = {
              current_stock: 0,
              recommended_adjustment: 0
            };
          }
          aggregatedRecommendations[product].current_stock += data.current_stock;
          aggregatedRecommendations[product].recommended_adjustment += data.recommended_adjustment;
        });
      });

      // Calculate average confidence
      Object.keys(aggregatedForecasts).forEach(product => {
        aggregatedForecasts[product].confidence = aggregatedForecasts[product].confidence / aggregatedForecasts[product].count;
      });

      return {
        demand_forecast: {
          region: "All Dallas Stores",
          time_horizon_days: 7,
          forecasts: aggregatedForecasts,
          total_predicted_demand: totalPredictedDemand
        },
        inventory_recommendations: aggregatedRecommendations
      };
    } else {
      return multiStoreBackendData[selectedStore] || multiStoreBackendData.store_1001;
    }
  };

  const backendData = getCurrentStoreData();

  // Computed metrics from backend data
  const computedMetrics = {
    totalInventory: Object.values(backendData.inventory_recommendations).reduce((sum, item) => sum + item.current_stock, 0),
    rebalancingActions: Object.values(backendData.inventory_recommendations).filter(item => item.recommended_adjustment !== 0).length,
    efficiencyScore: (() => {
      const totalProducts = Object.keys(backendData.inventory_recommendations).length;
      const optimalProducts = Object.values(backendData.inventory_recommendations).filter(item => Math.abs(item.recommended_adjustment) <= 5).length;
      const avgConfidence = Object.values(backendData.demand_forecast.forecasts).reduce((sum, item) => sum + item.confidence, 0) / Object.values(backendData.demand_forecast.forecasts).length;
      return Math.round((optimalProducts / totalProducts) * avgConfidence * 100);
    })(),
    inventoryVariance: (() => {
      const adjustments = Object.values(backendData.inventory_recommendations).map(item => Math.abs(item.recommended_adjustment));
      const totalAdjustments = adjustments.reduce((sum, adj) => sum + adj, 0);
      const maxPossibleAdjustments = Object.values(backendData.inventory_recommendations).reduce((sum, item) => sum + Math.max(item.current_stock * 0.2, 20), 0);
      return totalAdjustments > 0 ? `${((totalAdjustments / maxPossibleAdjustments) * 100).toFixed(1)}%` : '0%';
    })()
  };

  // Simulated real-time data updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate real-time data changes
      setRealTimeData(prev => ({
        ...prev,
        lastUpdate: Date.now()
      }));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Sample data for store inventory levels (updated with more realistic data)
  const inventoryData = [
    { store: 'Store #1001', current: 970, optimal: 1000, trend: '-3%', status: 'low' },
    { store: 'Store #1002', current: 1310, optimal: 1200, trend: '+9%', status: 'high' },
    { store: 'Store #1003', current: 765, optimal: 800, trend: '-4%', status: 'low' },
    { store: 'Store #1004', current: 1440, optimal: 1500, trend: '-4%', status: 'critical' },
    { store: 'Store #1005', current: 1090, optimal: 1100, trend: '-1%', status: 'optimal' },
    { store: 'Store #1006', current: 1115, optimal: 1150, trend: '-3%', status: 'optimal' }
  ];

  // AI Agent Activity Data (updated with more realistic numbers)
  const agentActivity = [
    { agent: 'Store Demand Agents', active: 6, alerts: 2, efficiency: 89 },
    { agent: 'Warehouse Inventory Agents', active: 18, alerts: 4, efficiency: 94 },
    { agent: 'Logistics Optimization Agents', active: 3, alerts: 1, efficiency: 97 },
    { agent: 'Truck Agents', active: 12, alerts: 3, efficiency: 91 },
    { agent: 'Product Substitution Agents', active: 2, alerts: 0, efficiency: 98 }
  ];

  // Real-time alerts and notifications (updated with store-specific alerts)
  const realtimeAlerts = [
    { id: 1, type: 'critical', message: 'Store #1004: High demand surge detected - inventory critically low', time: '1 min ago', agent: 'SDA-1004' },
    { id: 2, type: 'warning', message: 'Store #1002: Excess inventory detected - redistribution recommended', time: '3 min ago', agent: 'LOA-03' },
    { id: 3, type: 'success', message: 'Store #1005: Optimal inventory levels maintained across all categories', time: '6 min ago', agent: 'WIA-45' },
    { id: 4, type: 'info', message: 'Store #1001: Predictive model suggests increased milk demand next week', time: '8 min ago', agent: 'PSA-02' },
    { id: 5, type: 'warning', message: 'Store #1003: Below-average performance - inventory adjustments needed', time: '12 min ago', agent: 'SDA-1003' }
  ];

  // Demand prediction data (more realistic hourly data)
  const demandPrediction = [
    { hour: '00:00', predicted: 180, actual: 165, confidence: 87 },
    { hour: '04:00', predicted: 120, actual: 135, confidence: 91 },
    { hour: '08:00', predicted: 420, actual: 410, confidence: 94 },
    { hour: '12:00', predicted: 680, actual: 695, confidence: 89 },
    { hour: '16:00', predicted: 750, actual: 720, confidence: 92 },
    { hour: '20:00', predicted: 580, actual: 570, confidence: 88 },
    { hour: '24:00', predicted: 320, actual: null, confidence: 85 }
  ];

  // Product category distribution (updated percentages)
  const categoryData = [
    { name: 'Dairy & Eggs', value: 42, color: '#3B82F6' },
    { name: 'Bakery', value: 28, color: '#10B981' },
    { name: 'Beverages', value: 18, color: '#F59E0B' },
    { name: 'Breakfast & Cereal', value: 12, color: '#EF4444' }
  ];

  // Transform backend data for charts
  const demandForecastData = Object.entries(backendData.demand_forecast.forecasts).map(([product, data]) => ({
    product: product.charAt(0).toUpperCase() + product.slice(1),
    predicted_demand: data.predicted_demand,
    confidence: Math.round(data.confidence * 100),
    trend: data.trend,
    current_stock: backendData.inventory_recommendations[product].current_stock,
    recommended_adjustment: backendData.inventory_recommendations[product].recommended_adjustment
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'low': return 'text-orange-600 bg-orange-50';
      case 'optimal': return 'text-green-600 bg-green-50';
      case 'high': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-orange-500 bg-orange-50';
      case 'success': return 'border-green-500 bg-green-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'decreasing': return <ArrowDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-green-600';
      case 'decreasing': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAdjustmentColor = (adjustment: number) => {
    if (adjustment > 0) return 'text-green-600 bg-green-50';
    if (adjustment < 0) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getAdjustmentIcon = (adjustment: number) => {
    if (adjustment > 0) return <ArrowUp className="w-4 h-4" />;
    if (adjustment < 0) return <ArrowDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getEfficiencyTrend = (score: number) => {
    if (score >= 90) return { text: '+1.2% improvement', color: 'text-green-600' };
    if (score >= 80) return { text: '+0.8% improvement', color: 'text-green-600' };
    if (score >= 70) return { text: '-0.5% decline', color: 'text-red-600' };
    return { text: '-1.2% decline', color: 'text-red-600' };
  };

  const getInventoryTrend = (variance: string) => {
    const numVariance = parseFloat(variance);
    if (numVariance <= 5) return { text: '+2.5% vs target', color: 'text-green-600' };
    if (numVariance <= 10) return { text: '+1.2% vs target', color: 'text-green-600' };
    if (numVariance <= 15) return { text: '-0.8% vs target', color: 'text-red-600' };
    return { text: '-2.1% vs target', color: 'text-red-600' };
  };

  const efficiencyTrend = getEfficiencyTrend(computedMetrics.efficiencyScore);
  const inventoryTrend = getInventoryTrend(computedMetrics.inventoryVariance);

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8 lg:px-16 xl:px-24">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Walmart AI Inventory Management</h1>
            <p className="text-lg text-gray-600">Dynamic Omni-Channel Inventory Rebalancing & Predictive Substitution Network</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Activity className="w-6 h-6 text-green-500" />
              <span className="text-base font-medium text-gray-600">Live</span>
            </div>
            <div className="text-base text-gray-500">
              Last updated: {currentTime.toLocaleTimeString()}
            </div>
            <button className="flex items-center space-x-3 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
              <RefreshCw className="w-5 h-5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <select 
              value={selectedStore} 
              onChange={(e) => setSelectedStore(e.target.value)}
              className="px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
            >
              <option value="all">All Stores</option>
              <option value="store_1001">Store #1001 - Dallas North</option>
              <option value="store_1002">Store #1002 - Dallas Central</option>
              <option value="store_1003">Store #1003 - Dallas South</option>
              <option value="store_1004">Store #1004 - Dallas East</option>
              <option value="store_1005">Store #1005 - Dallas West</option>
              <option value="store_1006">Store #1006 - Dallas Northwest</option>
            </select>
            <select 
              value={selectedTimeframe} 
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <Eye className="w-5 h-5 text-gray-500" />
            <span className="text-base font-medium text-gray-600">Real-time monitoring active</span>
          </div>
        </div>
      </div>

      {/* Key Metrics - Now computed from backend data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-gray-600 mb-2">Total Inventory</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{computedMetrics.totalInventory.toLocaleString()}</p>
              <p className={`text-base font-medium ${inventoryTrend.color}`}>{inventoryTrend.text}</p>
            </div>
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-gray-600 mb-2">Active Agents</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">6</p>
              <p className="text-base text-green-600 font-medium">98.2% operational</p>
            </div>
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-gray-600 mb-2">Rebalancing Actions</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{computedMetrics.rebalancingActions}</p>
              <p className="text-base text-blue-600 font-medium">Products need adjustment</p>
            </div>
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-gray-600 mb-2">Efficiency Score</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{computedMetrics.efficiencyScore}%</p>
              <p className={`text-base font-medium ${efficiencyTrend.color}`}>{efficiencyTrend.text}</p>
            </div>
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Demand Forecasting Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">AI Demand Forecast</h3>
                <p className="text-base text-gray-600">{backendData.demand_forecast.region} - {backendData.demand_forecast.time_horizon_days} days</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{backendData.demand_forecast.total_predicted_demand}</p>
              <p className="text-base text-gray-600 font-medium">Total Demand</p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={demandForecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip contentStyle={{ fontSize: '14px' }} />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Bar dataKey="predicted_demand" fill="#8B5CF6" name="Predicted Demand" />
              <Bar dataKey="current_stock" fill="#E5E7EB" name="Current Stock" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Inventory Recommendations</h3>
              <p className="text-base text-gray-600">AI-powered stock adjustments</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {demandForecastData.map((item, index) => (
              <div key={index} className="p-5 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-lg font-bold text-gray-900">{item.product}</h4>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(item.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                        {item.trend}
                      </span>
                    </div>
                  </div>
                  <span className="text-base font-medium text-gray-600">{item.confidence}% confidence</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Current Stock</p>
                    <p className="text-lg font-bold text-gray-900">{item.current_stock}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Predicted Demand</p>
                    <p className="text-lg font-bold text-gray-900">{item.predicted_demand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Adjustment</p>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold ${getAdjustmentColor(item.recommended_adjustment)}`}>
                        {getAdjustmentIcon(item.recommended_adjustment)}
                        <span>{Math.abs(item.recommended_adjustment)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Store Inventory Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Store Inventory Levels</h3>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-base font-medium text-gray-600">Real-time data</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="store" tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip contentStyle={{ fontSize: '14px' }} />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Bar dataKey="current" fill="#3B82F6" name="Current Stock" />
              <Bar dataKey="optimal" fill="#E5E7EB" name="Optimal Level" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Inventory Categories</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: '14px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-3">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between text-base">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: category.color }}></div>
                  <span className="text-gray-600 font-medium">{category.name}</span>
                </div>
                <span className="font-bold text-gray-900">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Agent Activity & Real-time Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">AI Agent Activity</h3>
          <div className="space-y-5">
            {agentActivity.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-bold text-gray-900 text-base mb-1">{agent.agent}</p>
                  <p className="text-base text-gray-600">{agent.active} active • {agent.alerts} alerts</p>
                </div>
                
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Real-time Alerts</h3>
            <span className="text-base text-gray-500 font-medium">{realtimeAlerts.length} active</span>
          </div>
          <div className="space-y-4 overflow-y-auto">
            {realtimeAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 border-l-4 rounded-xl ${getAlertColor(alert.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-base font-semibold text-gray-900 mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500 font-medium">{alert.agent}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500 font-medium">{alert.time}</span>
                    </div>
                  </div>
                  {alert.type === 'critical' && <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demand Prediction */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Demand Prediction vs Actual</h3>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={demandPrediction}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" tick={{ fontSize: 14 }} />
            <YAxis tick={{ fontSize: 14 }} />
            <Tooltip contentStyle={{ fontSize: '14px' }} />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
            <Area type="monotone" dataKey="predicted" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Predicted" />
            <Area type="monotone" dataKey="actual" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Actual" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Store Status Table */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Store Status Overview</h3>
          <button className="flex items-center space-x-3 px-4 py-2 text-base bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium">
            <Settings className="w-5 h-5" />
            <span>Configure</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-5 font-bold text-gray-900 text-base">Store</th>
                <th className="text-left py-4 px-5 font-bold text-gray-900 text-base">Current Stock</th>
                <th className="text-left py-4 px-5 font-bold text-gray-900 text-base">Optimal Level</th>
                <th className="text-left py-4 px-5 font-bold text-gray-900 text-base">Trend</th>
                <th className="text-left py-4 px-5 font-bold text-gray-900 text-base">Status</th>
                <th className="text-left py-4 px-5 font-bold text-gray-900 text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-5">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="font-bold text-base text-gray-900">{row.store}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-base font-semibold text-gray-900">{row.current.toLocaleString()}</td>
                  <td className="py-4 px-5 text-base font-semibold text-gray-900">{row.optimal.toLocaleString()}</td>
                  <td className="py-4 px-5">
                    <span className={`text-base font-bold ${row.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {row.trend}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`px-3 py-2 rounded-full text-sm font-bold ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center space-x-3">
                      {row.status === 'critical' && (
                        <button className="flex items-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 font-medium">
                          <Truck className="w-4 h-4" />
                          <span>Rebalance</span>
                        </button>
                      )}
                      {row.status === 'high' && (
                        <button className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 font-medium">
                          <TrendingUp className="w-4 h-4" />
                          <span>Redistribute</span>
                        </button>
                      )}
                      {row.status === 'low' && (
                        <button className="flex items-center space-x-2 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 font-medium">
                          <Package className="w-4 h-4" />
                          <span>Restock</span>
                        </button>
                      )}
                      {row.status === 'optimal' && (
                        <button className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 font-medium">
                          <CheckCircle className="w-4 h-4" />
                          <span>Monitor</span>
                        </button>
                      )}
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
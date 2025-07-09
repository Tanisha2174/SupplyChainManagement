import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Truck, Navigation, Play, Pause, RotateCcw, Share2, MapPin, Zap, CheckCircle, Target } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Types
interface Warehouse {
  id: number;
  name: string;
  lat: number;
  lng: number;
  type: 'Distribution Center' | 'Store';
  inventory: number;
}

interface Waypoint {
  lat: number;
  lng: number;
  name: string;
}

interface OptimizedRoute {
  waypoints: Waypoint[];
  distance: number;
  timeEstimate: string;
  fuelSavings: number;
  co2Reduction: number;
}

interface SelectedLocations {
  start: Warehouse | null;
  location1: Warehouse | null;
  location2: Warehouse | null;
}

interface SimulationStats {
  totalDistance: number;
  fuelSaved: number;
  co2Reduced: number;
  timeEstimate: string;
}

interface MovingTruckProps {
  route: OptimizedRoute | null;
  isActive: boolean;
  onComplete: () => void;
}

type LocationType = 'start' | 'location1' | 'location2';

// Custom icons
const createLocationIcon = (color: string, number: string): L.DivIcon => new L.DivIcon({
  html: `<div style="background: ${color}; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-weight: bold; color: white; font-size: 16px;">${number}</div>`,
  className: 'custom-location-icon',
  iconSize: [35, 35],
  iconAnchor: [17, 17]
});

const createTruckIcon = (color: string = '#0071ce'): L.DivIcon => new L.DivIcon({
  html: `<div style="background: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.2);"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M3 17h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-3l-3-6H3v9zm15-8l1.5 3H17V9h1zM8 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg></div>`,
  className: 'custom-truck-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

// Animation component for moving truck
const MovingTruck: React.FC<MovingTruckProps> = ({ route, isActive, onComplete }) => {
  const map = useMap();
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && route?.waypoints && route.waypoints.length > 1) {
      setCurrentPosition(0);
      intervalRef.current = setInterval(() => {
        setCurrentPosition(prev => {
          const next = prev + 0.015;
          if (next >= route.waypoints.length - 1) {
            onComplete();
            return route.waypoints.length - 1;
          }
          return next;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, route, onComplete]);

  const getInterpolatedPosition = (): Waypoint => {
    if (!route?.waypoints || route.waypoints.length < 2) {
      return route?.waypoints?.[0] || { lat: 32.7767, lng: -96.7970, name: 'Default' };
    }
    
    const index = Math.floor(currentPosition);
    const fraction = currentPosition - index;
    
    if (index >= route.waypoints.length - 1) {
      return route.waypoints[route.waypoints.length - 1];
    }
    
    const current = route.waypoints[index];
    const next = route.waypoints[index + 1];
    
    return {
      lat: current.lat + (next.lat - current.lat) * fraction,
      lng: current.lng + (next.lng - current.lng) * fraction,
      name: current.name
    };
  };

  if (!isActive || !route?.waypoints) return null;

  const position = getInterpolatedPosition();
  
  return (
    <Marker
      position={[position.lat, position.lng]}
      icon={createTruckIcon('#ef4444')}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-bold text-gray-800">Truck T001</h3>
          <p className="text-sm text-gray-600">Driver: John Smith</p>
          <p className="text-sm text-gray-600">Status: En Route</p>
        </div>
      </Popup>
    </Marker>
  );
};

const RoutingDashBoard: React.FC = () => {
  const [warehouses] = useState<Warehouse[]>([
    {
      id: 1,
      name: "Dallas Distribution Center",
      lat: 32.7767,
      lng: -96.797,
      type: "Distribution Center",
      inventory: 2100
    },
    {
      id: 2,
      name: "Houston Distribution Center",
      lat: 29.7604,
      lng: -95.3698,
      type: "Distribution Center",
      inventory: 1890
    },
    {
      id: 3,
      name: "Austin Distribution Center",
      lat: 30.2672,
      lng: -97.7431,
      type: "Distribution Center",
      inventory: 1650
    },
    {
      id: 4,
      name: "Fort Worth Store",
      lat: 32.7555,
      lng: -97.3308,
      type: "Store",
      inventory: 450
    },
    {
      id: 5,
      name: "San Antonio Store",
      lat: 29.4241,
      lng: -98.4936,
      type: "Store",
      inventory: 380
    },
    {
      id: 6,
      name: "Plano Store",
      lat: 33.0198,
      lng: -96.6989,
      type: "Store",
      inventory: 290
    },
    {
      id: 7,
      name: "Arlington Store",
      lat: 32.7357,
      lng: -97.1081,
      type: "Store",
      inventory: 320
    },
    {
      id: 8,
      name: "McKinney Store",
      lat: 33.1972,
      lng: -96.6397,
      type: "Store",
      inventory: 280
    }
  ]);

  const [selectedLocations, setSelectedLocations] = useState<SelectedLocations>({
    start: null,
    location1: null,
    location2: null
  });

  const [optimizedRoute, setOptimizedRoute] = useState<OptimizedRoute | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [simulationStats, setSimulationStats] = useState<SimulationStats>({
    totalDistance: 0,
    fuelSaved: 0,
    co2Reduced: 0,
    timeEstimate: ''
  });

  const handleLocationSelect = (type: LocationType, warehouseId: string): void => {
    const warehouse = warehouses.find(w => w.id === parseInt(warehouseId));
    if (warehouse) {
      setSelectedLocations(prev => ({
        ...prev,
        [type]: warehouse
      }));
    }
    setOptimizedRoute(null);
  };

  const getSelectedLocationsList = (): Warehouse[] => {
    return Object.values(selectedLocations).filter((loc): loc is Warehouse => loc !== null);
  };

  const generateRoute = async (): Promise<void> => {
    const locations = getSelectedLocationsList();
    if (locations.length < 2) return;

    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create optimized route
      const route: OptimizedRoute = {
        waypoints: locations.map(loc => ({ lat: loc.lat, lng: loc.lng, name: loc.name })),
        distance: Math.round(Math.random() * 80 + 20),
        timeEstimate: `${Math.floor(Math.random() * 3 + 1)}h ${Math.floor(Math.random() * 60)}m`,
        fuelSavings: Math.round((Math.random() * 8 + 5) * 10) / 10,
        co2Reduction: Math.round(Math.random() * 25 + 15)
      };
      
      setOptimizedRoute(route);
    } catch (error) {
      console.error('Error generating route:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startSimulation = (): void => {
    if (optimizedRoute) {
      setIsSimulating(true);
    }
  };

  const stopSimulation = (): void => {
    setIsSimulating(false);
  };

  const onRouteComplete = (): void => {
    setIsSimulating(false);
    if (optimizedRoute) {
      setSimulationStats({
        totalDistance: optimizedRoute.distance,
        fuelSaved: optimizedRoute.fuelSavings,
        co2Reduced: optimizedRoute.co2Reduction,
        timeEstimate: optimizedRoute.timeEstimate
      });
    }
  };

  const resetAll = (): void => {
    setSelectedLocations({
      start: null,
      location1: null,
      location2: null
    });
    setOptimizedRoute(null);
    setIsSimulating(false);
    setSimulationStats({
      totalDistance: 0,
      fuelSaved: 0,
      co2Reduced: 0,
      timeEstimate: ''
    });
  };

  const shareRoute = (): void => {
    if (optimizedRoute) {
      const googleMapsUrl = `https://www.google.com/maps/dir/${optimizedRoute.waypoints.map(w => `${w.lat},${w.lng}`).join('/')}`;
      navigator.clipboard.writeText(googleMapsUrl);
      alert('Route URL copied to clipboard!');
    }
  };

  const getLocationColor = (type: LocationType): string => {
    switch(type) {
      case 'start': return '#10b981'; // Green
      case 'location1': return '#3b82f6'; // Blue  
      case 'location2': return '#f59e0b'; // Orange
      default: return '#6b7280'; // Gray
    }
  };

  const getLocationNumber = (type: LocationType): string => {
    switch(type) {
      case 'start': return '1';
      case 'location1': return '2';
      case 'location2': return '3';
      default: return '';
    }
  };

  const selectedLocationIds: number[] = Object.values(selectedLocations)
    .filter((loc): loc is Warehouse => loc !== null)
    .map(loc => loc.id);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-yellow-500">Walmart</h1>
              <p className="text-sm text-gray-600">Route Optimizer</p>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Location Selection */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-500" />
              Select Locations
            </h3>
            
            {/* Start Location */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-green-600">
                <span className="inline-flex items-center">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 shadow-md">1</span>
                  Start Location
                </span>
              </label>
              <select
                value={selectedLocations.start?.id || ''}
                onChange={(e) => handleLocationSelect('start', e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              >
                <option value="">Choose start location...</option>
                {warehouses.map(warehouse => (
                  <option 
                    key={warehouse.id} 
                    value={warehouse.id}
                    disabled={selectedLocationIds.includes(warehouse.id)}
                  >
                    {warehouse.name} ({warehouse.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Location 1 */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-blue-600">
                <span className="inline-flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 shadow-md">2</span>
                  Second Location
                </span>
              </label>
              <select
                value={selectedLocations.location1?.id || ''}
                onChange={(e) => handleLocationSelect('location1', e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="">Choose second location...</option>
                {warehouses.map(warehouse => (
                  <option 
                    key={warehouse.id} 
                    value={warehouse.id}
                    disabled={selectedLocationIds.includes(warehouse.id)}
                  >
                    {warehouse.name} ({warehouse.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Location 2 */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-orange-600">
                <span className="inline-flex items-center">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 shadow-md">3</span>
                  Third Location (Optional)
                </span>
              </label>
              <select
                value={selectedLocations.location2?.id || ''}
                onChange={(e) => handleLocationSelect('location2', e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              >
                <option value="">Choose third location...</option>
                {warehouses.map(warehouse => (
                  <option 
                    key={warehouse.id} 
                    value={warehouse.id}
                    disabled={selectedLocationIds.includes(warehouse.id)}
                  >
                    {warehouse.name} ({warehouse.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Generate Route Button */}
            <button
              onClick={generateRoute}
              disabled={getSelectedLocationsList().length < 2 || isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg disabled:shadow-none"
            >
              <Navigation className="w-5 h-5" />
              <span>{isLoading ? 'Optimizing Route...' : 'Generate Optimized Route'}</span>
            </button>
          </div>

          {/* Route Details */}
          {optimizedRoute && (
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <Navigation className="w-5 h-5 mr-2 text-blue-500" />
                Route Details
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg mb-4 border border-gray-200">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Distance</div>
                    <div className="text-lg font-bold text-blue-600">{optimizedRoute.distance} mi</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Est. Time</div>
                    <div className="text-lg font-bold text-yellow-600">{optimizedRoute.timeEstimate}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Fuel Saved</div>
                    <div className="text-lg font-bold text-green-600">{optimizedRoute.fuelSavings}%</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">CO2 Reduced</div>
                    <div className="text-lg font-bold text-green-600">{optimizedRoute.co2Reduction}kg</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={startSimulation}
                    disabled={isSimulating}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-3 py-2 rounded-lg font-medium flex items-center justify-center space-x-1 transition-all duration-200 shadow-md disabled:shadow-none"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start</span>
                  </button>
                  <button
                    onClick={stopSimulation}
                    disabled={!isSimulating}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-3 py-2 rounded-lg font-medium flex items-center justify-center space-x-1 transition-all duration-200 shadow-md disabled:shadow-none"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Stop</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Simulation Results */}
          {simulationStats.totalDistance > 0 && (
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                Results
              </h3>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 mr-2" />
                    Route Completed!
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Delivered successfully with optimized efficiency
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-green-200">
                    <div className="text-sm text-gray-700">
                      Saved <span className="font-bold text-green-600">{simulationStats.fuelSaved}%</span> fuel • 
                      Reduced <span className="font-bold text-green-600">{simulationStats.co2Reduced}kg</span> CO2
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controls - Fixed at bottom */}
        <div className="p-6 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex space-x-2">
            <button
              onClick={resetAll}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-3 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={shareRoute}
              disabled={!optimizedRoute}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-3 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 shadow-md disabled:shadow-none"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={[31.5, -97.5]}
          zoom={7}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Show only selected locations on map */}
          {Object.entries(selectedLocations).map(([type, location]) => {
            if (!location) return null;
            return (
              <Marker
                key={`${type}-${location.id}`}
                position={[location.lat, location.lng]}
                icon={createLocationIcon(getLocationColor(type as LocationType), getLocationNumber(type as LocationType))}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-gray-800">{location.name}</h3>
                    <p className="text-sm text-gray-600">Type: {location.type}</p>
                    <p className="text-sm text-gray-600">Inventory: {location.inventory} units</p>
                    <p className="text-sm font-medium" style={{color: getLocationColor(type as LocationType)}}>
                      Position {getLocationNumber(type as LocationType)} in route
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Route polyline */}
          {optimizedRoute && (
            <Polyline
              positions={optimizedRoute.waypoints.map(w => [w.lat, w.lng])}
              color="#0071ce"
              weight={4}
              opacity={0.8}
              dashArray="10, 5"
            />
          )}

          {/* Moving truck */}
          {optimizedRoute && (
            <MovingTruck
              route={optimizedRoute}
              isActive={isSimulating}
              onComplete={onRouteComplete}
            />
          )}
        </MapContainer>

        {/* Status overlay */}
        {isSimulating && optimizedRoute && (
          <div className="absolute top-4 right-4 bg-white p-4 rounded-lg z-10 border border-gray-200 shadow-xl">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-800">Live Tracking</span>
            </div>
            <div className="text-xs text-gray-600">
              Distance: {optimizedRoute.distance} miles<br/>
              Truck: T001 (John Smith)<br/>
              Status: En Route
            </div>
          </div>
        )}

        {/* Instructions overlay */}
        {getSelectedLocationsList().length === 0 && (
          <div className="absolute top-4 left-4 bg-white p-4 rounded-lg z-10 border border-gray-200 shadow-xl">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-800">Quick Start</span>
            </div>
            <div className="text-xs text-gray-600">
              1. Select start location<br/>
              2. Choose second location<br/>
              3. Optionally add third location<br/>
              4. Generate route and simulate
            </div>
          </div>
        )}

        {/* Route info overlay */}
        {optimizedRoute && !isSimulating && (
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg z-10 border border-gray-200 shadow-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-800">Route Ready</span>
            </div>
            <div className="text-xs text-gray-600">
              {optimizedRoute.waypoints.length} stops • {optimizedRoute.distance} miles<br/>
              Click "Start" to begin simulation
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutingDashBoard;
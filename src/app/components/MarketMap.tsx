import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Droplet, Church } from "lucide-react";
import { Shop } from "../types/market";

interface MarketMapProps {
  shops: Shop[];
  activeCategory: string | null;
  userLocation: { x: number; y: number };
  selectedShop: Shop | null;
  navigationPath: { x: number; y: number }[] | null;
  onShopClick: (shop: Shop) => void;
  distance?: number;
}

export function MarketMap({
  shops,
  activeCategory,
  userLocation,
  selectedShop,
  navigationPath,
  onShopClick,
  distance,
}: MarketMapProps) {
  const [dragConstraints, setDragConstraints] = useState({ top: 0, left: 0, right: 0, bottom: 0 });
  
  const filteredShops = activeCategory
    ? shops.filter((shop) => shop.category === activeCategory)
    : shops;

  return (
    <div className="relative w-full h-full bg-[#f5f5f0] rounded-2xl overflow-hidden">
      {/* Draggable Map Container */}
      <motion.div
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        dragMomentum={false}
        className="absolute inset-0"
        style={{ cursor: "grab" }}
        whileDrag={{ cursor: "grabbing" }}
      >
        {/* Map Background - Market Layout */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 390 600">
          {/* Main pathways */}
          <path
            d="M 50 0 L 50 600"
            stroke="#e5e5d8"
            strokeWidth="30"
            fill="none"
          />
          <path
            d="M 340 0 L 340 600"
            stroke="#e5e5d8"
            strokeWidth="30"
            fill="none"
          />
          <path
            d="M 0 200 L 390 200"
            stroke="#e5e5d8"
            strokeWidth="30"
            fill="none"
          />
          <path
            d="M 0 400 L 390 400"
            stroke="#e5e5d8"
            strokeWidth="30"
            fill="none"
          />

          {/* Secondary pathways */}
          <path
            d="M 195 0 L 195 600"
            stroke="#e5e5d8"
            strokeWidth="20"
            fill="none"
          />
          <path
            d="M 0 300 L 390 300"
            stroke="#e5e5d8"
            strokeWidth="20"
            fill="none"
          />

          {/* Navigation path */}
          {navigationPath && navigationPath.length > 1 && (
            <motion.path
              d={`M ${navigationPath.map((p) => `${p.x} ${p.y}`).join(" L ")}`}
              stroke="#3b82f6"
              strokeWidth="3"
              strokeDasharray="8 4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          )}
        </svg>

        {/* Entrance A - Enhanced */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-full shadow-lg border-2 border-white">
          <span className="text-sm font-bold text-white">🚪 ทางเข้า A</span>
        </div>

        {/* Entrance B - Enhanced */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-full shadow-lg border-2 border-white">
          <span className="text-sm font-bold text-white">🚪 ทางเข้า B</span>
        </div>

        {/* Distance Badge */}
        {distance && distance > 0 && (
          <motion.div
            className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg border-2 border-white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 fill-white" />
              <span className="text-sm font-bold">{distance.toFixed(0)} เมตร</span>
            </div>
          </motion.div>
        )}

        {/* Toilet */}
        <div className="absolute top-24 left-8 bg-blue-50 p-2 rounded-lg shadow-sm">
          <Droplet className="w-4 h-4 text-blue-600" />
        </div>

        {/* Prayer Room */}
        <div className="absolute bottom-32 right-8 bg-purple-50 p-2 rounded-lg shadow-sm">
          <Church className="w-4 h-4 text-purple-600" />
        </div>

        {/* Shop Pins */}
        {filteredShops.map((shop) => (
          <motion.button
            key={shop.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${shop.position.x}px`,
              top: `${shop.position.y}px`,
            }}
            onClick={() => onShopClick(shop)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{
              scale: selectedShop?.id === shop.id ? 1.3 : 1,
              opacity: activeCategory && shop.category !== activeCategory ? 0.3 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center">
              {/* Pin Icon */}
              <div
                className="relative"
                style={{
                  filter:
                    selectedShop?.id === shop.id
                      ? "drop-shadow(0 4px 6px rgba(0,0,0,0.2))"
                      : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                }}
              >
                <MapPin
                  className="w-7 h-7"
                  fill={shop.color}
                  stroke="white"
                  strokeWidth={1.5}
                />
              </div>
              
              {/* Shop Name Label */}
              <motion.div
                className="mt-1 bg-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  fontSize: "9px",
                  maxWidth: "80px",
                }}
              >
                <span className="text-gray-800 font-medium block truncate">
                  {shop.name}
                </span>
              </motion.div>
            </div>
          </motion.button>
        ))}

        {/* User Location */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${userLocation.x}px`,
            top: `${userLocation.y}px`,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 rounded-full opacity-30 blur-sm w-6 h-6 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
            <Navigation className="w-6 h-6 text-blue-600 fill-blue-500" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

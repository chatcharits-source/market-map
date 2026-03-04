import { motion, AnimatePresence } from "motion/react";
import { X, Navigation, MapPin, Phone } from "lucide-react";
import { Shop } from "../types/market";

interface ShopBottomSheetProps {
  shop: Shop | null;
  onClose: () => void;
  onNavigate: (shop: Shop) => void;
}

export function ShopBottomSheet({
  shop,
  onClose,
  onNavigate,
}: ShopBottomSheetProps) {
  return (
    <AnimatePresence>
      {shop && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/20 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 mx-auto"
            style={{ maxWidth: "390px" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            <div className="px-6 pb-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Shop Image */}
              <div className="mt-2 mb-4">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-40 object-cover rounded-2xl"
                />
              </div>

              {/* Shop Info */}
              <div className="flex items-start gap-3 mb-3">
                <MapPin
                  className="w-6 h-6 flex-shrink-0 mt-1"
                  fill={shop.color}
                  stroke="white"
                  strokeWidth={1.5}
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {shop.name}
                  </h3>
                  <p
                    className="text-sm font-medium mt-1"
                    style={{ color: shop.color }}
                  >
                    {shop.categoryName}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {shop.description}
              </p>

              {/* Phone Number */}
              {shop.phone && (
                <a
                  href={`tel:${shop.phone}`}
                  className="flex items-center gap-2 mb-5 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">{shop.phone}</span>
                </a>
              )}

              {/* Navigate Button */}
              <button
                onClick={() => onNavigate(shop)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Navigation className="w-5 h-5 fill-white" />
                <span className="font-medium">นำทางไปยังร้าน</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
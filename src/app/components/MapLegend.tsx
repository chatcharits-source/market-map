import { Category } from "../types/market";
import { MapPin } from "lucide-react";

interface MapLegendProps {
  categories: Category[];
}

export function MapLegend({ categories }: MapLegendProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        คำอธิบาย
      </h4>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-2">
            <MapPin
              className="w-4 h-4 flex-shrink-0"
              fill={category.color}
              stroke="white"
              strokeWidth={1.5}
            />
            <span className="text-sm text-gray-700">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

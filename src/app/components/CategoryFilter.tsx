import { motion } from "motion/react";
import { Category } from "../types/market";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryClick: (categoryId: string | null) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryClick,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() =>
            onCategoryClick(activeCategory === category.id ? null : category.id)
          }
          className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all"
          style={{
            backgroundColor:
              activeCategory === category.id ? category.color : "#ffffff",
            color: activeCategory === category.id ? "#ffffff" : "#374151",
            boxShadow:
              activeCategory === category.id
                ? "0 4px 6px rgba(0,0,0,0.1)"
                : "0 2px 4px rgba(0,0,0,0.05)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg">{category.icon}</span>
          <span className="text-sm font-medium">{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
}

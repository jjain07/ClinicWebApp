import React, { useState, useMemo, useCallback } from 'react';
 import { ChevronDown, ChevronRight, LayoutDashboard, ShoppingBag, BarChart2, Laptop, Smartphone, Shirt, LineChart, DollarSign } from 'lucide-react';

// // --- Mock Data simulating the SQL Table result ---
// // id, menuname, parentMenuId
// const rawMenuData = [
//   { id: 1, menuname: "Dashboard", parentMenuId: null, icon: LayoutDashboard },
//   { id: 2, menuname: "Products", parentMenuId: null, icon: ShoppingBag },
//   { id: 3, menuname: "Analytics", parentMenuId: null, icon: BarChart2 },
//   // Level 2
//   { id: 4, menuname: "Electronics", parentMenuId: 2, icon: Laptop },
//   { id: 5, menuname: "Clothing", parentMenuId: 2, icon: Shirt },
//   { id: 9, menuname: "Reports", parentMenuId: 3, icon: LineChart },
//   { id: 10, menuname: "Financials", parentMenuId: 3, icon: DollarSign },
//   // Level 3
//   { id: 6, menuname: "Smartphones", parentMenuId: 4, icon: Smartphone },
//   { id: 7, menuname: "Laptops & PCs", parentMenuId: 4, icon: Laptop },
//   // Level 4
//   { id: 11, menuname: "Luxury", parentMenuId: 5, icon: Shirt },
//   { id: 12, menuname: "Casual Wear", parentMenuId: 5, icon: Shirt },
// ];

 

// --- Recursive Menu Item Component ---
const MenuItem = ({ item, level = 0, onClick }) => {
   
  const hasChildren = item.children && item.children.length > 0;
  const [isOpen, setIsOpen] = useState(false);

  const paddingLeft = hasChildren ? level * 5 + 4 : level * 5 + 4;

  const toggleOpen = useCallback(() => {
    if (hasChildren) {
      setIsOpen(prev => !prev);
    } else if (onClick) {
      // Call onClick for leaf items (no children)
      onClick(item.id);
    }
  }, [hasChildren, onClick, item.id]);

  const Icon = item.icon;
  const ChevronIcon = isOpen ? ChevronDown : ChevronRight;

  return (
    <li className="select-none">
      {/* Menu Item Link/Header */}
      <div
        className={`flex items-center w-full p-2.5 text-sm font-medium transition-all duration-200 cursor-pointer rounded-lg
          ${level === 0 ? 'mt-1 text-[#5B1A13] hover:bg-[#f5e3b3]' : 'text-[#5B1A13] hover:bg-[#f5e3b3]'}
          ${isOpen && hasChildren ? 'bg-[#b8860b] text-white' : ''}`}
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={() => {
          if (hasChildren) {
            setIsOpen(prev => !prev);
          } else if (onClick) {
            onClick(item);
          }
        }}
      >
        <div className="flex items-center flex-grow">
          {Icon && <Icon className="w-5 h-5 mr-3" />}
          <span className="truncate">{item.procedureName}</span>
        </div>
        {/* Chevron Icon for Submenus */}
        {hasChildren && (
          <ChevronIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-0' : 'transform rotate-0'}`} />
        )}
      </div>

      {/* Submenu List */}
      {hasChildren && (
        <ul
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}
          `}
        >
          {item.children.map(child => (
            <MenuItem key={child.id} item={child} level={level + 1} onClick={onClick} />
          ))}
        </ul>
      )}
    </li>
  );
}
export default MenuItem
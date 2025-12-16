import React, { useState, useMemo, useCallback } from 'react';
 import { ChevronDown, ChevronRight, LayoutDashboard, ShoppingBag, BarChart2, Laptop, Smartphone, Shirt, LineChart, DollarSign } from 'lucide-react';

 import { convertToTree } from '../../services/utility';
 import MenuItem from '../../component/MenuItem';
 import {
  getAllProcedures} from "../../services/dbservice";

 

 const rawMenuData =  await getAllProcedures();
 console.log("Fetched Procedures:", rawMenuData.data);
 
 

// --- Recursive Menu Item Component ---
const BlogEditorCopy = () => {
   
  const [isOpen, setIsOpen] = useState(false);

  
  
    const treeData = useMemo(() => convertToTree(rawMenuData.data), []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  return (
     <div className="p-6 bg-[#FDF3C4]">
      <div className="container mx-auto">
        <div className="h-32 md:h-40" />
        <div className="min-h-screen bg-[#FDF3C4] flex flex-col md:flex-row">

       <aside className={`md:w-1/4 w-full bg-[#FDF3C4] shadow-lg border-r-2 border-[#b8860b] p-6 ${isSidebarOpen ? 'w-64' : 'w-0 sm:w-20'} overflow-y-auto`}>
        <div className="p-4 flex justify-between items-center h-16 border-b border-[#b8860b]">
          <h1 className={`text-xl font-bold text-[#800000] truncate ${!isSidebarOpen && 'hidden sm:block'}`}>
            App Menu
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className={`w-full text-left px-4 py-2 rounded transition font-semibold bg-[#b8860b] text-white hover:bg-[#a07609]`}>
            {isSidebarOpen ? <span className="w-5 h-5" /> : <span className="w-5 h-5" />}
          </button>
        </div>

         
          {isSidebarOpen ? (
            <ul className="space-y-1">
              {treeData.map(item => (
                <MenuItem key={item.id} item={item} />
              ))}
            </ul>
          ) : (
             <div className='text-center text-sm text-[#5B1A13] mt-4 sm:hidden'>
                Menu Hidden
             </div>
          )}
       
      </aside>
      </div>
      </div>
    </div>  
      
  );
}
export default BlogEditorCopy;
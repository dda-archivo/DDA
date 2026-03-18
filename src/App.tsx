/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ArchiveExplorer from "./components/ArchiveExplorer";
import ItemDetail from "./components/ItemDetail";
import ItemForm from "./components/ItemForm";
import { mockItems } from "./mockData";
import { ArchivalItem } from "./types";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [selectedItem, setSelectedItem] = useState<ArchivalItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [items, setItems] = useState<ArchivalItem[]>(mockItems);

  const handleSaveNewItem = (newItem: Partial<ArchivalItem>) => {
    const item: ArchivalItem = {
      ...newItem,
      id: `NEW-${Date.now()}`,
      identificacion: {
        ...newItem.identificacion!,
      },
      contexto: { ...newItem.contexto! },
      contenido: { ...newItem.contenido! },
      tecnica: { ...newItem.tecnica! },
      acceso: { ...newItem.acceso! },
      control: { ...newItem.control! },
    } as ArchivalItem;

    setItems([item, ...items]);
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-zinc-900">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <AnimatePresence mode="wait">
            {isCreating ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col"
              >
                <ItemForm 
                  onBack={() => setIsCreating(false)} 
                  onSave={handleSaveNewItem}
                />
              </motion.div>
            ) : !selectedItem ? (
              <motion.div
                key="explorer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col"
              >
                <ArchiveExplorer 
                  items={items} 
                  onSelectItem={(item) => setSelectedItem(item)} 
                  onAddNewItem={() => setIsCreating(true)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col"
              >
                <ItemDetail 
                  item={selectedItem} 
                  onBack={() => setSelectedItem(null)} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

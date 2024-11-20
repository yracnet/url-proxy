import React, { useState } from "react";
import { DataGridExample } from "./dataGrid";

export const PanelAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Datos de ejemplo para la tabla
  const data = [
    { id: 1, name: "Item 1", description: "Descripción 1" },
    { id: 2, name: "Item 2", description: "Descripción 2" },
    { id: 3, name: "Item 3", description: "Descripción 3" },
  ];

  // Toggle Sidebar visibility
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <DataGridExample />
    </div>
  );
};

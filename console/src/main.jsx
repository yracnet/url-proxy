import React from "react";
import { createRoot } from "react-dom/client";
import { PanelAdmin } from "./panelAdmin1";
const AppExample = () => {
  return <PanelAdmin />;
};
createRoot(document.getElementById("root")).render(<AppExample />);

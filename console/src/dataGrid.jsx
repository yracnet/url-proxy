import React, { useState } from "react";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { COLS, LOG } from "./request";

export const DataGridExample = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowsSelected = ({ row }) => {
    setSelectedRow(row);
  };

  return (
    <div style={{ height: 300, width: 800 }}>
      <DataGrid
        columns={COLS}
        rows={LOG}
        minHeight={300}
        headerRowHeight={25}
        rowHeight={20}
        defaultColumnOptions={{
          sortable: true,
          resizable: true,
        }}
        style={{
          fontFamily: "monospace",
          fontSize: "12px",
        }}
        onCellClick={handleRowsSelected}
        selectedRows={selectedRow}
      />
      <code>{JSON.stringify(selectedRow)}</code>
    </div>
  );
};

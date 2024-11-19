import React, { useState } from "react";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { COLS, LOG } from "./request";

const MyDataGrid = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowsSelected = ({ row }) => {
    console.log(">>>>", row);
    setSelectedRows((prev) => [...prev, row.id]);
    //setSelectedRows(rows.map((row) => row.id));
  };

  const handleRowsDeselected = (rows) => {
    setSelectedRows(
      selectedRows.filter((id) => !LOG.map((row) => row.rowIdx).includes(id))
    );
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
        selectedRows={selectedRows}
        onSelectedRowsChange={handleRowsSelected}
        onRowsChange={handleRowsDeselected}
      />
      <code>{JSON.stringify({ selectedRows })}</code>
    </div>
  );
};

export default MyDataGrid;

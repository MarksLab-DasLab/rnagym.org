// Test substitutions page

import React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import Papa from "papaparse";
import { Table, Select } from "@mantine/core";
import { TableVirtuoso } from "react-virtuoso";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import "./css/Benchmarks.css";

const BACKGROUND_HEADER_COLOR = "#b4ddef";
const TEXT_COLOR = "#000000";

// RNAGym: keep mapping small; only used in the empty-state line
const cleanNames = {
  zero_shot: "Zero Shot",
  fitness: "Fitness",
  secondary_structure: "Secondary Structure",
  tertiary_structure: "Tertiary Structure",
};

const DATASET_PATHS = {
  fitness: "/data/aggregate_zero_shot_fitness_data.csv",
  secondary_structure: "/data/aggregate_zero_shot_secondary_structure_data.csv",
  tertiary_structure: "/data/aggregate_zero_shot_tertiary_structure_data.csv",
};

const HIDDEN_COLUMNS = new Set(["Model details"]);

const encodeSortKey = (sortKey, direction) => sortKey + "-" + direction;

function getSortFunc(tableData, sortKey) {
  // numeric-aware sort; blanks/NAs last
  const [column] = sortKey.split("-");
  const hasNumeric = tableData.some((row) => {
    const value = row[column];
    if (value === undefined || value === "") {
      return false;
    }
    return !Number.isNaN(Number(value));
  });
  return (a, b, sign) => {
    const av = a[column];
    const bv = b[column];
    const an = Number(av);
    const bn = Number(bv);

    const aValid = hasNumeric && !Number.isNaN(an);
    const bValid = hasNumeric && !Number.isNaN(bn);

    if (aValid && bValid) return sign * (an - bn);
    if (aValid && !bValid) return -1 * sign;   // numbers before non-numbers
    if (!aValid && bValid) return 1 * sign;
    return sign * String(av ?? "").localeCompare(String(bv ?? ""), undefined, { numeric: true });
  };
}

const decodeSortKey = (sortKeyDirection) => {
  const [key, direction] = sortKeyDirection.split("-");
  return { sortKey: key, direction: direction };
};

const computeNextSortKey = (currentKeyDirection, clickedKey) => {
  const decoded = decodeSortKey(currentKeyDirection);
  if (clickedKey !== decoded.sortKey) return encodeSortKey(clickedKey, "ASC");
  return encodeSortKey(clickedKey, decoded.direction === "ASC" ? "DESC" : "ASC");
};

const renderSortIcon = (targetKey, sortKey) => {
  if (!sortKey || !sortKey.includes("-")) {
    return <span style={{ color: BACKGROUND_HEADER_COLOR }}>▲</span>;
  }
  const decoded = decodeSortKey(sortKey);
  if (decoded.sortKey === targetKey) {
    return decoded.direction === "ASC" ? (
      <span style={{ color: TEXT_COLOR }}>▲</span>
    ) : (
      <span style={{ color: TEXT_COLOR }}>▼</span>
    );
  }
  return <span style={{ color: BACKGROUND_HEADER_COLOR }}>▲</span>;
};

// leave helpers for old views untouched but we won't use DMS-specific renaming
let addMissingKeys = (listOfObjects, columns) => {
  listOfObjects = listOfObjects.filter((o) => Object.keys(o).length > 1);
  const keys = columns || (listOfObjects[0] ? Object.keys(listOfObjects[0]) : []);
  return listOfObjects.map((object) =>
    keys.reduce((acc, key) => {
      acc[key] = object[key] ?? "N/A";
      return acc;
    }, {})
  );
};

function Benchmarks() {
  const location = useLocation();
  if (location.state === null) {
    location.state = {
      // RNAGym: aggregate-only & zero-shot only
      viewType: "aggregate",
  dataDomain: "fitness",
      modelParadigm: "zero_shot",
      sortKey: "Model_rank-ASC",
    };
  }

  const [tableData, setTableData] = useState([]);
  const [dataDomain, setDataDomain] = useState(location.state.dataDomain);
  const [tableColumns, setTableColumns] = useState([]);
  const [sortKey, setSortKey] = useState(location.state.sortKey);

  const virtuosoRef = useRef(null);

  function handleCsvData(data /*, statistic */) {
    // RNAGym: headers come straight from the CSV; hide any blocked columns
    if (data.length > 0) {
      const columns = Object.keys(data[0]).filter(
        (column) => !HIDDEN_COLUMNS.has(column),
      );
      const filled = addMissingKeys(data, columns);
      setTableData(filled);
      setTableColumns(columns);
      if (columns.length > 0) {
        if (!sortKey || !sortKey.includes("-")) {
          setSortKey(encodeSortKey(columns[0], "ASC"));
        } else {
          const requested = decodeSortKey(sortKey).sortKey;
          if (!columns.includes(requested)) {
            setSortKey(encodeSortKey(columns[0], "ASC"));
          }
        }
      }
    } else {
      setTableData([]);
      setTableColumns([]);
    }
  }

  function handleCsvError(error, file) {
    console.log(error);
    console.log(file);
    setTableData([]);
    setTableColumns([]);
  }

  useEffect(() => {
    // data fetch (aggregate + zero-shot only)
    const filepath = DATASET_PATHS[dataDomain];
    if (!filepath) {
      setTableData([]);
      setTableColumns([]);
      return;
    }
    Papa.parse(filepath, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => handleCsvData(results.data),
      error: handleCsvError,
    });
  }, [dataDomain]);

  const sortedTableData = useMemo(() => {
    if (tableData.length === 0) return [];
    const decodedKey = decodeSortKey(sortKey);
    const sortingFunc = getSortFunc(tableData, sortKey);
    const sign = decodedKey.direction === "ASC" ? 1 : -1;

    if (!tableData[0].hasOwnProperty(decodedKey.sortKey)) {
      return tableData;
    }
    // RNAGym: only drop rows with empty Rank if present; don't rely on DMS id
    return tableData
      .filter((item) =>
        !(
          Object.prototype.hasOwnProperty.call(item, "Model_rank") &&
          item["Model_rank"] === ""
        ),
      )
      .slice()
      .sort((a, b) => sortingFunc(a, b, sign));
  }, [tableData, sortKey]);

  // header (aggregate-only). Single header row is sufficient for RNAGym tables.
  function customHeader() {
    return (
      <tr style={{ backgroundColor: BACKGROUND_HEADER_COLOR }}>
        {tableColumns.map((column) => (
          <th
            className={column === "Model_name" ? "th-fixed-header" : "default-header"}
            onClick={() => setSortKey(computeNextSortKey(sortKey, column))}
            key={column}
          >
            {column.replace(/_/g, " ")}
            {renderSortIcon(column, sortKey)}
          </th>
        ))}
      </tr>
    );
  }

  return (
    <div className="main-div">
      <h1 className="title">Benchmark Scores</h1>

      <div className="search-and-buttons">
        <div className="dropdowns">
          <Select
            style={{ width: "260px" }}
            label=""
            placeholder="Task"
            onChange={setDataDomain}
            data={[
              { value: "fitness", label: "Fitness" },
              { value: "secondary_structure", label: "Secondary Structure" },
              { value: "tertiary_structure", label: "Tertiary Structure" },
            ]}
            value={dataDomain}
          />
        </div>
      </div>

      <br />

      {sortedTableData.length > 0 ? (
        <TableVirtuoso
          ref={virtuosoRef}
          style={{ height: "70%", width: "80%" }}
          data={sortedTableData}
          components={{
            Table: (props) => (
              <Table
                {...{
                  ...props,
                  highlightOnHover: true,
                  withBorder: true,
                  withColumnBorders: true,
                  style: { ...props.style, borderCollapse: "separate" },
                }}
              />
            ),
            TableRow: (props) => <tr {...props} />,
          }}
          fixedHeaderContent={customHeader}
          increaseViewportBy={20}
          itemContent={(index, item) => (
            <>
              {tableColumns.map((column) => (
                <td
                  className={
                    column === "Description" || column === "References"
                      ? "truncate-cell"
                      : column === "Model_name"
                      ? "sticky-column"
                      : "default-row"
                  }
                  key={column}
                >
                  {column !== "References" ? item[column] : parse(item[column])}
                </td>
              ))}
            </>
          )}
        />
      ) : (
        <h2 style={{ paddingTop: "6vh" }}>
          Aggregate view for {cleanNames[dataDomain] ?? dataDomain} ({cleanNames["zero_shot"]}) not
          available
        </h2>
      )}
    </div>
  );
}

export default Benchmarks;

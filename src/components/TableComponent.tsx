import { memo, useState, useCallback, useMemo, type FC } from "react";
import { Table, InputNumber, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IRowData } from "../types";

let uniqueId = 0;

const TableComponent: FC = () => {
  const [data, setData] = useState<IRowData[]>([
    { key: "0", x: 0, y: 0, sum: 0 },
  ]);

  const handleAddRow = useCallback(() => {
    uniqueId += 1;
    setData((prevData) => [
      ...prevData,
      { key: uniqueId.toString(), x: 0, y: 0, sum: 0 },
    ]);
  }, []);

  const handleDeleteRow = useCallback((key: string) => {
    setData((prevData) => prevData.filter((row) => row.key !== key));
  }, []);

  const handleChange = useCallback(
    (key: string, field: "x" | "y", value: number | null) => {
      setData((prevData) =>
        prevData.map((row) => {
          if (row.key === key) {
            const newValue = value ?? 0;
            const x = field === "x" ? newValue : row.x ?? 0;
            const y = field === "y" ? newValue : row.y ?? 0;
            return {
              ...row,
              [field]: newValue,
              sum: x + y,
            };
          }
          return row;
        })
      );
    },
    []
  );

  const columns: ColumnsType<IRowData> = useMemo(
    () => [
      {
        title: "X",
        dataIndex: "x",
        render: (value, record) => (
          <InputNumber
            value={value ?? undefined}
            onChange={(val) => handleChange(record.key, "x", val)}
            min={0}
          />
        ),
      },
      {
        title: "Y",
        dataIndex: "y",
        render: (value, record) => (
          <InputNumber
            value={value ?? undefined}
            onChange={(val) => handleChange(record.key, "y", val)}
            min={0}
          />
        ),
      },
      {
        title: "Sum",
        dataIndex: "sum",
        render: (value) => <InputNumber value={value} disabled />,
      },
      {
        title: "Action",
        render: (_, record) => (
          <Button danger onClick={() => handleDeleteRow(record.key)}>
            Delete
          </Button>
        ),
      },
    ],
    [handleChange, handleDeleteRow]
  );

  return (
    <div>
      <Button
        type="primary"
        onClick={handleAddRow}
        style={{ marginBottom: 16 }}
      >
        Add new row
      </Button>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default memo(TableComponent);

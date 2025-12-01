import { fireEvent, render, screen } from "@testing-library/react";
import { DemoTable } from "../DemoTable";

type Row = { id: number; name: string; value: number };

describe("DemoTable", () => {
  it("renders headers and rows and handles row clicks", () => {
    const data: Row[] = [
      { id: 1, name: "A", value: 10 },
      { id: 2, name: "B", value: 20 },
    ];
    const columns = [
      { key: "id", header: "ID" },
      { key: "name", header: "Name" },
      { key: "value", header: "Value" },
    ];

    const onRowClick = jest.fn();

    render(
      <DemoTable
        data={data}
        columns={columns}
        onRowClick={onRowClick}
        striped
      />,
    );

    // headers
    expect(screen.getByText(/ID/)).toBeInTheDocument();
    expect(screen.getByText(/Name/)).toBeInTheDocument();

    // click first row
    const firstRow = screen.getAllByRole("row")[1]; // [0] is header
    fireEvent.click(firstRow);
    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  it("shows empty state when no data", () => {
    const columns = [{ key: "id", header: "ID" }];
    render(<DemoTable data={[]} columns={columns} />);
    expect(screen.getByText(/No data available/)).toBeInTheDocument();
  });

  it("handles custom column render function", () => {
    const data: Row[] = [{ id: 1, name: "Test", value: 100 }];
    const columns = [
      { key: "id", header: "ID" },
      {
        key: "value",
        header: "Value",
        render: (item: Row, value: number) => `$${value}`,
      },
    ];

    render(<DemoTable data={data} columns={columns} />);

    // Custom render should format the value
    expect(screen.getByText("$100")).toBeInTheDocument();
  });
});

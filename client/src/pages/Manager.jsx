import React, { useState, useMemo } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const Manager = () => {
  const [today, setToday] = useState("");

  // Fetch function for React Query
  const fetchPaidUsers = async () => {
    const res = await axios.get("http://localhost:9000/api/user/paid-users");
    return res.data || [];
  };

  // Use React Query
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["paidUsers"],
    queryFn: fetchPaidUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Set today's date
  useMemo(() => {
    const date = new Date();
    setToday(date.toLocaleDateString("en-CA"));
  }, []);

  // 1. Define Columns
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name", // matches the key in your data
      },
      {
        header: "Email",
        accessorKey: "usermail",
      },
      {
        header: "Branch",
        accessorKey: "branch",
      },
      {
        header: "Role",
        accessorKey: "role",
        cell: (info) => <span className="capitalize">{info.getValue()}</span>,
      },
    ],
    []
  );

  // 2. Initialize Table Instance
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors text-sm font-medium"
          >
            {isFetching ? "Refreshing..." : "🔄 Refresh"}
          </button>
          <div className="text-green-600 font-semibold text-lg">
            {today}
          </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">
          🍽️ Paid Meal Bookings
        </h2>
        
        {isLoading ? (
          <div className="text-center text-gray-500 py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2">Loading...</p>
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 py-10">
            <p className="font-semibold">Error loading data!</p>
            <p className="text-sm mt-2">{error?.message || "Something went wrong"}</p>
            <button
              onClick={() => refetch()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-500">No paid users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full mb-6 border border-green-200 rounded-lg overflow-hidden">
              <thead className="bg-green-100 text-green-800">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="py-3 px-4 text-left font-bold">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t hover:bg-green-50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-3 px-4 text-gray-700">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right font-bold text-green-700 text-lg">
              Total Paid Users: {users.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;
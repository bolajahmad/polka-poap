'use client'
import { COLLECTORS, ICollectorInformation } from "@/models/collectors";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./primary-table";

export const CollectorsTable = () => {
  const columns: ColumnDef<ICollectorInformation>[] = [
      {
        accessorKey: "poapId",
        header: "POAP ID",
      },
      {
        accessorKey: "user",
        cell: ({ row }) => {
            const { email, namedAddress, walletAddress } = row.getValue("user") as any
       
            return email || namedAddress || walletAddress
          },
        header: "Collector",
      },
      {
        accessorKey: "timestamp",
        header: "Minted",
      },
    ];

  return <DataTable data={COLLECTORS} columns={columns} />;
};

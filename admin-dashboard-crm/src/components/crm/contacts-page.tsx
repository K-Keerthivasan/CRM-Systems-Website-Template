"use client";

import { useQuery } from "@tanstack/react-query";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { DotsThreeOutlineVerticalIcon, EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useDeferredValue, useState } from "react";

import { formatCurrency } from "@/lib/format";
import type { Contact } from "@/lib/mock-crm-data";
import { contacts } from "@/lib/mock-crm-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const statusClasses: Record<Contact["status"], string> = {
  Customer: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Qualified: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Prospect: "border-sky-400/20 bg-sky-400/10 text-sky-200",
  "At Risk": "border-rose-400/20 bg-rose-400/10 text-rose-200",
};

export function ContactsPage() {
  const { data = [] } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => contacts,
  });

  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [selected, setSelected] = useState<Contact | null>(null);

  const columns: ColumnDef<Contact>[] = [
    {
      accessorKey: "name",
      header: "Contact",
      cell: ({ row }) => {
        const contact = row.original;
        return (
          <button className="flex items-center gap-3 text-left" onClick={() => setSelected(contact)}>
            <Avatar>
              <AvatarFallback className="bg-cyan-400/15 text-cyan-200">
                {contact.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">{contact.name}</p>
              <p className="text-slate-500">{contact.company}</p>
            </div>
          </button>
        );
      },
    },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge className={statusClasses[row.original.status]}>{row.original.status}</Badge> },
    { accessorKey: "owner", header: "Owner" },
    { accessorKey: "lastContact", header: "Last Contact" },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Row actions" />}>
            <DotsThreeOutlineVerticalIcon size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 border border-white/10 bg-slate-950 text-slate-200">
            <DropdownMenuItem onClick={() => setSelected(row.original)}>Open record</DropdownMenuItem>
            <DropdownMenuItem>Add task</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter: deferredSearch },
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      const haystack = `${row.original.name} ${row.original.company} ${row.original.email} ${row.original.status}`.toLowerCase();
      return haystack.includes(String(filterValue).toLowerCase());
    },
  });

  return (
    <>
      <Card className="border border-white/10 bg-slate-900/70">
        <CardHeader className="border-b border-white/10">
          <CardDescription className="text-slate-400">Contacts</CardDescription>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="font-sans text-white">Searchable CRM contact database</CardTitle>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, company, email, status"
              className="w-full border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500 lg:w-80"
            />
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-4 py-3 font-medium">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t border-white/6 text-slate-300">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 align-middle">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full border-l border-white/10 bg-slate-950 text-slate-100 sm:max-w-xl">
          {selected ? (
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="flex h-full flex-col">
              <SheetHeader className="border-b border-white/10">
                <SheetTitle className="font-sans text-white">{selected.name}</SheetTitle>
                <SheetDescription className="text-slate-400">{selected.company}</SheetDescription>
              </SheetHeader>
              <div className="space-y-5 p-4">
                <div className="grid gap-4 border border-white/10 bg-white/4 p-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Status</p>
                    <Badge className={`mt-2 ${statusClasses[selected.status]}`}>{selected.status}</Badge>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Account Value</p>
                    <p className="mt-2 font-sans text-2xl font-semibold text-white">{formatCurrency(selected.value)}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 border border-white/10 bg-white/4 p-3">
                    <EnvelopeSimpleIcon size={16} className="text-cyan-300" />
                    <span>{selected.email}</span>
                  </div>
                  <div className="flex items-center gap-3 border border-white/10 bg-white/4 p-3">
                    <PhoneIcon size={16} className="text-cyan-300" />
                    <span>{selected.phone}</span>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border border-white/10 bg-white/4 p-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Owner</p>
                    <p className="mt-2 font-medium text-white">{selected.owner}</p>
                  </div>
                  <div className="border border-white/10 bg-white/4 p-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Region</p>
                    <p className="mt-2 font-medium text-white">{selected.region}</p>
                  </div>
                </div>
                <div className="border border-white/10 bg-white/4 p-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Notes</p>
                  <p className="mt-2 text-slate-300">{selected.notes}</p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}

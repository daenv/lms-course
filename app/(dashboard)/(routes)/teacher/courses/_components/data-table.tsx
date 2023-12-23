'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'
import {
     ColumnDef,
     ColumnFiltersState,
     SortingState,
     flexRender,
     getCoreRowModel,
     getFilteredRowModel,
     getPaginationRowModel,
     getSortedRowModel,
     useReactTable,
} from '@tanstack/react-table'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'


interface DataTableProps<TData, TValue> {
     columns: ColumnDef<TData, TValue>[]
     data: TData[]
}

function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {

     const [sorting, setSorting] = useState<SortingState>([])
     const [columnsFilters, setColumnsFilters] = useState<ColumnFiltersState>([])

     const table = useReactTable({
          data,
          columns,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
          onSortingChange: setSorting,
          onColumnFiltersChange: setColumnsFilters,
          getFilteredRowModel: getFilteredRowModel(),
          state: {
               sorting,
               columnFilters: columnsFilters,
          }
     })



     return (
          <div>
               <div className='flex items-center py-4 justify-between'>
                    <Input placeholder='Filter courses...' value={(table.getColumn('title')?.getFilterValue() as string) ?? ""}
                         onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)} className='max-w-sm' />
                    <Link href={'/teacher/create'}>
                         <Button>
                              <PlusCircle className='h-4 w-4 mr-2' />
                              New course
                         </Button>
                    </Link>
               </div>
               <div className='rounded-md border'>
                    <Table>
                         <TableHead>
                              {table.getHeaderGroups().map((headerGroup) => (
                                   <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                             return (
                                                  <TableHead key={header.id}>
                                                       {header.isPlaceholder ? null :
                                                            flexRender(header.column.columnDef.header,
                                                                 header.getContext())}
                                                  </TableHead>
                                             )
                                        })}
                                   </TableRow>
                              ))}
                         </TableHead>
                         <TableBody>
                              {table.getRowModel().rows.length ? (
                                   table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                             {row.getVisibleCells().map((cell) => (
                                                  <TableCell key={cell.id}>
                                                       {flexRender(cell.column.columnDef.cell,
                                                            cell.getContext())}
                                                  </TableCell>
                                             ))}
                                        </TableRow>
                                   ))
                              ) : (
                                   <TableRow>
                                        <TableCell colSpan={columns.length} className='h-24 text-center'>
                                             No Results.
                                        </TableCell>
                                   </TableRow>
                              )}
                         </TableBody>
                    </Table>
               </div>
               <div className='flex items-center justify-end space-x-2 py-4'>
                    <Button variant='outline' size={'sm'} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                         Previous
                    </Button>
                    <Button variant={'outline'} size={'sm'} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                         Next
                    </Button>
               </div>
          </div>
     )
}

export default DataTable

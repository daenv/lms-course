'use client'
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

               </div>
          </div>
     )
}

export default DataTable

import React, { useState, useMemo } from 'react';
import Papa from 'papaparse';
import { Upload, Search, Filter, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

export const HomePage = () => {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColumn, setFilterColumn] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data);
          if (results.data.length > 0) {
            setHeaders(Object.keys(results.data[0] as object));
          }
          setCurrentPage(1);
        },
      });
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const values = filterColumn === 'all'
        ? Object.values(row).join(' ').toLowerCase()
        : String(row[filterColumn] || '').toLowerCase();

      return values.includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm, filterColumn]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto  min-h-screen bg-neutral-50/50 dark:bg-neutral-950/50">
      <Card className="shadow-sm  border-none py-0 pb-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
        <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/5 pb-8 pt-4 px-4 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary flex items-center gap-3">
                <div className="bg-primary p-2 rounded-xl text-primary-foreground shadow-lg shadow-primary/20 shrink-0">
                  <FileSpreadsheet className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="truncate">CSV Explorer</span>
              </CardTitle>
              <CardDescription className="text-sm md:text-lg font-medium text-muted-foreground pl-1">
                Powerful insights from your CSV data in seconds.
              </CardDescription>
            </div>
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <Label
                htmlFor="csv-upload"
                className="cursor-pointer inline-flex items-center justify-center rounded-xl text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 shadow-xl shadow-primary/20 hover:-translate-y-0.5 w-full lg:w-auto"
              >
                <Upload className="mr-2 h-5 w-5" />
                Import CSV
              </Label>
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          {data.length > 0 ? (
            <div className="space-y-8">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-6 bg-neutral-100/50 dark:bg-neutral-800/50 p-4 md:p-6 rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50">
                <div className="space-y-2 flex-1 w-full">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Search Records</Label>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="Type to search..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="pl-12 h-12 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-xl focus-visible:ring-primary shadow-sm w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 items-stretch sm:items-end">
                  <div className="space-y-2 w-full sm:w-64 lg:w-72">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Search Context</Label>
                    <Select
                      value={filterColumn}
                      onValueChange={(val) => {
                        setFilterColumn(val);
                        setCurrentPage(1);
                      }}
                    >
                      <SelectTrigger className="h-12 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-primary" />
                          <SelectValue placeholder="All Columns" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="all">Everywhere</SelectItem>
                        {headers.map((header) => (
                          <SelectItem key={header} value={header}>
                            {header}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Badge variant="outline" className="h-12 px-6 rounded-xl border-dashed border-2 bg-background font-bold text-primary flex items-center justify-center gap-2 whitespace-nowrap lg:self-end">
                    <span className="text-xs uppercase opacity-60">Matches</span>
                    {filteredData.length}
                  </Badge>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xl shadow-black/5 ring-1 ring-black/5">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-neutral-50 dark:bg-neutral-800/30">
                      <TableRow className="hover:bg-transparent border-neutral-200 dark:border-neutral-800">
                        {headers.map((header) => (
                          <TableHead key={header} className="h-14 font-extrabold text-neutral-900 dark:text-neutral-100 uppercase text-[10px] tracking-widest px-6">
                            {header}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedData.length > 0 ? (
                        paginatedData.map((row, index) => (
                          <TableRow key={index} className="hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors border-neutral-200 dark:border-neutral-800 group">
                            {headers.map((header) => (
                              <TableCell key={`${index}-${header}`} className="py-5 px-6 font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-primary transition-colors">
                                {row[header] || <span className="text-neutral-300 dark:text-neutral-700 italic">empty</span>}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={headers.length} className="h-32 text-center text-muted-foreground font-medium italic">
                            No matching results found for this selection.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {totalPages > 1 && (
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground bg-neutral-50 dark:bg-neutral-800/50 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 w-full lg:w-auto text-center">
                    Displaying <span className="font-bold text-foreground">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-bold text-foreground">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="font-bold text-primary">{filteredData.length}</span> entries
                  </div>
                  <Pagination className="justify-center lg:justify-end w-full lg:w-auto overflow-x-auto">
                    <PaginationContent className="bg-neutral-50 dark:bg-neutral-800/50 p-1 rounded-xl border border-neutral-200 dark:border-neutral-700 flex-nowrap shrink-0">
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(currentPage - 1)}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-white dark:hover:bg-neutral-900 rounded-lg transition-all"}
                        />
                      </PaginationItem>

                      <div className="flex items-center gap-1 mx-1 sm:mx-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                          .map((pageNum, idx, arr) => {
                            const showEllipsis = idx > 0 && pageNum - arr[idx - 1] > 1;
                            return (
                              <React.Fragment key={pageNum}>
                                {showEllipsis && <span className="px-1 text-muted-foreground">...</span>}
                                <PaginationItem>
                                  <PaginationLink
                                    onClick={() => handlePageChange(pageNum)}
                                    isActive={currentPage === pageNum}
                                    className={`cursor-pointer rounded-lg transition-all w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm ${currentPage === pageNum ? 'shadow-md shadow-primary/20 scale-105' : 'hover:bg-white dark:hover:bg-neutral-900 border-none'}`}
                                  >
                                    {pageNum}
                                  </PaginationLink>
                                </PaginationItem>
                              </React.Fragment>
                            );
                          })
                        }
                      </div>

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(currentPage + 1)}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-white dark:hover:bg-neutral-900 rounded-lg transition-all"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center group">
              <div className="bg-primary/10 p-10 rounded-[2.5rem] mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                <Upload className="h-16 w-16 text-primary animate-bounce decoration-primary" />
              </div>
              <h3 className="text-3xl font-black mb-3 tracking-tight">Ready to analyze?</h3>
              <p className="text-muted-foreground max-w-md mb-10 text-lg leading-relaxed">
                Drag and drop your CSV file here or click the button below to start exploring your data with our premium dashboard.
              </p>
              <Button size="lg" className="h-14 px-10 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 group-hover:-translate-y-1 transition-all" asChild>
                <label htmlFor="csv-upload" className="cursor-pointer">
                  Select Data File
                </label>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>


    </div>
  );
};

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type ReusablePaginationProps = Readonly<{
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
}>;

export default function ReusablePagination({
  page,
  limit,
  total,
  onPageChange,
}: ReusablePaginationProps) {
  const totalPages = Math.ceil(total / limit);
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 3) {
      // Tampilkan semua halaman jika <= 3
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i} className="hidden md:block">
            <PaginationLink
              isActive={i === page}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
              href="#"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Halaman pertama
      pages.push(
        <PaginationItem key={1} className="hidden md:block">
          <PaginationLink
            isActive={page === 1}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(1);
            }}
            href="#"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Ellipsis jika bukan di halaman 2
      if (page > 2) {
        pages.push(
          <PaginationItem key="ellipsis-left" className="hidden md:block">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Halaman aktif (tengah)
      if (page !== 1 && page !== totalPages) {
        pages.push(
          <PaginationItem key={page} className="hidden md:block">
            <PaginationLink
              isActive
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
              href="#"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Ellipsis jika bukan di halaman terakhir - 1
      if (page < totalPages - 1) {
        pages.push(
          <PaginationItem key="ellipsis-right" className="hidden md:block">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Halaman terakhir
      pages.push(
        <PaginationItem key={totalPages} className="hidden md:block">
          <PaginationLink
            isActive={page === totalPages}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(totalPages);
            }}
            href="#"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
      <p className="w-full">
        {total > 0 ? `${startItem}-${endItem} of ${total}` : "No data found"}
      </p>

      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) onPageChange(page - 1);
              }}
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) onPageChange(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

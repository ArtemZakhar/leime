import { MemeType } from '@/types/mems';
import { TableHeaderColumnsType } from '@/types/ui/tables';
import { Pagination } from '@heroui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@heroui/table';

import { useMemo, useState } from 'react';

const TableStyled = ({
  headerColumns,
  rows,
  actionButton,
}: {
  headerColumns: TableHeaderColumnsType[];
  rows: MemeType[];
  actionButton: (meme: MemeType) => JSX.Element;
}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows]);

  return (
    <Table
      aria-label="Mems table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page: number) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader columns={headerColumns} className="flex">
        {(column) => (
          <TableColumn
            className={`text-th ${column.key === 'title' ? 'w-[100%]' : 'min-w-[2rem] sm:min-w-[4rem] md:min-w-[5rem]'}`}
            key={column.key}
            align={`${column.key === 'actions' ? 'center' : 'start'}`}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={items}
        emptyContent={
          'Here will be displayed mems library. Please create one first.'
        }
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="text-body">
                {columnKey === 'actions'
                  ? actionButton(item)
                  : getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TableStyled;

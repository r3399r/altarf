import classNames from 'classnames';
import { ReactNode } from 'react';
import Body from './typography/Body';

type Column<T> = {
  header?: string;
  accessor: (row: T) => ReactNode;
  className?: string;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string | number;
};

const Table = <T,>({ data, columns, rowKey }: TableProps<T>) => (
  <>
    <div className="flex items-center border-b border-border-table-thead">
      {columns.map((column, index) => (
        <Body
          bold
          key={index}
          style={{ width: `calc(100% / ${columns.length})` }}
          className={classNames('px-3 py-4 text-text-table-thead', {
            [column.className ?? '']: !!column.className,
          })}
        >
          {column.header}
        </Body>
      ))}
    </div>
    {data.map((row) => (
      <div key={rowKey(row)} className="flex border-b border-border-table-tbody">
        {columns.map((column, index) => (
          <div
            key={index}
            style={{ width: `calc(100% / ${columns.length})` }}
            className={classNames('px-3 py-4', {
              [column.className ?? '']: !!column.className,
            })}
          >
            {column.accessor(row)}
          </div>
        ))}
      </div>
    ))}
  </>
);

export default Table;

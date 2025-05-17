import classNames from 'classnames';
import React from 'react';
import IcArrowLeftDisabled from 'src/assets/ic-arrow-left-disabled.svg';
import IcArrowLeft from 'src/assets/ic-arrow-left.svg';
import IcArrowRightDisabled from 'src/assets/ic-arrow-right-disabled.svg';
import IcArrowRight from 'src/assets/ic-arrow-right.svg';
import Body from './typography/Body';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getPageNumbers = (page: number, totalPages: number) => {
  const pages: (number | string)[] = [];
  if (totalPages <= 7) for (let i = 1; i <= totalPages; i++) pages.push(i);
  else if (page <= 4) pages.push(1, 2, 3, 4, 5, '...', totalPages);
  else if (page >= totalPages - 3)
    pages.push(
      1,
      '...',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    );
  else pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);

  return pages;
};

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  const pages = getPageNumbers(page, totalPages);

  return (
    <div className="flex items-center justify-center gap-[5px]">
      {page === 1 ? (
        <img src={IcArrowLeftDisabled} />
      ) : (
        <img
          src={IcArrowLeft}
          className="cursor-pointer rounded-full hover:bg-background-pagination-hover"
          onClick={() => onPageChange(page - 1)}
        />
      )}
      {pages.map((p) => (
        <Body
          key={p}
          size="m"
          className={classNames(
            'flex h-8 w-8 items-center justify-center rounded-full text-text-pagination-normal',
            {
              '!bg-background-pagination-focus !text-text-pagination-focus': p === page,
              'cursor-pointer hover:bg-background-pagination-hover': typeof p === 'number',
            },
          )}
          onClick={() => {
            if (typeof p === 'number') onPageChange(p);
          }}
        >
          {p}
        </Body>
      ))}
      {page === totalPages ? (
        <img src={IcArrowRightDisabled} />
      ) : (
        <img
          src={IcArrowRight}
          className="cursor-pointer rounded-full hover:bg-background-pagination-hover"
          onClick={() => onPageChange(page + 1)}
        />
      )}
    </div>
  );
};

export default Pagination;

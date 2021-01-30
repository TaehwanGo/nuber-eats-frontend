import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IPagination {
  page: number;
  totalPages: number | null | undefined;
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
}

export const Pagination: React.FC<IPagination> = ({
  page,
  totalPages,
  onNextPageClick,
  onPrevPageClick,
}) => (
  <div className="py-8 grid grid-cols-3 text-center max-w-md items-center mx-auto">
    {page > 1 ? (
      <button
        onClick={onPrevPageClick}
        className="font-semibold text-2xl hover:text-green-600 focus:outline-none"
      >
        <FontAwesomeIcon icon={faCaretSquareLeft} />
      </button>
    ) : (
      <div></div>
    )}
    <span>
      Page {page} of {totalPages}
    </span>

    {page !== totalPages ? (
      <button
        onClick={onNextPageClick}
        className="font-semibold text-2xl hover:text-green-600 focus:outline-none"
      >
        <FontAwesomeIcon icon={faCaretSquareRight} />
      </button>
    ) : (
      <div></div>
    )}
  </div>
);

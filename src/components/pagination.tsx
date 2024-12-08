import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

// Definiranje tipova za props
interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (pageNumber: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startPage = Math.max(currentPage - 3, 1);
    const endPage = Math.min(currentPage + 3, totalPages);

    let items = [];

    if (totalPages <= 1) {
        return null;
    }

    if (startPage > 1) {
        items.push(
            <Pagination.Item key="first" onClick={() => onPageChange(1)}>
                1
            </Pagination.Item>
        );
        if (startPage > 2) {
            items.push(<Pagination.Ellipsis key="start-ellipsis" />);
        }
    }

    for (let number = startPage; number <= endPage; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => onPageChange(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            items.push(<Pagination.Ellipsis key="end-ellipsis" />);
        }
        items.push(
            <Pagination.Item key="last" onClick={() => onPageChange(totalPages)}>
                {totalPages}
            </Pagination.Item>
        );
    }

    return (
        <Pagination>
            <Pagination.Prev
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
            />
            {items}
            <Pagination.Next
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
            />
        </Pagination>
    );
};

export default PaginationComponent;

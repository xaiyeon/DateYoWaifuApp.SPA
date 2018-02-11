export interface Pagination {

    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;

}

// Also edit the user.service.ts
export class PaginatedResult<T> {
    // Results has the users and pagination is the page info
    result: T;
    pagination: Pagination;
}


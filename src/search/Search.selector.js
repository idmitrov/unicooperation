import { createSelector } from 'reselect';

const getSearch = (state) => state.search;

export const selectSearch = createSelector(
    [getSearch],
    (search) => search
)

export const selectPages = createSelector(
    [getSearch],
    (search) => {
        const pages = [];
        const totalPages = Math.ceil(search.resultsTotal / search.limit);
        const pagesLimit = totalPages > 5 ? 5 : totalPages;

        for (let i = search.currentPage; i <= pagesLimit; i += 1) {
            pages.push(i);
        }

        if (search.currentPage === totalPages) {
            pages.unshift(search.currentPage - 1);
        }

        return pages;
    }
)

export const selectTotalPages = createSelector(
    [getSearch],
    (search) => Math.ceil(search.resultsTotal / search.limit)
)

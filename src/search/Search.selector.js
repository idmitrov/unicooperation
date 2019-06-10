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
        const { currentPage } = search;
        const totalPages = Math.ceil(search.resultsTotal / search.limit);
        const maxAllowedPages = totalPages < currentPage + 4 ? totalPages : 5;

        for (let i = currentPage; i <= maxAllowedPages; i += 1) {
            pages.push(i);
        }

        if (pages.length < maxAllowedPages) {
            const firstPages = pages[0] - 1;

            for (let i = firstPages; i > 1; i -= 1) {
                pages.unshift(i);
            }
        }

        return pages;
    }
)

export const selectTotalPages = createSelector(
    [getSearch],
    (search) => Math.ceil(search.resultsTotal / search.limit)
)

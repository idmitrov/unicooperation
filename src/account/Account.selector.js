import { createSelector } from 'reselect';

const getAccountToken = (state) => state.account.token;

export const selectAccountToken = createSelector(
    [getAccountToken],
    (accountToken) => {
        return accountToken;
    }
)

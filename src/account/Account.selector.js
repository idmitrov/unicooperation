import { createSelector } from 'reselect';

const getAccountToken = (state) => state.account.token;
const getAccount = (state) => state.account;

export const selectAccountToken = createSelector(
    [getAccountToken],
    (accountToken) => {
        return accountToken;
    }
)

export const selectAccount = createSelector(
    [getAccount],
    (account) => {
        return account;
    }
)

const accountDefaults = {
    authenticated: false,
    token: null
};

export default (state = accountDefaults, action) => {
    switch (action.type) {
        default: return state;
    }
}

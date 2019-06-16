const matcherDefaults = {
    salary: null,
    experience: null,
    skills: [],
    suggestedMatches: [],
    filteredMatches: []
};

export default (state = matcherDefaults, action = {}) => {
    switch (action.type) {
        default: return state;
    }
}

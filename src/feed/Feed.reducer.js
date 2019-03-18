const feedDefaults = {
    data: [
        {
            content: 'Test post 1',
            date: '01/01/2019:14:00',
            owner: 'John Doe'
        },
        {
            content: 'Test post 2',
            date: '01/01/2019:14:53',
            owner: 'John Doe'
        },
        {
            content: 'Test post 3',
            date: '01/01/2019:14:56',
            owner: 'John Doe'
        },
        {
            content: 'Test post 1',
            date: '01/01/2019:14:00',
            owner: 'John Doe'
        },
        {
            content: 'Test post 2',
            date: '01/01/2019:14:53',
            owner: 'John Doe'
        },
        {
            content: 'Test post 3',
            date: '01/01/2019:14:56',
            owner: 'John Doe'
        },
        {
            content: 'Test post 1',
            date: '01/01/2019:14:00',
            owner: 'John Doe'
        },
        {
            content: 'Test post 2',
            date: '01/01/2019:14:53',
            owner: 'John Doe'
        },
        {
            content: 'Test post 3',
            date: '01/01/2019:14:56',
            owner: 'John Doe'
        }
    ]
};

export default (state = feedDefaults, action) => {
    switch (action.type) {
        default: return state;
    }
}

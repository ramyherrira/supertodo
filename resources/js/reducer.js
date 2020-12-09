const initialState = {
    tasks: [],
    selectId: null
};

export default function appReducer(state = initialState, action) {

    switch (action.type) {
        case 'ADD_TASK': {
            return {
                ...state,
                tasks: state.tasks.concat(action.payload)
            };
        }

        case 'TOGGLE_TASK': {

            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (action.payload !== task._id) {
                        return task;
                    }

                    return {
                        ...task,
                        completed: !task.completed
                    };
                })
            };
        }

        case 'DELETE_TASK': {
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload)
            }
        }

        case 'LOAD_TASKS': {
            return {
                ...state,
                tasks: action.payload
            };
        }

        case 'SELECT_TASK': {
            return {
                ...state,
                selectId: action.payload
            }
        }

        default: {
            return state;
        }
    }
};
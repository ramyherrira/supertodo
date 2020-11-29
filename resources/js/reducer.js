const initialState = {
    tasks: []
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

        default: {
            return state;
        }
    }
};

export async function fetchTasks(dispatch, getSt1ate) {
    const response = await axios.get('/tasks');

    dispatch({ type: 'LOAD_TASKS', payload: response.data.tasks });
}

export function addNewTask(title) {

    return async function saveNewTaskThunk(dispatch, getState) {

        const response = await axios.post('/tasks', {
            title: title
        });

        dispatch({ type: 'ADD_TASK', payload: response.data.task })
    };
}

export function toggleTask(id) {

    return async function toggleTaskThunk(dispatch, getState) {
        const response = await axios.put('/tasks/' + id);

        dispatch({ type: 'TOGGLE_TASK', payload: id });
    }
}

export function deleteTask(id) {

    return async function deleteTaskThunk(dispatch, getState) {
        const response = await axios.delete('/tasks/' + id);

        dispatch({ type: 'DELETE_TASK', payload: id });
    }
}
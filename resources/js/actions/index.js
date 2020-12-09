export function tasksLoaded (tasks) {
    return {
        type: 'LOAD_TASKS',
        payload: tasks
    };
}

export function taskAdded (task) {
    return {
        type: 'ADD_TASK',
        payload: task
    };
}

export function taskToggled (id) {
    return {
        type: 'TOGGLE_TASK',
        payload: id
    };
}

export function taskDeleted (id) {
    return {
        type: 'DELETE_TASK',
        payload: id
    };
}

export function taskSelected (id) {
    return {
        type: 'SELECT_TASK',
        payload: id
    };
}

/**
 * Send a HTTP Request to get all the tasks
 * And dispatch action to change state
 *
 * @param dispatch
 * @param getSt1ate
 * @returns {Promise<void>}
 */
export async function fetchTasks(dispatch, getSt1ate) {
    const response = await axios.get('/tasks');

    dispatch(tasksLoaded(response.data.tasks));
}


/**
 * Send a HTTP POST Request saving a new task
 * And dispatch action to add newly created task to state
 *
 * @param title
 * @returns {saveNewTaskThunk}
 */
export function addNewTask(title) {

    return async function saveNewTaskThunk(dispatch, getState) {

        const response = await axios.post('/tasks', {
            title: title
        });

        dispatch(taskAdded(response.data.task));
    };
}

/**
 * Send a HTTP PUT Request toggling the task
 * And dispatch action to update the state
 *
 * @param id
 * @returns {toggleTaskThunk}
 */
export function toggleTask(id) {

    return async function toggleTaskThunk(dispatch, getState) {
        const response = await axios.put('/tasks/' + id);

        dispatch(taskToggled(id));
    }
}

/**
 * Send a HTTP DELETE Request removing the task
 * And dispatch actionto update the state
 *
 * @param id
 * @returns {deleteTaskThunk}
 */
export function deleteTask(id) {

    return async function deleteTaskThunk(dispatch, getState) {
        const response = await axios.delete('/tasks/' + id);

        dispatch(taskDeleted(id));
    }
}
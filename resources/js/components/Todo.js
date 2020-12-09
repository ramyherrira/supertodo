import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewTask } from '../actions/index';
import BSModal from './BSModal';
import List from './List';
import AddNewTaskBtn from './AddNewTaskBtn';

const selectTasks = state => state.tasks.map(task => task);

const Todo = ()  => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectTasks);
    const [title, setTitle] = useState('');

    const handleChange = (e) => setTitle(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formIsValid()) {
            dispatch(addNewTask(title));
            setTitle('');
        }
    };

    const formIsValid = () => title.length > 0;

    return (
        <div className="row justify-content-center">
            <div className="col-7">
                <form className="form-inline" onSubmit={handleSubmit}>

                    <input
                        type="text"
                        className="col form-control mb-2 mr-sm-2"
                        id="title"
                        placeholder="Titre de la tâche"
                        value={title}
                        onChange={handleChange} />

                    <AddNewTaskBtn />
                </form>

                <List tasks={tasks} />
            </div>

            <BSModal />
        </div>
    );
};

export default Todo
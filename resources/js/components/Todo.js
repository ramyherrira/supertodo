import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewTask } from '../reducer';
import BSModal from './BSModal';
import List from './List';

const AddNewTaskBtn = () => {
    return (
        <button type="submit" className="btn btn-primary mb-2">
            <span className="btn-label">
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-plus"
                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd"
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                Ajouter
            </span>
        </button>
    );
};

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
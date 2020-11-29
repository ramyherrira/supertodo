import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {deleteTask, toggleTask} from "../reducer";

const TrashIcon = () => {
    return (
        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
    );
};

const selectTaskById = (state, id) => {
    return state.tasks.find(task => id === task._id);
};

const Task = ({ taskID, onSelected }) => {
    const dispatch = useDispatch();
    const task = useSelector(state => selectTaskById(state, taskID));

    const handleChange = (e) => {
        dispatch(toggleTask(taskID));
    };

    const handleDeleteBtnClick = (e) => {
        dispatch(deleteTask(taskID));
    };

    const handleTaskSelected = (e) => {
        onSelected(taskID);
    };

    return (
        <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between">
            <div className="form-check">
                <input type="checkbox" name="task" className="form-check-input"
                       checked={task.completed} onChange={handleChange} />
                <span data-toggle="modal" data-target="#taskModal" onClick={handleTaskSelected}>{task.title}</span>
            </div>
            <button type="button" className="btn btn-sm btn-outline-danger border-0"
                    onClick={handleDeleteBtnClick}>
                <TrashIcon />
            </button>
        </a>
    );
};

export default Task;
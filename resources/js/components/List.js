import React from 'react';
import Task from './Task';

const EmptyListItem = () => {
    return (
        <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between">
            <i>La liste des tâches est vide</i>
        </a>
    )
};

const List = ({tasks}) => {

    const displayTasks = () => {

        if (tasks.length === 0) {
            return <EmptyListItem />
        }

        return tasks.map(task => React.createElement(Task, {
                key: task._id,
                taskID: task._id
            })
        );
    };

    return (
        <div className="list-group">
            {displayTasks()}
        </div>
    );
};

export default List;

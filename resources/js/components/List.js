import React from 'react';
import Task from './Task';

class List extends React.Component {

    constructor(props) {
        super(props);

        this.handleTaskDeleted = this.handleTaskDeleted.bind(this);
        this.handleSelectTask = this.handleSelectTask.bind(this);
    }
    render() {
        return React.createElement(
            "div",
            null,
            React.createElement("div", {
                    className: 'list-group'
                },

                this.displayTasks()
            )
        );
    }

    displayTasks() {
        if (this.props.tasks.length > 0) {

            return this.props.tasks.map(task => React.createElement(Task, {
                    key: task._id,
                    taskID: task._id,
                    title: task.title,
                    completed: task.completed.toString(),
                    onDeleted: this.handleTaskDeleted,
                    onSelected: this.handleSelectTask
                })
            );

        } else {

            return React.createElement('a', {
                    href: '#',
                    className: 'list-group-item list-group-item-action d-flex justify-content-between'
                },
                React.createElement("i", null, "La todo liste est vide")
            )
        }
    }

    handleTaskDeleted(e) {
        this.props.onDeleted(e);
    }

    handleSelectTask(e) {
        this.props.onSelected(e);
    }
}

export default List;

import React from "react";

class Task extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isCompleted : props.completed === 'true'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
        this.handleTaskSelected = this.handleTaskSelected.bind(this);
    }

    render() {
        return React.createElement('a', {
                href: '#',
                className: 'list-group-item list-group-item-action d-flex justify-content-between'
            },
            React.createElement("div", { className: 'form-check'},
                React.createElement("input", {
                    type: "checkbox",
                    name: "task",
                    className: "form-check-input",
                    checked: this.state.isCompleted,
                    onChange: this.handleChange
                }),
                React.createElement("p", {
                    "data-toggle": 'modal',
                    "data-target": "#taskModal",
                    selectid: this.props.taskID,
                    onClick: this.handleTaskSelected
                }, this.props.title),
            ),
            React.createElement("button", {
                type: 'button',
                className: "btn btn-outline-danger",
                delete: this.props.taskID,
                onClick: this.handleDeleteBtnClick
            }, 'X')
        )
    }

    handleChange(e) {
        axios.put('/tasks/' +  this.props.taskID)
            .then(res => {
                console.log(res);

                this.setState(state => ({
                    isCompleted: !state.isCompleted
                }));

                this.props.onDeleted(e);
            })
            .catch(err => {
                console.error(err)
            });
    }

    handleDeleteBtnClick(e) {
        let id = e.target.getAttribute('delete');

        axios.delete('/tasks/' + id)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.error(err)
            });

        this.props.onDeleted(e);
    }

    handleTaskSelected(e) {
        this.props.onSelected(e);
    }
}

export default Task;
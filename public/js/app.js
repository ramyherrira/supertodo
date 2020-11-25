class BSModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            "div", {
                id: "taskModal",
                className: "modal fade",
                tabIndex: "-1",
                "aria-labelledby": "modallabel",
                "aria-hidden": "true"
            },
            React.createElement(
                "div",
                {className: "modal-dialog"},
                React.createElement(
                    "div",
                    {className: "modal-content"},
                    React.createElement("div", {className: "modal-header"},
                        React.createElement(
                            "h5",
                            {className: "modal-title"},
                            "Tâche #" + this.props.id
                        ),
                        React.createElement(
                            "button",
                            {
                                type: "button",
                                className: "close",
                                "data-dismiss": "modal",
                                "aria-label": "Close"
                            },
                            React.createElement("span", {"aria-hidden":"true"}, "x")
                        )
                    ),
                    React.createElement("div", {className: "modal-body"},
                        React.createElement("ul", null,
                            React.createElement("li", null, "Titre: " + this.props.title),
                            React.createElement("li", null, "Status: " + this.props.status),
                            React.createElement("li", null, "Créé le: " + this.props.created),
                        )
                    ),
                    React.createElement("div", {className: "modal-footer"},
                        React.createElement("button", {
                                className: "btn btn-primary",
                                "data-dismiss": "modal"
                            },
                            "Fermer"
                        )
                    ),
                )
            )
        );
    }
}

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
                    // href: "#",
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

class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            tasks: [],
            selected: {
                _id : 0,
                title: 0,
                completed: true,
                created_at: 'now'
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTaskDeleted = this.handleTaskDeleted.bind(this);
        this.handleSelectTask = this.handleSelectTask.bind(this);
    }
    render() {
        return React.createElement(
            "div",
            null,
            React.createElement("div", null, React.createElement("h1", null, 'Super Todo')),
            React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    {
                        className: 'form-inline',
                        onSubmit: this.handleSubmit
                    },

                    React.createElement('input', {
                        id: "title",
                        type: "text",
                        className: "form-control mb-2 mr-sm-2",
                        placeholder: "Titre de la tâche",
                        onChange: this.handleChange,
                        value: this.state.title,
                    }),

                    React.createElement('button', {
                        type: 'submit',
                        className: "btn btn-primary mb-2"
                    }, 'Ajouter')
                ),
                React.createElement(List, {
                    tasks: this.state.tasks,
                    onDeleted: this.handleTaskDeleted,
                    onSelected: this.handleSelectTask
                }),
                React.createElement(BSModal, {
                    id: this.state.selected._id,
                    title: this.state.selected.title,
                    status: this.state.selected.completed === true ? "Complétée" : "Non Complétée",
                    created: this.state.selected.created_at
                })
            )
        );
    }

    componentDidMount() {
        axios.get('tasks')
            .then(response => {
                this.setState({
                    tasks: response.data.tasks
                })
            });
    }

    handleTaskDeleted(e) {
        axios.get('tasks')
            .then(response => {
                this.setState({
                    title: '',
                    tasks: response.data.tasks
                })
            });
    }

    handleSelectTask(e) {
        let id = e.target.getAttribute('selectid');
        console.log(id);

        for(let i = 0; i < this.state.tasks.length; i++) {
            let task = this.state.tasks[i];
            if (id === task._id) {
                this.setState({
                    selected: task
                });
            }
        }
    }

    handleChange(e) {
        this.setState({title: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.formIsValid()) {

            axios.post('tasks', {
                title: this.state.title
            })
                .then(res => {
                    console.log(res);


                    axios.get('tasks')
                        .then(response => {
                            this.setState({
                                title: '',
                                tasks: response.data.tasks
                            })
                        });

                })
                .catch(err => console.error(err));

        }
    }

    formIsValid() {
        return this.state.title.length > 0;
    }
}



ReactDOM.render(
    React.createElement(Todo),
    document.getElementById('app')
);
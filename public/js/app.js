class Task extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isCompleted : props.completed === 'true'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
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
                this.props.title,
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
}

class List extends React.Component {

    constructor(props) {
        super(props);

        this.handleTaskDeleted = this.handleTaskDeleted.bind(this);
    }
    render() {
        return React.createElement(
            "div",
            null,
            React.createElement("div", {
                    className: 'list-group'
                },

                this.props.tasks.map(task => React.createElement(Task, {
                        key: task._id,
                        taskID: task._id,
                        title: task.title,
                        completed: task.completed.toString(),
                        onDeleted: this.handleTaskDeleted
                    })
                )
            )
        );
    }

    handleTaskDeleted(e) {
        this.props.onDeleted(e);
    }
}

class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            tasks: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTaskDeleted = this.handleTaskDeleted.bind(this);
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
                        placeholder: "The task",
                        onChange: this.handleChange,
                        value: this.state.title,
                    }),

                    React.createElement('button', {
                        type: 'submit',
                        className: "btn btn-primary mb-2"
                    }, 'Add')
                ),
                React.createElement(List, {
                    tasks: this.state.tasks,
                    onDeleted: this.handleTaskDeleted
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
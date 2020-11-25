class Task extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isCompleted : props.completed === 'true'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return React.createElement('a', {
                href: '#',
                className: 'list-group-item list-group-item-action'
            },
            React.createElement("div", { className: 'form-check'},
                React.createElement("input", {
                    type: "checkbox",
                    name: "task",
                    className: "form-check-input",
                    checked: this.state.isCompleted,
                    onChange: this.handleChange
                }),
                this.props.title
            )
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
}

class List extends React.Component {
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
                        completed: task.completed.toString()
                    })
                )
            )
        );
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
                    tasks: this.state.tasks
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
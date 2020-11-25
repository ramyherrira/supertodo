class List extends React.Component {
    render() {
        return React.createElement(
            "div",
            null,
            React.createElement("div", {
                    className: 'list-group'
                },

                this.props.tasks.map(task => React.createElement('a', {
                            key: task.id,
                            href: '#',
                            className: 'list-group-item list-group-item-action'
                        },
                        task.title
                    )
                )

            )
        );
    }
}
/**
<div className="todo">

    <div className="list-group">
        <a href="#" className="list-group-item list-group-item-action">
            <div className="form-check">
                <input type="checkbox" name="task" className="form-check-input"/>
                Cras justo odio
            </div>
        </a>
        <a href="#" className="list-group-item list-group-item-action">
            <div className="form-check">
                <input type="checkbox" name="task" className="form-check-input"/>
                Another Task
            </div>
        </a>

    </div>

</div>
*/
class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            tasks: [
                {
                    id: 1,
                    title: 'Task #1',
                    completed: false,
                },

                {
                    id: 2,
                    title: 'Task #2',
                    completed: false,
                }
            ]
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

    handleChange(e) {
        this.setState({title: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.formIsValid()) {

            let newTask = {
                title: this.state.title,
                completed: false,
                id: Math.random() * 100
            };

            this.setState(state => ({
                title: '',
                tasks: state.tasks.concat(newTask)
            }));
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
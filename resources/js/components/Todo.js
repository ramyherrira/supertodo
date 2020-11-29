import React from 'react';
import ReactDOM from 'react-dom';
import BSModal from './BSModal';
import List from './List';

class Todo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            tasks: [],
            selected: {
                _id: 0,
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

    handleSelectTask(id) {
        for (let i = 0; i < this.state.tasks.length; i++) {
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

    render() {
        return (

            <div>
                <div>
                    <form className="form-inline" onSubmit={this.handleSubmit}>

                        <label className="col sr-only" htmlFor="title">Title</label>
                        <input
                            type="text" className="col-10 form-control mb-2 mr-sm-2"
                            id="title" placeholder="Titre de la tâche"
                            value={this.state.title}
                            onChange={this.handleChange}/>

                        <button type="submit" className="col btn btn-primary mb-2">
                            <span className="btn-label">
                                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-plus"
                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd"
                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                Ajouter
                            </span>
                        </button>
                    </form>

                    <List tasks={this.state.tasks}
                          onDeleted={this.handleTaskDeleted}
                          onSelected={this.handleSelectTask}/>
                </div>

                <BSModal
                    id={this.state.selected._id}
                    title={this.state.selected.title}
                    status={this.state.selected.completed === true ? "Complétée" : "Non Complétée"}
                    created={this.state.selected.created_at}/>
            </div>
        );
    }
}

export default Todo
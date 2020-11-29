import React, { useState, useEffect } from 'react';
import BSModal from './BSModal';
import List from './List';

const AddNewTaskBtn = () => {
    return (
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
    );
};

const Todo = ()  => {
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [selected, setSelected] = useState({
        _id: 0,
        title: 0,
        completed: true,
        created_at: 'now'
    });

    useEffect(() =>  {
        axios
            .get('/tasks')
            .then(
                response => setTasks(response.data.tasks)
            );
    }, []);

    const handleTaskDeleted = (e) => {
        axios.get('tasks')
            .then(response => {
                setTitle('');
                setTasks(response.data.tasks);
            });
    };

    const handleSelectTask = (id) => {
        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];

            if (id === task._id) {
                setSelected(task);
            }
        }
    };

    const handleChange = (e) => setTitle(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formIsValid()) {
            axios
                .post('/tasks', {
                    title: title
                })
                .then(res => {
                    console.log(res);

                    axios
                        .get('/tasks')
                        .then(response => {
                            setTitle('');
                            setTasks(response.data.tasks);
                        });
                })
                .catch(err => console.error(err));
        }
    };

    const formIsValid = () => title.length > 0;

    return (
        <div>
            <div>
                <form className="form-inline" onSubmit={handleSubmit}>

                    <label className="col sr-only" htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="col-10 form-control mb-2 mr-sm-2"
                        id="title"
                        placeholder="Titre de la tâche"
                        value={title}
                        onChange={handleChange} />

                    <AddNewTaskBtn />
                </form>

                <List tasks={tasks}
                      onDeleted={handleTaskDeleted}
                      onSelected={handleSelectTask}/>
            </div>

            <BSModal
                id={selected._id}
                title={selected.title}
                status={selected.completed === true ? "Complétée" : "Non Complétée"}
                created={selected.created_at}/>
        </div>
    );
};

export default Todo
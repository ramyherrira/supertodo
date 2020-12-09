import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import Todo from './components/Todo'
import store from './store'
import { fetchTasks } from './actions/index';

store.dispatch(fetchTasks);

if (document.getElementById('todo-app')) {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <Todo />
            </Provider>
        </React.StrictMode>,
        document.getElementById('todo-app')
    );
}
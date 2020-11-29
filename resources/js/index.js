import ReactDOM from "react-dom";
import React from "react";
import Todo from './components/Todo'
import store from './store'

store.dispatch({ type: 'Hi_THERE', payload: 'mwé' });

if (document.getElementById('todo-app')) {
    ReactDOM.render(
        React.createElement(Todo),
        document.getElementById('todo-app')
    );
}
import React from "react";
import { useSelector } from 'react-redux';

const BSModal = () => {
    const task = useSelector(state => {
        const id = state.selectId;
        return state.tasks.find(task => id === task._id )
    }) ?? {};

    const displayStatus = (task) => {
        return task.completed === true
            ? "Complétée"
            : "Non Complétée"
        ?? 'N/A';
    };

    return (
        <div id="taskModal" className="modal fade" tabIndex="-1" aria-labelledby="modallabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Tâche {task._id ?? '001'}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">x</span></button>
                    </div>
                    <div className="modal-body">
                        <ul>
                            <li>Titre: {task.title ?? 'Titre de la tâche'}</li>
                            <li>Status: { displayStatus(task) }</li>
                            <li>Créé le: {task.created ?? 'Demain'}</li>
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" data-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BSModal;
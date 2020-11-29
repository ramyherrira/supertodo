import React from "react";

const BSModal = ({ id, title, status, created}) => {

    return (
        <div id="taskModal" className="modal fade" tabIndex="-1" aria-labelledby="modallabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Tâche {id}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">x</span></button>
                    </div>
                    <div className="modal-body">
                        <ul>
                            <li>Titre: {title}</li>
                            <li>Status: {status}</li>
                            <li>Créé le: {created}</li>
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
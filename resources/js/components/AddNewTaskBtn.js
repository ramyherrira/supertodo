import React from "react";

const AddNewTaskBtn = () => {
    return (
        <button type="submit" className="btn btn-primary mb-2">
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

export default AddNewTaskBtn;
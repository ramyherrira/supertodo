import React from "react";

class BSModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            "div", {
                id: "taskModal",
                className: "modal fade",
                tabIndex: "-1",
                "aria-labelledby": "modallabel",
                "aria-hidden": "true"
            },
            React.createElement(
                "div",
                {className: "modal-dialog"},
                React.createElement(
                    "div",
                    {className: "modal-content"},
                    React.createElement("div", {className: "modal-header"},
                        React.createElement(
                            "h5",
                            {className: "modal-title"},
                            "Tâche #" + this.props.id
                        ),
                        React.createElement(
                            "button",
                            {
                                type: "button",
                                className: "close",
                                "data-dismiss": "modal",
                                "aria-label": "Close"
                            },
                            React.createElement("span", {"aria-hidden":"true"}, "x")
                        )
                    ),
                    React.createElement("div", {className: "modal-body"},
                        React.createElement("ul", null,
                            React.createElement("li", null, "Titre: " + this.props.title),
                            React.createElement("li", null, "Status: " + this.props.status),
                            React.createElement("li", null, "Créé le: " + this.props.created),
                        )
                    ),
                    React.createElement("div", {className: "modal-footer"},
                        React.createElement("button", {
                                className: "btn btn-primary",
                                "data-dismiss": "modal"
                            },
                            "Fermer"
                        )
                    ),
                )
            )
        );
    }
}

export default BSModal;
var React= require("react");
var ReactPropTypes = React.PropTypes;
var TodoTextInput = require("./TodoTextInput.react");

var TodoActions = require("../actions/TodoActions");

var TodoItem = React.createClass({
    propTypes: {
        id: ReactPropTypes.string.isRequired,
        text: ReactPropTypes.string.isRequired,
    },
    getInitialState: function(){
        return {
            isEditing: false
        };
    },
    render: function(){
        var input = {};
        if(this.state.isEditing){
            input = <TodoTextInput onSave={this._onSave} value={this.props.text} />
        }
        return (
            <li>
                <span
                  onDoubleClick={this._onDoubleClick}
                >
                {this.props.text}
                </span>
                {input}
                <button 
                    type="button"
                    id={this.props.id}
                    onClick={this._onDestroy}
                >X</button>
            </li>
        );
    },
    _onDoubleClick: function(){
        this.setState({ isEditing: true });
    },
    _onSave: function(text){
        TodoActions.updateText(this.props.id, text);
        this.setState({ isEditing: false });
    },
    _onDestroy: function(){
        TodoActions.destroy(event.target.id);
    },
});

module.exports = TodoItem;

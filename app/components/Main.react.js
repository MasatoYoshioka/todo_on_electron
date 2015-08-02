var React = require("react");
var TodoStore = require("../stores/TodoStore");
var TodoActions = require("../actions/TodoActions");

var TodoTextInput = require("./TodoTextInput.react");
var TodoItems = require("./TodoItems.react");


function getTodoState(){
    return {
        allTodos: TodoStore.getAll(),
    };
}

var Main = React.createClass({
    getInitialState: function(){
        return getTodoState();
    },
    componentDidMount: function(){
        TodoStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        TodoStore.removeChangeListener(this._onChange);
    },
    render: function(){
        return (
            <div className="Todo_main">
                <TodoTextInput 
                    onSave={this._onSave}
                />
                <TodoItems 
                    allTodos={this.state.allTodos}
                />
            </div>
        );
    },
    _onChange: function(){
        this.setState(getTodoState());
    },
    _onSave: function(text){
        if(text.trim()){
            TodoActions.create(text);
        }
    },
});

module.exports = Main;

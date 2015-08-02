var React = require("react");
var ReactPropTypes = React.PropTypes;

var TodoItem = require("./TodoItem.react");

var TodoItems = React.createClass({
    propTypes: {
        allTodos: ReactPropTypes.object.isRequired
    },
    render: function(){
        if(Object.keys(this.props.allTodos).length < 1 ){
            return null;
        }
        var allTodos = this.props.allTodos;
        return (
            <div className="Todo_list">
                { Object.keys(allTodos).map(function(key){
                    return <TodoItem 
                        id={key} 
                        text={allTodos[key].text}
                    />;
                })}
            </div>
        );
    },
});

module.exports = TodoItems;

var React = require("react");
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var TodoTextInput = React.createClass({
    propTypes:{
        onSave: ReactPropTypes.func.isRequired,
        value:  ReactPropTypes.string
    },
    getInitialState: function(){
        return {
            value: this.props.value || ''
        }
    },

    render: function(){
        return (
            <div className="Todo_input">
                <input type="text" 
                    onBlur={this._save}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    value={this.state.value}
                    autoFocus={true}
                />
            </div>
        );
    },
    _save: function(){
        this.props.onSave(this.state.value);
        this.setState({
            value: ''
        });
    },
    _onChange: function(){
        this.setState({
            value: event.target.value
        });
    },
    _onKeyDown: function(){
        if(event.keyCode === ENTER_KEY_CODE) {
            this._save();
        }
    }
});

module.exports = TodoTextInput;

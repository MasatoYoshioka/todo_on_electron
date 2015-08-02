var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var TodoConstants = require("../constants/TodoConstants");
var assign = require("object-assign");

var CHANGE_EVENT = 'change';

var _todos = {};

var TodoStore = assign({}, EventEmitter.prototype, {
    getAll: function(){
        return _todos;
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },
});

function create(text){
    var id = (+new Date() + Math.floor(Math.random() * 9999 )).toString(36);
    _todos[id] = {
        id: id,
        text: text
    }
};

function update(id, updates){
    _todos[id] = assign({}, _todos[id], updates );
};

function destroy(id){
    delete _todos[id];
};

AppDispatcher.registor(function(action){
    var text;

    switch(action.actionType){
        case TodoConstants.TODO_CREATE:
            text = action.text.trim();
            if(text !== '') {
                create(text);
                TodoStore.emitChange();
            }
            break;
        case TodoConstants.TODO_UPDATE_TEXT:
            text = action.text.trim();
            if( text !== '') {
                update(text);
                TodoStore.emitChange();
            }
            break;
        case TodoConstants.TODO_DESTROY:
            destroy(action.id);
            TodoStore.emitChange();
            break;
        default:
            
    }
});

module.exports = TodoStore;

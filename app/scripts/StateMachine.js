var State = function( name ) {

    this.name = name;

};

State.prototype.doActions       = function() {};
State.prototype.checkConditions = function() {};
State.prototype.entryActions    = function() {};
State.prototype.exitActions     = function() {};


var StateMachine = function() {

    this.states = {};
    this.activeState = undefined;

};


StateMachine.prototype.addState = function( state ) {

    this.states[state.name] = state;

};


StateMachine.prototype.think = function() {

    if (this.activeState === undefined) {

        return;

    }

    this.activeState.doActions();

    var newStateName = this.activeState.checkConditions();

    if (newStateName !== undefined) {

        this.setState(newStateName);

    }
};


StateMachine.prototype.setState = function( newStateName ) {

    if (this.activeState !== undefined) {

        this.activeState.exitActions();

    }

    this.activeState = this.states[newStateName];
    this.activeState.entryActions();

};
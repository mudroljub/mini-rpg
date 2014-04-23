var Machine = function() {};

Machine.prototype.generate = function(TreeJson, actor, states) {
    states = states || actor;
    return this.read(TreeJson, null, actor, states);
};


Machine.prototype.read = function(subTreeJson, parent, actor, states) {
    var node = null;
    if (subTreeJson.pointer == true) {
        node = new Pointer(subTreeJson.id, subTreeJson.strategy, parent, actor, states);
    } else {
        node = new State(subTreeJson.id, subTreeJson.test, subTreeJson.strategy, parent, actor, states);
    }

    node.report = subTreeJson.report;

    if (subTreeJson.children !== undefined) {
        for (var i = 0; i < subTreeJson.children.length; i++) {
            node.children[node.children.length] = this.read(subTreeJson.children[i], node, actor, states);
        }
    }
    return node;
};


Machine.prototype.getClassName = function() {
    return "Machine";
};


var Node = function(id, test, strategy, parent, actor, states) {
    this.id = id;
    this.test = test;
    this.strategy = strategy;
    this.parent = parent;
    this.actor = actor;
    this.states = states;
    this.children = [];
};


Node.prototype.tick = function() {
    var nextState = this.nextState();

    if (this.isAction()) {
        this.run();
    }

    if (nextState !== null) {
        nextState = nextState.transition();
    } else if (this.can()) {
        nextState = this;
    } else {
        nextState = this.nearestRunnableAncestor().transition();
    }

    return nextState;

};


Node.prototype.nextState = function() {
    var strategy = this.strategy,
        ancestor = null;

    if (strategy === undefined) {
        ancestor = this.nearestAncestorWithStrategy();

        if (ancestor !== null) {
            strategy = ancestor.strategy;
        }
    }

    if (strategy !== null) {
        return this[strategy].call(this);
    } else {
        return null;
    }
};


Node.prototype.isTransition = function() {
    return this.children.length > 0 || this instanceof Pointer;
};


Node.prototype.isAction = function() {
    return !this.isTransition();
};


Node.prototype.can = function() {
    var fn = this.test;
    if (fn === undefined) {
        fn = "can" + this.id[0].toUpperCase() + this.id.substring(1, this.id.length);
    }
    if(this.states[fn] !== undefined) {
        return this.states[fn].call(this.actor);
    } else {
        return true;
    }
};


Node.prototype.prioritised = function() {
    return this.nextRunnable(this.children);
};


Node.prototype.nextRunnable = function(nodes) {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].can()) {
            return nodes[i];
        }
    }

    return null;
};


Node.prototype.sequential = function() {
    var foundThis = false,
        sibling = null,
        firstRunnableChild = null;
    
    if (this.isAction()) {
        for (var i = 0; i < this.parent.children.length; i++) {
            sibling = this.parent.children[i];
            if (this.id === sibling.id) {
                foundThis = true;
            } else if (foundThis && sibling.can()) {
                return sibling;
            }
        }
    } else {
        firstRunnableChild = this.nextRunnable(this.children);
        if (firstRunnableChild !== null) {
            return firstRunnableChild;
        }
    }
    return this.nearestRunnableAncestor();
};


Node.prototype.nearestAncestor = function(test) {
    if (this.parent === null) {
        return null;
    } else if (test.call(this.parent) === true) {
        return this.parent;
    } else {
        return this.parent.nearestAncestor(test);
    }
};


Node.prototype.getRootNode = function() {
    if (this.parent === null) {
        return this;
    } else {
        return this.parent.getRootNode();
    }
};


Node.prototype.nearestAncestorWithStrategy = function() {
    return this.nearestAncestor(function() {
        return this.strategy !== undefined && this.strategy !== null; 
    });
};


Node.prototype.nearestRunnableAncestor = function() {
    return this.nearestAncestor(function() {
        return this.can();
    });
};


Node.prototype.nearestNamesakeAncestor = function(id) {
    return this.nearestAncestor(function() {
        return this.id === id;
    });
};


Node.prototype.getClassName = function() {
    return "Node";
};


var State = function(id, test, strategy, parent, actor, states) {
    Node.call(this, id, test, strategy, parent, actor, states);
};


State.prototype = new Node();
State.prototype.constructor = Node;


State.prototype.transition = function() {
    return this;
};

State.prototype.run = function() {
    this.states[this.id].call(this.actor);
};


State.prototype.getClassName = function() {
    return "State";
};


var Pointer = function(id, test, strategy, parent, actor, states) {
    Node.call(this, id, test, strategy, parent, actor, states);
};


Pointer.prototype = new Node();
Pointer.prototype.constructor = Node;


Pointer.prototype.transition = function() {
    return this[this.strategy].call(this);
};


Pointer.prototype.hereditory = function() {
    return this.nearestNamesakeAncestor(this.id);
};

Pointer.prototype.getClassName = function() {
    return "Pointer";
};

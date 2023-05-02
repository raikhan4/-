function KeyboardInputManager() {
  this.events = {};

  this.listen();
}

KeyboardInputManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

KeyboardInputManager.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

KeyboardInputManager.prototype.listen = function () {
  var self = this;

  var map = {
    38: { key: 0, type: 'arrow' },
    39: { key: 1, type: 'arrow' }, 
    40: { key: 2, type: 'arrow' }, 
    37: { key: 3, type: 'arrow' }, 

    81: { x: 0, y: 1, type: 'button' },
    69: { x: 1, y: 1, type: 'button' }, 
    68: { x: 1, y: 0, type: 'button' }, 
    65: { x: 0, y: 0, type: 'button' }, 

    82: { key: 'restart', type: 'common' }  
  };

  document.addEventListener('keydown', function (event) {
    var modifiers = event.altKey && event.ctrlKey && event.metaKey &&
                    event.shiftKey;
    var data    = map[event.which];

    if (!modifiers && data !== undefined) {
      event.preventDefault();
      self.emit('move', data);
    }

  });
};
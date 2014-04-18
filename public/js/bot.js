if (typeof window == 'undefined') {
  global.window = global;
}

window.Bot = (function() {
  var registrants = {};

  return {
    register: function(name, callback) {
      registrants[name] = callback;
    },
    getBot: function(name) {
      return registrants[name];
    }
  };
})();

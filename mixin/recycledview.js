define(['mixin', 'underscore'],
    function(Mixin, _) {
  var RecycledViewMixin = Mixin.extend({
    mix: function(Constructor) {
      var originalDispose = Contructor.prototype.dispose || _.identity;
      var cache = [];

      function RecycledConstructor(options) {
        var instance;

        if (cache.length) {
          instance = cache.pop();
          Constructor.call(instance, options);
        } else {
          instance = new Constructor(options);
        }

        return instance;
      }

      Constructor.prototype.dispose = function() {
        originalDispose.apply(this, arguments);
        this.stopListening();
        this.undelegateEvents();
        cache.push(this);
      };

      _.extend(RecycledConstructor, Constructor);
      RecycledConstructor.prototype = Contructor.prototype;

      return RecycledConstructor;
    }
  });

  return RecycledViewMixin;
});

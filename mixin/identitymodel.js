// This pattern inspired by the excellent example found here:
// https://github.com/shinetech/backbone-identity-map/

define(['mixin', 'underscore'],
    function(Mixin, _) {
  var IdentityModelMixin = Mixin.extend({
    mix: function(Constructor) {
      var map = {};

      function IdentityConstructor(attributes, options) {
        var idAttribute = Constructor.prototype.idAttribute;
        var id = attributes && attributes[idAttribute];
        var instance;

        if (id) {
          if (!map[id]) {
            instance = map[id] = new Constructor(attributes, options);
          } else {
            instance = map[id];
            if (options && options.parse) {
              attributes = instance.parse(attributes);
            }
            instance.set(attributes);
          }
        } else {
          instance = new Constructor(attributes, options);
          instance.on('change:' + idAttribute, function() {
            map[id] = instance;
            instance.off(null, null, this);
          }, this);
        }

        return instance;
      }

      _.extend(IdentityConstructor, Constructor);
      IdentityConstructor.prototype = Constructor.prototype;

      return IdentityConstructor;
    }
  });

  return IdentityModelMixin;
});

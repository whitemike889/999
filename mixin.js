define(['backbone'],
    function(Backbone) {
  Mixin.mix = function(Constructor) {
    return Constructor;
  };

  Mixin.extend = function(static) {
    return _.extend({}, this, static);
  };

  return Mixin;
});

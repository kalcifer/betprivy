Router.map(function() {
  this.route('index', {
    path: '/',
    layoutTemplate: 'layout'
  });
  this.route('new', {
    layoutTemplate: 'layout'
  });
});
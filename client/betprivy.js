  Meteor.subscribe("tables");
// if (Meteor.isClient) {
  Template.layout.greeting = function () {
    return "Sample App";
  };

  Template.emailList.data = function() {
    return Session.get('emailList') || [];
  };

  Template.new.destroyed = function() {
    Session.set('emailList', []);
  };

  Template.new.rendered = function() {
    $(this.find('[type=text]')).focus();
  };

  Template.index.tables = function(){
    return Tables.find();
  };

  Template.new.events({
    'click .add-more': function (event, template) {
      if (typeof console !== 'undefined')
        console.log(template.find('[type=email]').value, Template.emailList);

      var data = Template.emailList.get('data'),
          email = template.find('[type=email]').value;
      if(email && email.indexOf('@') > 0 && email.indexOf('.') > 0){
        data.push(email);
        data = _.uniq(data);
        Session.set('emailList', data);
        $(template.find('[type=email]')).val('').focus();
      }
    },
    'submit': function(event, template) {
      console.log(this, arguments, template, event, Meteor.userId());
      event.preventDefault();
      var name = template.find('[type=text]').value,
      invited = [];
      $(template.findAll('li.invitee')).each(function(item){
        invited.push($(this).data('email'));
      });
      if(Meteor.userId() && name && invited){
        Tables.insert({
          owner: Meteor.userId(),
          name: name,
          public: false,
          invited: invited
        }, function(){
          console.log(arguments);
          Router.go('index');
        });        
      }
    }
  });

  Template.layout.events({
    'click .home': function () {
      Router.go('index');
    }
  });

  Template.emailList.events({
    'mouseenter li': function(event, template){
      var $target = $(event.currentTarget);
      $target.find('i').removeClass('hide');
    },
    'mouseleave li': function(event, template){
      var $target = $(event.currentTarget);
      $target.find('i').addClass('hide');
    },
    'click .icon-remove': function(event, template){
      if(this && this.toString()){
        var data = Template.emailList.get('data');
        data = _.without(data, this.toString());
        Session.set('emailList', data);
      }
    }
  });
// }

// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }

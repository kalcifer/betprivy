Meteor.publish("tables", function () {
  return Tables.find(); // everything
});
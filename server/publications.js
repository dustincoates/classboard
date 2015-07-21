Meteor.publish('board', function(id){
  check(id, String);
  return Boards.find(id);
});

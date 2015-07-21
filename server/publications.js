Meteor.publish('board', function(id){
  check(id, String);
  return Boards.find(id);
});

Meteor.publish('resources', function(boardId){
  check(boardId, String);
  return Resources.find({boardId: boardId});
});

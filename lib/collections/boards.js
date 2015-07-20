Boards = new Mongo.Collection('boards');

Meteor.methods({
  insertBoard: function(){
    var user = Meteor.user(),
        board = {
          userId: user._id,
          username: user.username,
          dateCreated: new Date()
        },
        boardId = Boards.insert(board);

    return {
      _id: boardId
    };
  }
});

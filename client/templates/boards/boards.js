Template.boards.events({
  'click .insert-board': function(e){
    e.preventDefault();

    Meteor.call('insertBoard', null, function(error, result){
      if(error){
        console.log(error.reason);
      } else {
        Router.go('board', {_id: result._id});
      }
    });
  }
});

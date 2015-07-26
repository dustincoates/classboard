Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});

Router.route('/board/:_id', {
  name: 'board',
  data: function(){
    return {
      resources: Resources.find({boardId: this.params._id})
    }
  },
  waitOn: function(){
    return [
      Meteor.subscribe('board', this.params._id),
      Meteor.subscribe('resources', this.params._id)
    ];
  },
  onAfterAction: function(){
    if(Meteor.user()){
      // TODO: Only show resources submitted _after_ user signs up
      // or after user has last logged in
      var resourcesCursor = Resources.find({
        boardId: this.params._id,
        userId: {$ne: Meteor.userId()}
      });
      resourcesCursor.observeChanges({
        added: function (id, fields) {
          var message = "A new " + fields.type + " message has been posted.";
          sendNotifications(message);
        }
      });
    }
  }
});

Router.route('/board/:_id/admin', {
  name: 'boardAdmin',
  data: function(){
    return {
      board: Boards.findOne(this.params._id),
      resources: Resources.find({boardId: this.params._id})
    }
  },
  waitOn: function(){
    return [
      Meteor.subscribe('board', this.params._id),
      Meteor.subscribe('resources', this.params._id)
    ]
  },
  onBeforeAction: function(){
    var board = Boards.findOne(this.params._id);

    if(board.userId !== Meteor.userId()) {
      this.render('accessDenied');
    } else {
      this.next();
    }
  }
});

Router.route('/', {
  name: 'boards'
});

Router.onBeforeAction('dataNotFound', {only: ['board', 'boardAdmin']});

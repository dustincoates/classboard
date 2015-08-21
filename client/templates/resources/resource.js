Template.resource.helpers({
  isCode: function(type){
    return type === 'code';
  },
  isURL: function(type){
    return type === 'url';
  }
});

Template.resource.onRendered(function(){
  Prism.highlightAll();

  if(this.data.userId !== Meteor.userId() && secondsAgo(this.data.submitted) < 90){
    sendNotifications('New Post', {
      body: this.data.content,
      icon: '/images/notification.png',
      tag: this.data.boardId
    });
  }
});

var secondsAgo = function(submittedTime){
  return (new Date() - submittedTime) / 1000;
}

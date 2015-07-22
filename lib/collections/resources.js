Resources = new Mongo.Collection('resources');

Resources.helpers({
  validTypes: function(){
    return [
      "url",
      "code",
      "plain text"
    ];
  }
});

validateResource = function(resource){
  var errors = {};

  if(!resource.type) {
    errors.type = "You must choose a type.";
  }

  if(!resource.content) {
    errors.content = "You must add some content to show.";
  }

  return errors;
}

Meteor.methods({
  insertResource: function(boardId, attributes){
    check(Meteor.userId(), String);
    check(boardId, String);
    check(attributes, {
      type: String,
      content: String
    });

    var errors = validateResource(attributes);
    if(errors.type || errors.content){
      throw new Meteor.Error('invalid-resource', 'You must have a type and content for your resource.');
    }

    var user = Meteor.user(),
      resource = _.extend(attributes, {
        userId: user._id,
        owner: user.username,
        submitted: new Date()
      }),
      resourceId = Resources.insert(resource);

    return {
      _id: resourceId
    }

  }
});

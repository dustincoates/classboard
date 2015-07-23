Template.resourceForm.helpers({
  resourceTypes: function(){
    return Resources.validTypes();
  }
});

Template.resourceForm.events({
  'submit form': function(e){
    e.preventDefault();

    var resource = {
      content: $(e.target).find('#content').val(),
      type: $(e.target).find('#type').val(),
      boardId: this.board._id
    };

    var errors = validateResource(resource);

    if(errors.content || errors.type){
      return alert("Make sure you have everything filled out.");
      // TODO: This should be handled more gracefully
    }

    Meteor.call('insertResource', resource, function(err, result){
      if(err){
        return alert("Something went wrong.");
        // TODO: This should highlight the inputs
      }
    });
  }
});

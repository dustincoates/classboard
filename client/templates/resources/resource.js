Template.resource.helpers({
  isCode: function(type){
    return type === "code";
  },
  isURL: function(type){
    return type === "url";
  }
});

Template.resource.onRendered(function(){
  Prism.highlightAll();
});

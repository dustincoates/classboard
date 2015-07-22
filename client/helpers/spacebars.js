Template.registerHelper("titleCase", function(text){
  // Doesn't cover all edge cases
  return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
});

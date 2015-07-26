var createNotification = function(message, options){
  var notification = new Notification(message, options);
  setTimeout(notification.close.bind(notification), 6000);
}

sendNotifications = function(message, options){
  if(!"Notification" in window){
    return null;
  } else if(Notification.permission === "granted") {
    createNotification(message, options);
  } else if(Notification.permission !== "denied"){
    Notification.requestPermission(function(permission){
      if(permission === "granted"){
        createNotification(message, options);
      }
    });
  }
}

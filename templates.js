var templates = {};

templates.newMessage = [
  "<ul class = 'messageContainer'>",
  "<li class = 'messageContent' data-id = '<%= _id%>'><a href='#' class='fa fa-trash-o'></a><%= message %></li>",
  "<li class = 'messageCreator arrow_box'><%= username %></li>",
  "</ul>"
].join("");

templates.username = [
  "<span>You are <span class='username'><%= username %></span></span>"
].join("");

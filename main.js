$(document).ready(function(){

  page.init();
  setInterval(function () {

    $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        if(data.length !== page.currentDataLength()){
        console.log("Successfully loaded new data");
        $('.textField').empty();
        page.addAllMessages(data);
        }
      },
      error: function (err) {
        console.log("Error: ", err)
      }
    });
  }, 500);

});

var page ={

  init: function(arguments){
    page.initStyling();
    page.initEvents();
  },

  initStyling: function(arguments){
    page.loadMessages();

  },

  initEvents: function(arguments){
    $('.chatBar').on('keypress', '.chatTextBox', page.messageEnterPress);
    $('body').on('keypress', '.usernameTextBox', page.usernameEnterPress);
    $('.textField').on('click', 'a', page.deleteItem);
  },

  url: "http://tiy-fee-rest.herokuapp.com/collections/spacechat",

  loadMessages: function () {
    $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        console.log("Successfully loaded data");
        page.addAllMessages(data);
        console.log(data.length);
      },
      error: function (err) {
        console.log("Error: ", err)
      }
    });
  },

  currentDataLength: function(){
    $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        return data.length;
      },
      error: function (err) {
        console.log("Error: ", err)
      }
    });
  },

  createMessage: function (newMessage) {
    $.ajax({
      url: page.url,
      method: 'POST',
      data: newMessage,
      success: function (data) {
        page.addOneMessage(data);
      },
      error: function (err) {
        console.log("Error occurred: ", err);
      }
    });
  },

  deleteItem: function(event){
   event.preventDefault();

   if($(this).parent().siblings('.messageCreator').text() === $('.username').text()){

   $.ajax({
     url: page.url + "/" +$(this).closest('li').data('id'),
     method: 'DELETE',
     success: function(data){
       console.log("I work -- deleted")
     }
   });
 }
 },

  addMessage: function (username, input) {
    var newMessage = {
        username: username,
        message: input,
        time: Math.floor((new Date()).getTime() / 1000)
        }
    page.createMessage(newMessage);

    $('input').val("");
  },

  addOneMessage: function(message){
    page.loadTemplate("newMessage", message, $('.textField'));
  },

  addAllMessages: function(listOfMessages){
    _.sortBy(listOfMessages, listOfMessages.time);
    _.each(listOfMessages.reverse(), page.addOneMessage);
  },

  loadTemplate: function(tmplName, data, $target){
    var compiledTmpl = _.template(page.getTemplate(tmplName));
    $target.append(compiledTmpl(data));
  },

  getTemplate: function(name){
   return templates[name];
 },

 messageEnterPress: function(event){
    if(event.keyCode === 13){
    event.preventDefault();
    page.addMessage($('.username').text(), $('input[class="chatTextBox"]').val());
    }
  },

  usernameEnterPress: function(event){
    if(event.keyCode === 13){
      event.preventDefault();
      page.loadTemplate('username',{ username: $('.usernameTextBox').val() }, $('.handleBar'));
      $('.landingPage').addClass('hide');
      $('.spaceZone').removeClass('hide');
      $('.chatBar').removeClass('hide');
      $('.handleBar').removeClass('hide');
    }
  },

  messageRefresh: function(){
    setInterval(page.loadMessages(), 1000);
    console.log("Working?")
  }

};

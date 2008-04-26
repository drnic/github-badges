var GitHubBadge = GitHubBadge || {};
GitHubBadge.buildUserBadge = function(username) {
  var container = '#' + (arguments[1] || 'github-badge');
  (function($){ 
    $(container).empty();
    $(container).buildHeader("My projects", username);
    $(container).buildBody(username);
    $(container).buildFooter();
  })(jQuery); 
};

(function($){
  $.fn.buildBody = function() {
    this.append($(
      "<div class='body'>"
      + "</div>"
      ));
  };
  
  $.fn.buildHeader = function(title, username) {
    var template = $.template(
      "<fieldset>"
      + "<legend class='header'>${title} <span>("
      +   "<a href='http://github.com/${username}'>${username}</a>)"
      + "</span></legend>")
    this.append(template, { title: title, username: username });
  };

  $.fn.buildFooter = function() {
    this.append($(
      "<div class='footer'>"
        + "Powered by <a href='http://github.com'>GitHub</a> | "
        + "Written by <a href='http://drnicwilliams.com'>Dr Nic</a>"
      + "</div>"
      + "</fieldset>"
      ));
  };
})(jQuery); 

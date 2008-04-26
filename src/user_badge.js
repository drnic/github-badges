var GitHubBadge = GitHubBadge || {};
GitHubBadge.buildUserBadge = function(username) {
  var badge = $('#' + (arguments[1] || 'github-badge'));
  (function($){ 
    badge.empty();
    badge.append($("<fieldset></fieldset>"));
    badge.find('fieldset')
      .buildHeader("My projects", username)
      .buildBody(username);
    badge.buildFooter();
  })(jQuery); 
};

GitHubBadge.loadUserInfo = function(data) {
  var template = $.template(
    "<li>${name}</li>"
  );
  var list = $("<ul></ul>");
  $('#github-badge .body')
    .empty()
    .append(list); // TODO - reuse GitHubBadge variable for container
  $.each(data.user.repositories, function(index) {
    list.append(template, this);
  });
};

(function($){
  $.fn.buildBody = function() {
    return this.append($("<div class='body'>loading...</div>"));
  };
  
  $.fn.buildHeader = function(title, username) {
    var template = $.template(
      "<legend class='header'>${title} <span>("
      +   "<a href='http://github.com/${username}'>${username}</a>)"
      + "</span></legend>")
    return this.append(template, { title: title, username: username });
  };

  $.fn.buildFooter = function() {
    return this.append($(
      "<div class='footer'>"
        + "Powered by <a href='http://github.com'>GitHub</a> | "
        + "Written by <a href='http://drnicwilliams.com'>Dr Nic</a>"
      + "</div>"
      + "</fieldset>"
      ));
  };
})(jQuery); 


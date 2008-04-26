var GitHubBadge = GitHubBadge || {};
GitHubBadge.buildUserBadge = function() {
  var container = '#' + (arguments[0] || 'github-badge');
  (function($){ 
    $(document).ready(function() {
      $(container).empty();
      $(container).buildHeader("My projects");
      $(container).buildBody();
      $(container).buildFooter();
    });
  })(jQuery); 
};

(function($){
  $.fn.buildBody = function() {
    this.append($(
      "<div class='body'>"
      + "</div>"
      ));
  };
  
  $.fn.buildHeader = function(title) {
    this.append($(
      "<div class='header'>" + title + "</div>"
      ));
  };

  $.fn.buildFooter = function() {
    this.append($(
      "<div class='footer'>"
        + "Powered by <a href='http://github.com'>GitHub</a> | "
        + "Written by <a href='http://drnicwilliams.com'>Dr Nic</a>"
      + "</div>"
      ));
  };
})(jQuery); 

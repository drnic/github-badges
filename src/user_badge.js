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
  orderedRepos = data.user.repositories.sort(GitHubBadge.compareRepos)
  $.each(orderedRepos, function(index) {
    list.append(template, this);
  });
};

GitHubBadge.compareRepos = function(repo1, repo2) {
  var properties = ['network', 'watched'];
  for (var i=0; i < properties.length; i++) {
    var comparison = GitHubBadge.compareReposProperty(repo1, repo2, properties[i]);
    if (comparison != 0) return comparison;
  };
  return 0;
};

GitHubBadge.compareReposProperty = function(repo1, repo2, property) {
  if ((property in repo1) && !(property in repo2)) return -1;
  if (!(property in repo1) && (property in repo2)) return 1;
  if ((property in repo1) && (property in repo2)) {
    return repo2[property] - repo1[property];
  }
  return 0;
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


/*  GitHub Badge, version 0.1.0
 *  (c) 2008 Dr Nic Williams
 *
 *  GitHub Badge is freely distributable under
 *  the terms of an MIT-style license.
 *  For details, see the web site: http://github.com/drnic/github-badges/tree/master
 *
 *--------------------------------------------------------------------------*/

var GithubBadge = {
  Version: '0.1.0',
};

var GitHubBadge = GitHubBadge || {};
GitHubBadge.buildUserBadge = function(username) {
  (function($){
    $('#github-badge')
      .empty()
      .buildHeader("My projects", username)
      .buildBody(username)
      .buildFooter();
  })(jQuery);
};

GitHubBadge.loadUserInfo = function(data) {
  var template = $.template(
    "<li class='public'>"
    +  "<img src='http://github.com/images/icons/public.png' alt='public'>"
    +  "<strong><a href='${url}'>${name}</a></strong>"
    +"</li>"
  );
  var showMore = $("<div><a href='#' class='more'>Show more</a></div>")
    .find('a')
    .click(function(event) {
      $('#github-badge .body li').show();
      $('#github-badge .more').hide();
      return false;
    });
  var list = $("<div class='repos'><ul id='repo_listing'></ul></div>");
  $('#github-badge .body')
    .empty()
    .append(list)
    .append(showMore);
  list = list.find('ul');
  orderedRepos = data.user.repositories.sort(GitHubBadge.compareRepos)
  $.each(orderedRepos, function(index) {
    list.append(template, this);
  });
  $('#github-badge .body li:gt(9)').hide(); // hide extras
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
var GitHubBadge = GitHubBadge || {};
GitHubBadge.buildUserBadge = function(username) {
  (function($){ 
    $('#github-badge')
      .empty()
      .buildHeader("My projects", username)
      .buildBody(username)
      .buildFooter();
  })(jQuery);
  GitHubBadge.requestUserInfo(username);
};

GitHubBadge.loadUserInfo = function(data) {
  (function($){ 
    var template = $.template(
      "<li class='public clickable'>"
      +  "<img src='http://github.com/images/icons/public.png' alt='public'>"
      +  "<strong><a href='${url}'>${name}</a></strong>"
      +  "<div class='description'>${description}</div>"
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
      .append(list);
    list = list.find('ul');
    orderedRepos = data.user.repositories.sort(function(repo1, repo2) {
      var properties = ['network', 'watched'];
      for (var i=0; i < properties.length; i++) {
        var comparison = GitHubBadge.compareReposProperty(repo1, repo2, properties[i]);
        if (comparison != 0) return comparison;
      };
      return data.user.repositories.indexOf(repo2) - data.user.repositories.indexOf(repo1);
    })
    $.each(orderedRepos, function(index) {
      list.append(template, this);
    });
    var showLimit = window.GITHUB_LIST_LENGTH || 10;
    
    $('#github-badge .body li')
    .click(function(event) {
      $(event.currentTarget).find('.description').toggle();
    })
    .find('.description')
      .hide()
      .end()
    .filter(':gt(' + (showLimit - 1) + ')').hide() // hide extras
    if ($('#github-badge .body li').is(':hidden'))
      $('#github-badge .body').append(showMore); 
  })(jQuery); 
};

GitHubBadge.compareReposProperty = function(repo1, repo2, property) {
  if ((property in repo1) && !(property in repo2)) return -1;
  if (!(property in repo1) && (property in repo2)) return 1;
  if ((property in repo1) && (property in repo2)) {
    return repo2[property] - repo1[property];
  }
  return 0;
};


GitHubBadge.requestUserInfo = function(username) {
  GitHubBadge.Launcher.requestContent(
    "http://github.com/api/v1/json/" + username + "?callback=GitHubBadge.loadUserInfo");
};

(function($){
  $.fn.buildBody = function() {
    return this.append($("<div class='body'>loading...</div>"));
  };
  
  $.fn.buildHeader = function(title, username) {
    var head = ("GITHUB_HEAD" in window) ? GITHUB_HEAD : "div";
    var template = $.template(
      "<" + head + " class='header'>${title} <span>("
      +   "<a href='http://github.com/${username}'>${username}</a>)"
      + "</span></" + head + ">")
    return this.append(template, { title: title, username: username });
  };

  $.fn.buildFooter = function() {
    return this.append($(
      "<div class='footer'>"
        + "<a href='http://drnicjavascript.rubyforge.org/github_badge'>Badge</a> "
        + "powered by <a href='http://github.com'>GitHub</a> | "
        + "Written by <a href='http://drnicwilliams.com'>Dr Nic</a>"
      + "</div>"
      + "</fieldset>"
      ));
  };
})(jQuery); 

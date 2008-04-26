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
  })(jQuery); 
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

GitHubBadge.requestUserInfo = function(username) {
  // TODO use <script src="http://github.com/api...">
  if (username == "drnic") {
    GitHubBadge.loadUserInfo({"user": {"company": "Dr Nic Academy", "name": "Dr Nic Williams", "repositories": [
    {"name": "ruby-on-rails-tmbundle", "url": "http://github.com/drnic/ruby-on-rails-tmbundle", "description": "Ruby on Rails TextMate bundle [Learn it with PeepCode - http://peepcode.com/products/textmate-for-rails-2]", "homepage": "http://macromates.com", "network": 27, "watchers": 44}, {"name": "javascript-unittest-tmbundle", "url": "http://github.com/drnic/javascript-unittest-tmbundle", "description": "JavaScript Unit Test TextMate Bundle [for prototype's unittest.js library]", "homepage": "", "network": 2, "watchers": 3}, {"name": "newjs", "url": "http://github.com/drnic/newjs", "description": "newjs - create new JavaScript libraries", "homepage": "http://newjs.rubyforge.org", "network": 1, "watchers": 6}, {"name": "drnic_js_test_helpers", "url": "http://github.com/drnic/drnic_js_test_helpers", "description": "JavaScript helper libraries for unit testing", "homepage": "http://drnicwilliams.com"}, {"name": "rubygems_stats_widget", "url": "http://github.com/drnic/rubygems_stats_widget", "description": "Blog badge to show your RubyGem and their latest versions", "homepage": "http://drnicwilliams.com"}, {"name": "comment_replies", "url": "http://github.com/drnic/comment_replies", "description": "Embedded 'reply' links in blog comments", "homepage": "http://drnicjavascript.rubyforge.org/comment_replies"}, {"name": "jsunittest", "url": "http://github.com/drnic/jsunittest", "description": "JavaScript Unit Test suite; no dependencies (but same API as prototypejs' unittest suite)", "homepage": "http://jsunittest.rubyforge.org/"}, {"name": "ruby-tmbundle", "url": "http://github.com/drnic/ruby-tmbundle", "description": "Ruby TextMate bundle", "homepage": "http://drnicwilliams.com"}, {"name": "html-tmbundle", "url": "http://github.com/drnic/html-tmbundle", "description": "HTML TextMate bundle", "homepage": "http://macromates.com"}, {"name": "javascript-jquery-tmbundle", "url": "http://github.com/drnic/javascript-jquery-tmbundle", "description": "JavaScript jQuery.tmbundle", "homepage": ""}, {"name": "merb-core", "url": "http://github.com/drnic/merb-core", "description": "Merb Core: All you need. None you don't.", "homepage": "http://www.merbivore.com"}, {"name": "merb-more", "url": "http://github.com/drnic/merb-more", "description": "Merb More: The Full Stack. Take what you need; leave what you don't.", "homepage": "http://www.merbivore.com"}, {"name": "merb-plugins", "url": "http://github.com/drnic/merb-plugins", "description": "Merb Plugins: Even more modules to hook up your Merb installation", "homepage": "http://www.merbivore.com"}, {"name": "restful-authentication", "url": "http://github.com/drnic/restful-authentication", "description": "Generates common user authentication code for Rails/Merb, with a full test/unit and rspec suite and optional Acts as State Machine support built-in.", "homepage": "http://weblog.techno-weenie.net"}, {"name": "rubigen", "url": "http://github.com/drnic/rubigen", "description": "RubiGen - generator framework for your framework", "homepage": "http://rubigen.rubyforge.org"}, {"name": "newgem", "url": "http://github.com/drnic/newgem", "description": "newgem - New Gem Generator for RubyGems", "homepage": "http://newgem.rubyforge.org"}, {"name": "composite_primary_keys", "url": "http://github.com/drnic/composite_primary_keys", "description": "Composite Primary Keys support for Active Record", "homepage": "http://compositekeys.rubyforge.org"}, {"name": "datamapper-tmbundle", "url": "http://github.com/drnic/datamapper-tmbundle", "description": "TextMate bundle for DataMapper ORM", "homepage": ""}, {"name": "merb-tmbundle", "url": "http://github.com/drnic/merb-tmbundle", "description": "Merb bundle for TextMate (uses Ruby, Ruby on Rails, Datamapper and Sequel bundles as necessary)", "homepage": ""}, {"name": "lovd-by-less", "url": "http://github.com/drnic/lovd-by-less", "description": "Open Source Social Network written in Ruby on Rail by Less Everything", "homepage": "http://lovdbyless.com"}, {"name": "ruby-c-extensions-tmbundle", "url": "http://github.com/drnic/ruby-c-extensions-tmbundle", "description": "TextMate bundle for developing C extensions for Ruby ", "homepage": ""}, {"name": "magic_metaclass", "url": "http://github.com/drnic/magic_metaclass", "description": "Explicit metaclasses for Ruby", "homepage": "http://magicmodels.rubyforge.org/magic_metaclass"}, {"name": "pastie-packer", "url": "http://github.com/drnic/pastie-packer", "description": "Pack a folder (or selection) of files into a pastie; and then unpack it back into raw files", "homepage": "http://pastiepacker.rubyforge.org"}, {"name": "collective", "url": "http://github.com/drnic/collective", "description": "A no-frills Merb wiki extracted from wiki.merbivore.com", "homepage": "http://github.com/meekish/collective"}, {"name": "twitter", "url": "http://github.com/drnic/twitter", "description": "command line twits and an api wrapper for twitter", "homepage": "http://twitter.rubyforge.org/"}, {"name": "deprec", "url": "http://github.com/drnic/deprec", "description": "Deprec 1.99.14 with added Thin, Swiftiply, Memcached, God and slightly faster default nginx configuration.", "homepage": "http://www.deprec.org/"}, {"name": "tranexp", "url": "http://github.com/drnic/tranexp", "description": "Translate text between two languages using www.tranexp.com", "homepage": "http://tranexp.rubyforge.org"}, {"name": "copy-as-rtf-tmbundle", "url": "http://github.com/drnic/copy-as-rtf-tmbundle", "description": "Copy as RTF - a TextMate bundle to make copying syntax highlighted text into Keynote, etc easy peasy", "homepage": "http://macromates.com"}, {"name": "rubyamp", "url": "http://github.com/drnic/rubyamp", "description": "TextMate bundle - Amplified Mate Productivity", "homepage": "http://code.leadmediapartners.com/tools/rubyamp"}, {"name": "attachment_fu", "url": "http://github.com/drnic/attachment_fu", "description": "Treat an ActiveRecord model as a file attachment, storing its patch, size, content type, etc.", "homepage": "http://weblog.techno-weenie.net"}, {"name": "rspec_on_rails_nested_scaffold", "url": "http://github.com/drnic/rspec_on_rails_nested_scaffold", "description": "A nested scaffold generator for rSpec and rails [a RubyGems version for Rails 2.0 so no plugin required]", "homepage": ""}, {"name": "hobo", "url": "http://github.com/drnic/hobo", "description": "The web app builder for Rails", "homepage": "http://hobocentral.net"}], "blog": "http://drnicwilliams.com", "login": "drnic", "email": "drnicwilliams@gmail.com", "location": "Brisbane, Australia"}});
  }
}
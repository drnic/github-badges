var GitHubBadge = GitHubBadge || {};

GitHubBadge.Launcher = new function() {
  function requestStylesheet( url, style_id ) {
    if ("jQuery" in window) {
      jQuery('head').append(
        jQuery('<style rel="stylesheet" type="text/css"></style>')
        .attr('href', url)
        .attr('id', style_id)
      )
    } else {
      document.write('<link rel="stylesheet" href="'+url+'" type="text/css"' + id_attr + '></link>');
    }
  }
  
  function basePath() {
    var scripts = document.getElementsByTagName("script");
    for (var i=0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.match(/github-badge-launcher\.js(\?.*)?/)) {
        return scripts[i].src.replace(/github-badge-launcher\.js(\?.*)?/, '');
      }
    }
  }

  this.init = function() {
    var libraries = [
        [typeof jQuery, "ext/jquery"], 
        [typeof jQuery != "undefined" && typeof jQuery.template, "ext/jquery.template"],
        [false, "github-badge"]
      ];
    var scripts = document.getElementsByTagName("script");
    for (var i=0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.match(/github-badge-launcher\.js(\?.*)?/)) {
        this.path = scripts[i].src.replace(/github-badge-launcher\.js(\?.*)?/, '');
        for (var i=0; i < libraries.length; i++) {
          if (libraries[i][0] == "undefined" || !libraries[i][0]) {
            var url = this.path + libraries[i][1] + ".js";
            if (i == libraries.length - 1) {
              this.requestContent(url, "GitHubBadge.Launcher.loadedLibraries");
            } else {
              this.requestContent(url);
            }
          }
        }
        break;
      }
    }
  }

  this.loadedLibraries = function() {
    if(typeof jQuery == 'undefined' || typeof jQuery.template == 'undefined')
      throw("GitHub Badge requires jQuery and jQuery.template");
    
    if (jQuery('#github-badge').parent().css('background-color') == 'rgb(0, 0, 0)') {
      requestStylesheet(this.path + 'ext/stylesheets/black_badge.css', 'black_badge');
    } else {
      requestStylesheet(this.path + 'ext/stylesheets/badge.css', 'badge');
    }
    
    GitHubBadge.buildUserBadge(GITHUB_USERNAME);
  }
};

GitHubBadge.Launcher.requestContent = function( url, callback ) {
  // inserting via DOM fails in Safari 2.0, so brute force approach
  if ("jQuery" in window) {
    jQuery.getScript(url,callback);
  } else {
    onLoadStr = (typeof callback == "undefined") ? "" : 'onload="' + callback + '()"';
    document.write('<script ' + onLoadStr + 'type="text/javascript" src="'+url+'"></script>');
  }
}


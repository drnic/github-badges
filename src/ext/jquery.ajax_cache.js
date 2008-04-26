/* Copyright (c) 2007 Dr Nic Williams (drnicwilliams@gmail.com || http://drnicwilliams.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * Version: @VERSION
 * Requires jQuery 1.2.3+
 * Docs: http://docs.jquery.com/Plugins/ajax_cache
 * Dependencies: jCache 1.0.2 - http://plugins.jquery.com/project/jCache
 *
 * Description: Provides a $.getCachedJSON method that has the same API as the standard $.getJSON
 * but the url+args=>json is cached on the page. Subsequent calls to same url+args will return the
 * original result without an $.ajax call being made.
 */

(function($) {
	this.version = '0.1';

  $.getCachedJSON = function(url, args, success) {
    if (url) {
      var full_url = url + (args ? "" : "?" + $.param(args));
      var json = $.jCache.getItem(full_url);
    }
    if (!json) $.getJSON(url, args, function(json) {
      $.jCache.setItem(full_url, json);
      success(json);
    });
    else success(json);
  };
})(jQuery);
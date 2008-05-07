Github Badges
-------------

Want to show off your projects on github to world? 
Then a sexy badge on your blog would be awesome.

Its still under development, but here is a screenshot
of the unit tests + the sample badge below.

<div><a href="http://skitch.com/drnic/keqx/github-badge-new-look-n-feel"><img src="http://img.skitch.com/20080426-jisygbfprs2wntu7fnngs1f7wm.jpg" alt="github badge: new look-n-feel" /></a></div>

Live Demo
=========

See the project website: [http://drnicjavascript.rubyforge.org/github_badge](http://drnicjavascript.rubyforge.org/github_badge)

Usage
=====

It is expected that to use the widget, you will copy + paste + modify
the following snippet into your blog sidebar.

    <div id="github-badge"></div>
    <script type="text/javascript" charset="utf-8">
      GITHUB_USERNAME = "drnic";
      GITHUB_LIST_LENGTH = 10;
      GITHUB_HEAD = "div"; // e.g. change to "h2" for wordpress sidebars
      GITHUB_THEME = "white"; // try 'black'
      // GITHUB_TITLE = "My Title"
      // GITHUB_SHOW_ALL = "More..."
    </script>
    <script src="http://drnicjavascript.rubyforge.org/github_badge/dist/github-badge-launcher.js" type="text/javascript"></script>

Black background? If your site has a black background the badge will automatically attempt
to use the `black_badge.css` theme. If it doesn't trigger for your site add the `GITHUB_THEME='black'` code to the configuration above.

Website
=======

[http://drnicjavascript.rubyforge.org/github_badge](http://drnicjavascript.rubyforge.org/github_badge)

Author
======

Dr Nic Williams, drnicwilliams@gmail.com
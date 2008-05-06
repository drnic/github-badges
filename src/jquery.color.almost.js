(function($){ 
  $.color = $.color || {};
  
  // Arguments:
  // color: supported format - 'rgb(nnn, nnn, nnn)'
  $.color.almostBlack = function(color) {
    var colorParts = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\s*\)/);
    if (!colorParts) return false;
    var combo = parseInt(colorParts[1])/255 * parseInt(colorParts[2])/255 * parseInt(colorParts[3])/255;
    return combo < 0.3;
  };
})(jQuery); 

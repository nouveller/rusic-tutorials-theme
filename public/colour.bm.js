(function() {

  var colours = new Array();
  
  // include jquery if it's not already on the page, otherwise run
  if (typeof jQuery == 'undefined')
  {
    var s = document.createElement('script');
    s.setAttribute('src','//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
    s.onload = runColour;
    document.body.appendChild(s);  
  }
  else
  {
    runColour();
  }

  function runColour()
  {
    console.log('Running colour, jQuery ' + jQuery.fn.jquery);

    (function($) {

      // loop through all dom elements, exlcuding a couple
      $('body *:not(script,style,noscript), body').each(function(i,el) {
        
        // get the element as a jquery object, and grab the two colour properties
        var el        = $(el)
            colour    = removeSpaces(el.css('color')),
            bgColour  = removeSpaces(el.css('background-color'));
        
        if (!haveColour(colour) && colour != 'rgba(0,0,0,0)')
        {
          colours.push(colour);
        }
        if (!haveColour(bgColour) && bgColour != 'rgba(0,0,0,0)')
        {
          colours.push(bgColour);
        }
                   
      });

      var sendColours = removeBraces(removeQuotes(JSON.stringify(colours)));

      loadRusicIframe(sendColours);         
    })(jQuery);  
  }

  function haveColour(newColour)
  {
    for(var i = 0; i < colours.length; i++)
    {
      if(colours[i] == newColour)
      {
        return true;
        break;
      }
    }
    return false;
  }

  function loadRusicIframe(coloursToSend)
  {
    // This is the page that will display inside the iframe.
    var iframeSrc = 'http://takenby.rusic.com/colours/ideas/new';

    // Styles for the iframe.
    var iframeStyle = 'position: fixed; z-index: 999999; width: 750px; height: 260px; right: 0; top: 0; border: none; overflow: hidden; background-color: white;';

    // Create an iframe element and set some attributes.
    var iframe = document.createElement('iframe');

    // Pass the current url across to the space.
    iframe.setAttribute('src', iframeSrc + '?colours='+coloursToSend + '&url=' + encodeURIComponent(window.location.href) );

    iframe.setAttribute('id', 'rusic-modal');
    iframe.setAttribute('style', iframeStyle);

    // Inject the iframe into the host page.
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(iframe);
  }

  function removeSpaces(string) {
    return string.split(' ').join('');
  }

  function removeQuotes(string) {
    return string.split('"').join('');
  }

  function removeBraces(string) {
    var _string = string.split('[').join('');
    return _string.split(']').join('');
  }

})();
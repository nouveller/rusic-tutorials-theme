(function() {

  var colours       = new Array(),
      windowWidth, windowHeight,
      modal,
      iframeSrc     = 'http://takenby.rusic.com/colours/ideas/new',
      iframeWidth   = 750,
      iframeHeight  = 260;
  
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
    updateWindow();

    // Styles for the iframe.
    var iframeStyle = 'position: fixed; z-index: 999999; width: '+iframeWidth+'px; height: '+iframeHeight+'px; left: '+((windowWidth/2)-(iframeWidth/2))+'px; top: '+((windowHeight/2)-(iframeHeight/2))+'px; border: none; overflow: hidden;';

    // Create an iframe element and set some attributes.
    var iframe = document.createElement('iframe');

    // Pass the current url across to the space.
    iframe.setAttribute('src', iframeSrc + '?colours='+coloursToSend + '&url=' + encodeURIComponent(window.location.href) );

    iframe.setAttribute('id', 'rusic-modal');
    iframe.setAttribute('style', iframeStyle);

    // Inject the iframe into the host page.
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(iframe);

    attachEvents();
  }

  function updateWindow()
  {
    windowWidth   = $(window).width(),
    windowHeight  = $(window).height();
  }

  function attachEvents()
  {
    // store a reference to the new injected modal
    modal = $('#rusic-modal');

    // update the window's width and height on resizing the browser
    $(window).on('resize', function() {
      updateWindow();
      centreModal();  
    });
  }

  function centreModal()
  {
    modal.css({
      top: ((windowHeight/2)-(iframeHeight/2)),
      left: ((windowWidth/2)-(iframeWidth/2))   
    });
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
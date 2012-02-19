(function() {

  var colours       = new Array(),
      windowWidth, windowHeight,
      modal,
      iframeSrc     = 'http://takenby.rusic.com/colours/ideas/new',
      iframeWidth   = 750,
      iframeHeight  = 260,
      // refrence to my loaded version of jquery
      jq;
  
  // include the latest version jquery on the page with js, don't want to assume it's on the page already
  var s = document.createElement('script');
  s.setAttribute('src','//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
  s.onload = runColour;
  document.body.appendChild(s);  

  function runColour()
  {
    jq = jQuery.noConflict(true);

    // loop through all dom elements, exlcuding a couple
    jq('body *:not(script,style,noscript), body').each(function(i,el) {
      
      // get the element as a jquery object, and grab the two colour properties
      var el        = jq(el)
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

    var jFrame = jq('<iframe/>');

    jFrame.css({
      position: 'fixed',
      'z-index': 999999,
      width: iframeWidth,
      height: iframeHeight,
      top: ((windowHeight/2)-(iframeHeight/2)),
      left: ((windowWidth/2)-(iframeWidth/2)),
      overflow: 'hidden',
      border: 'none'  
    });

    jFrame.attr('src', iframeSrc + '?colours='+coloursToSend + '&url=' + encodeURIComponent(window.location.href));
    jFrame.attr('id', 'rusic-modal');

    jq('body').append(jFrame);

    attachEvents();
  }

  function updateWindow()
  {
    windowWidth   = jq(window).width(),
    windowHeight  = jq(window).height();
  }

  function attachEvents()
  {
    // store a reference to the new injected modal
    modal = jq('#rusic-modal');

    // update the window's width and height on resizing the browser
    jq(window).on('resize', function() {
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
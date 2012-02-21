(function($) { $(document).ready(function() {

  var html    = $('html'),
      body    = $('body'),
      alerts  = $('#alerts');

  function renderSwatches()
  {
    var swatches = $('.swatches');

    // for each swatch on the page
    $.each(swatches, function(i,el) {
      
      var el            = $(el),
          colourData    = el.data('colours'),
          // parse the colours string, to return an arry of rgba's
          colours       = colourData.match(/rgba?\([0-9]*,[0-9]*,[0-9]*,?[0-9]\.?[0-9]?\)/gi),
          colourAmount  = colours.length,
          colourWidth   = Math.round((100/colourAmount));
      
      // build the sewatches for each list item
      $.each(colours, function(i,colour) {
        el.append(buildSwatch(colour,colourWidth));     
      });

      // attach events
      //attachEvents();
    });
  }
  renderSwatches();

  function buildSwatch(colour,width)
  {
    return '<li style="width: '+width+'%;" class="single-colour"><div class="swatch" style="background-color: '+colour+'"></div></li>';
  }

  function attachEvents()
  {
    var singleColor = $('.single-colour');

    singleColor.hover(function() {
      $(this).addClass('highlight');
      $(this).parent('.swatches').children('.single-colour').animate({
        opacity: 0.2
      }, 250);
    }, function() { 
      var that = $(this);
      $(this).parent('.swatches').children('.single-colour').animate({
        opacity: 1
      }, 250, function() {
        that.removeClass('highlight'); 
      }); 
    });
  }

  var cancelBtn = $('#cancel-popup, .cancel-popup-class');

  cancelBtn.click(function(e) {
    html.hide();  
    e.preventDefault();
  });

  if (window != window.top)
  {
    html.addClass('popup-page');
  }

  // hackey login thing

  if (body.hasClass('logged-out') && html.hasClass('popup-page'))
  {
    // make these links open in a new window
    var signIn        = $('.auth a'),
        signInMessage = '<div class="alert alert-message success prompt">Hold up, you need to be signed in first!</div>';
    
    signIn.attr('target','_blank');

    alerts.html(signInMessage);

    signIn.click(function(e) {
      html.hide();  
    });

    $('#main-content').hide();
  }
  
  // if logged in using the bookmarklet, skeptical test...
  if (history.length <= 2 && $('#logged-in-from-somewhere').length == 1)
  {
    setTimeout(function() {
      window.close();
    }, 1000);
  }
    
}); })(jQuery);
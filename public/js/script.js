(function($) { $(document).ready(function() {

  var html = $('html');

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

  var cancelBtn = $('#cancel-popup');

  cancelBtn.click(function(e) {
    $('html').hide();  
    e.preventDefault();
  });

  if (window != window.top)
  {
    html.addClass('popup-page');
  }
    
}); })(jQuery);
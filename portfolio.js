$(document).ready(function(){
    showFixedNav('fixedHeader', 'contentDescriptions');
    scrollToId();
});


var showFixedNav = function(className){
    var className = className;
    var elementToShow = $('.' + className);

    $(document).scroll(function () {
        var documentScrollTop = $(this).scrollTop();
        if (documentScrollTop > 100) { 
            elementToShow.fadeIn(200, 'swing');
        }else{
            elementToShow.fadeOut(200, 'swing');
        }
    });
};


var scrollToId = function(){
     // handle links with @href started with '#' only
     $(document).on('click', 'a[href^="#"]', function(e) {
         var id = $(this).attr('href');
         var $id = $(id);

         if ($id.length === 0) {
             return;
         }

         e.preventDefault();

         var pos = $(id).offset().top;

     $('body, html').animate({scrollTop: pos});
     });
}



$(function() {

    // Get the form.
    var form = $('#michaelMclaughlinForm');
    // Get the messages div.
    var formMessages = $('#formMessagesSpan');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .success(function(response) {
            $(formMessages).addClass('success');
                        $(formMessages).removeClass('error');
                        $(formMessages).text(response);
                        
        })
         .error(function(response){
                        $(formMessages).addClass('error');
                        $(formMessages).removeClass('success')
            $(formMessages).text('Oops! Try again.');
        
        });

    });
});
























   


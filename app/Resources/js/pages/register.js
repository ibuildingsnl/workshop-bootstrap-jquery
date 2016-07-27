(function ($) {
    'use strict';

    $('#register-form').on('submit', function (event) {
        var $form = $(this);

        event.preventDefault();

        $.ajax($form.attr('action'), {
            method: 'POST',
            data: $form.serialize(),
            success: function (data) {
                $('.workshop-main').html(data);
            },
        });
    });
}(window.jQuery));

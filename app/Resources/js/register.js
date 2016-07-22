(function ($, Parsley) {

    $.ajax({
        type: "POST",
        url: '/app_dev.php/check-email',
        data: JSON.stringify({ email: 'seggen@ibuildings.nl' }),
        success: function (data) {
            console.log(data);
        },
        contentType: 'application/json'
    });

}(jQuery, window.Parsley));

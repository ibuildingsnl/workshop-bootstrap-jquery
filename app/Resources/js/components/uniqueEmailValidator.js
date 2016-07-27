(function ($, Parsley) {
    'use strict';

    // true = available, false = unavailable, null = weird data
    function isAvailableResponse(data) {
        if (typeof data !== 'object') {
            return null;
        }

        if (typeof data.available !== 'boolean') {
            return null;
        }

        if (data.available) {
            return true;
        }

        return false;
    }

    function checkEmailUnique(value) {
        return new $.Deferred(function (deferred) {
            $.ajax({
                type: 'POST',
                url: '/app_dev.php/check-email',
                data: JSON.stringify({ email: value }),
                success: function (data) {
                    var result = isAvailableResponse(data);

                    // if we got weird data, let's call it valid and check server-side
                    if (result === null || result === true) {
                        deferred.resolve();
                    }

                    deferred.reject();
                },
                error: function () {
                    // if we got an error, let's call it valid and check server-side
                    deferred.resolve();
                },
                contentType: 'application/json',
            });
        });
    }

    Parsley
        .addValidator('uniqueEmail', {
            requirementType: 'string',
            validateString: function (value) {
                return checkEmailUnique(value);
            },
            messages: {
                en: 'This email address is already taken',
            },
        });
}(window.jQuery, window.Parsley));

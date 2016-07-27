(function ($, Parsley) {

    window.Parsley
        .addValidator('existingEmail', {
            requirementType: 'string',
            validateString: function(value, requirement) {
                return new $.Deferred(function (deferred) {
                    $.post(
                        "/check-email",
                        {
                            email: value,
                        }
                    ).done(function(data) {
                        if (data.available) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    }).fail(function() {
                        deferred.reject('Er is iets fout gegaan!');
                    });
                });
            },
            messages: {
                en: 'There already is an account on this e-mail address',
                nl: 'Er bestaat al een account met dit e-mailadres'
            }
        });

}(window.jQuery, window.Parsley));

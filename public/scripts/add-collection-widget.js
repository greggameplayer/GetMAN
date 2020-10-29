let previousKey = '', previousParam = '', previousUrl = '';
$(document).ready(function () {
    let list = $($(this).attr('data-list-selector'));
    let counter = $('#params-fields-list').children().length;
    let counterBody = $('#body-fields-list').children().length;

    if (counter === 0) {
        $('.rm-another-collection-widget').attr('disabled', '');
    }

    if (counterBody === 0) {
        $('.rm-another-collection-widget-body').attr('disabled', '');
    }

    if ($('#send_method').val() === 'GET') {
        document.querySelector('#paramsdiv').classList.remove('d-none');
        document.querySelector('#bodydiv').classList.add('d-none');
    } else {
        document.querySelector('#paramsdiv').classList.add('d-none');
        document.querySelector('#bodydiv').classList.remove('d-none');
    }

    $('#send_url').on('focus', function (_e) {
        if ($('#send_method').val() === 'GET') {
            previousUrl = this.value;
        }
    });

    $('#send_method').on('change', function (_e) {
        if (this.value === 'GET') {
            document.querySelector('#paramsdiv').classList.remove('d-none');
            document.querySelector('#bodydiv').classList.add('d-none');
        } else {
            document.querySelector('#paramsdiv').classList.add('d-none');
            document.querySelector('#bodydiv').classList.remove('d-none');
        }
    });

    $('#send_url').on('change', function (e) {
        if ($('#send_method').val() === 'GET') {
            let urlParams = readUrl($('#send_url').val());
            if (previousUrl !== '' && Object.keys(readUrl(previousUrl)).length === Object.keys(urlParams).length) {
                for (let i = 0; i < Object.keys(urlParams).length; i++) {
                    for (let j = 0; j < Object.keys(readUrl(previousUrl)).length; j++) {
                        if (Object.keys(urlParams)[i] !== Object.keys(readUrl(previousUrl))[j]) {
                            $('#params-fields-list').children().children('div').each(function () {
                                if ($($($(this).children('div')[0]).children('input')[0]).val() === Object.keys(readUrl(previousUrl))[i]) {
                                    $($($(this).children('div')[0]).children('input')[0]).val(Object.keys(urlParams)[i]);
                                }
                            });
                        }

                        if(Object.values(urlParams)[i] !== Object.values(readUrl(previousUrl))[j]) {
                            $('#params-fields-list').children().children('div').each(function () {
                                if ($($($(this).children('div')[1]).children('input')[0]).val() === Object.values(readUrl(previousUrl))[i] && $($($(this).children('div')[0]).children('input')[0]).val() === Object.keys(urlParams)[i]) {
                                    $($($(this).children('div')[1]).children('input')[0]).val(Object.values(urlParams)[i]);
                                }
                            });
                        }
                    }
                }
                return;
            }
            for (let i = 0; i < Object.keys(urlParams).length; i++) {
                let exist = false;
                $('#params-fields-list').children().children('div').each(function () {
                    if ($($($(this).children('div')[0]).children('input')[0]).val() === Object.keys(urlParams)[i]) {
                        $($($(this).children('div')[1]).children('input')[0]).val(Object.values(urlParams)[i]);
                        exist = true;
                    }
                });
                if (!exist) {
                    $('.add-another-collection-widget').click();
                    $($($($('#params-fields-list').children()).children().last().children('div')[0]).children('input')[0]).val(Object.keys(urlParams)[i]);
                    $($($($('#params-fields-list').children()).children().last().children('div')[1]).children('input')[0]).val(Object.values(urlParams)[i]);
                }
            }
        }
    })

    $($($('#params-fields-list').children()).children()).each(function () {
        $($($(this).children('div')[0]).children('input')[0]).off('change').on('change', onChangeKey).off('focus').on('focus', onFocusKey);
    });

    $($($('#params-fields-list').children()).children()).each(function () {
        $($($(this).children('div')[1]).children('input')[0]).off('change').on('change', onChangeParam).off('focus').on('focus', onFocusParam);
    });


    $('.add-another-collection-widget').click(function (e) {
        var list = $($(this).attr('data-list-selector'));
        // Try to find the counter of the list or use the length of the list
        var counter = list.data('widget-counter') || list.children().length;

        // grab the prototype template
        var newWidget = list.attr('data-prototype');
        // replace the "__name__" used in the id and name of the prototype
        // with a number that's unique to your emails
        // end name attribute looks like name="contact[emails][2]"
        newWidget = newWidget.replace(/__name__/g, counter);
        // Increase the counter
        counter++;
        // And store it, the length cannot be used if deleting widgets is allowed
        list.data('widget-counter', counter);

        // create a new list element and add it to the list
        var newElem = $(list.attr('data-widget-tags')).html(newWidget);
        newElem.appendTo(list);
        $('.rm-another-collection-widget').removeAttr('disabled');
        $($($('#params-fields-list').children()).children()).each(function () {
            $($($(this).children('div')[0]).children('input')[0]).off('change').on('change', onChangeKey).off('focus').on('focus', onFocusKey);
        });

        $($($('#params-fields-list').children()).children()).each(function () {
            $($($(this).children('div')[1]).children('input')[0]).off('change').on('change', onChangeParam).off('focus').on('focus', onFocusParam);
        });
    });

    $('.add-another-collection-widget-body').click(function (e) {
        var list = $($(this).attr('data-list-selector'));
        // Try to find the counter of the list or use the length of the list
        var counter = list.data('widget-counter') || list.children().length;

        // grab the prototype template
        var newWidget = list.attr('data-prototype');
        // replace the "__name__" used in the id and name of the prototype
        // with a number that's unique to your emails
        // end name attribute looks like name="contact[emails][2]"
        newWidget = newWidget.replace(/__name__/g, counter);
        // Increase the counter
        counter++;
        // And store it, the length cannot be used if deleting widgets is allowed
        list.data('widget-counter', counter);

        // create a new list element and add it to the list
        var newElem = $(list.attr('data-widget-tags')).html(newWidget);
        newElem.appendTo(list);
        $('.rm-another-collection-widget-body').removeAttr('disabled');
    });

    $('.rm-another-collection-widget').click(function (e) {
        var list = $($(this).attr('data-list-selector'));
        // Try to find the counter of the list or use the length of the list
        var counter = list.data('widget-counter') || list.children().length;

        $('#send_url').val($('#send_url').val().replace('?' + $($($($($(list[0]).children().last()).children()[0]).children()[0]).children('input')[0]).val() + '=' + $($($($($(list[0]).children().last()).children()[0]).children()[1]).children('input')[0]).val(), ""));
        $('#send_url').val($('#send_url').val().replace('&' + $($($($($(list[0]).children().last()).children()[0]).children()[0]).children('input')[0]).val() + '=' + $($($($($(list[0]).children().last()).children()[0]).children()[1]).children('input')[0]).val(), ""));

        // grab the prototype template
        // replace the "__name__" used in the id and name of the prototype
        // with a number that's unique to your emails
        // end name attribute looks like name="contact[emails][2]"
        list[0].lastChild.remove();
        // Increase the counter
        counter--;

        if (counter === 0) {
            $('.rm-another-collection-widget').attr('disabled', '');
        }

        if (counter === 0 && ($('#params-fields-list').children('div')).length !== 0) {
            $('#params-fields-list').children('div').remove();
        }
        // And store it, the length cannot be used if deleting widgets is allowed
        list.data('widget-counter', counter);

    });

    $('.rm-another-collection-widget-body').click(function (e) {
        var list = $($(this).attr('data-list-selector'));
        // Try to find the counter of the list or use the length of the list
        var counter = list.data('widget-counter') || list.children().length;

        // grab the prototype template
        // replace the "__name__" used in the id and name of the prototype
        // with a number that's unique to your emails
        // end name attribute looks like name="contact[emails][2]"
        list[0].lastChild.remove();
        // Increase the counter
        counter--;

        if (counter === 0) {
            $('.rm-another-collection-widget-body').attr('disabled', '');
        }

        if (counter === 0 && ($('#body-fields-list').children('div')).length !== 0) {
            $('#body-fields-list').children('div').remove();
        }
        // And store it, the length cannot be used if deleting widgets is allowed
        list.data('widget-counter', counter);

    });
});

function readUrl(url) {

    var para_str = '';

    // Checking url is defined or not

    /* url variable is defined */
    var split_url = url.split('?');
    para_str = split_url[1];
    if (para_str !== undefined) {
        var parts = para_str.split('&');
    }

    // Check arguments are defined or not
    if (para_str !== undefined && para_str !== '') {
        var parameter_obj = {}; // Object

        // looping through all arguments and store in Object
        for (var i = 0; i < parts.length; i++) {
            var split_val = parts[i].split('=');

            // Check argument is available or not e.g. ?num1=43&
            if (split_val[0] == undefined || split_val[0] == '')
                continue;
            var value = split_val[1];
            // Check value is available or not e.g. ?num1=43&num2= or ?num1=43&num2
            if (value == undefined) {
                value = ""; // Assign space if value is not defined
            }

            parameter_obj[split_val[0]] = value;

        }

        // Print all arguments
        return parameter_obj;

    } else {
        return {};
    }

}

function onChangeKey(_e) {
    if (($('#send_url').val()).includes(previousKey + '=') && previousKey !== '') {
        $('#send_url').val($('#send_url').val().replace(previousKey + '=', this.value + '='));
    } else {
        if (($('#send_url').val().lastIndexOf('?') === ($('#send_url').val().length - 1)) || !$('#send_url').val().includes('='))
            if (!$('#send_url').val().includes('?'))
                $('#send_url').val($('#send_url').val() + '?' + this.value + '=' + $($($(this).parent().parent().children('div')[1]).children('input')[0]).val());
            else
                $('#send_url').val($('#send_url').val() + this.value + '=' + $($($(this).parent().parent().children('div')[1]).children('input')[0]).val());
        else
            $('#send_url').val($('#send_url').val() + '&' + this.value + '=' + $($($(this).parent().parent().children('div')[1]).children('input')[0]).val());
    }
}

function onChangeParam(_e) {
    if (($('#send_url').val()).includes($($($(this).parent().parent().children('div')[0]).children('input')[0]).val() + '=' + previousParam) && $($($(this).parent().parent().children('div')[0]).children('input')[0]).val() !== '') {
        $('#send_url').val($('#send_url').val().replace($($($(this).parent().parent().children('div')[0]).children('input')[0]).val() + '=' + previousParam, $($($(this).parent().parent().children('div')[0]).children('input')[0]).val() + '=' + this.value));
    }
}

function onFocusKey(_e) {
    previousKey = this.value;
}


function onFocusParam(_e) {
    previousParam = this.value;
}

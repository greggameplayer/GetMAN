let previousKey = '', previousParam = '', previousUrl = '';
$(document).ready(function () {
    let list = $($(this).attr('data-list-selector'));
    let counter = $('#params-fields-list').children().length;
    let counterBody = $('#body-fields-list').children().length;
    let counterHeaders = $('#headers-fields-list').children().length;

    disableRmBtOnZeroCounter(counter, 'rm-another-collection-widget');
    disableRmBtOnZeroCounter(counterBody, 'rm-another-collection-widget-body');
    disableRmBtOnZeroCounter(counterHeaders, 'rm-another-collection-widget-headers');

    bodyOrParams();

    $('.request').on('click', onRequestClick);

    $('#send_url').on('focus', function (_e) { // permet d'obtenir l'url précédente avant modification lors de l'entrée sur le champs
        if ($('#send_method').val() === 'GET') {
            previousUrl = this.value;
        }
    });

    $('#send_method').on('change', function (_e) { // permet de déterminer si ça utilise un body ou des query parameters lors du changement de la méthode
        bodyOrParams();
    });

    $('#send_url').on('change', function (e) { // permet d'effectuer les modifications nécessaire des query parameters séparés lors du changement de l'url présente dans le champs
        if ($('#send_method').val() === 'GET') {
            let url = $('#send_url').val();
            let urlParams = readUrl(url);
            if (previousUrl !== '' && Object.keys(readUrl(previousUrl)).length === Object.keys(urlParams).length) {
                modifySeparatedParameters(urlParams);
            } else if (previousUrl !== '' && Object.keys(readUrl(previousUrl)).length > Object.keys(urlParams).length) {
                removeSeparatedParameters(url);
            } else {
                addToSeparatedParameters(urlParams);
            }

        }
    })

    bindEventsToKeys();

    bindEventsToParamsValues();


    $('.add-another-collection-widget').click(function (e) { // permet d'ajouter un query parameter supplémentaire lors du clique sur le bouton
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
        bindEventsToKeys();

        bindEventsToParamsValues();
    });

    $('.add-another-collection-widget-body').click(function (e) { // permet d'ajouter un body parameter supplémentaire lors du clique sur le bouton
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

    $('.add-another-collection-widget-headers').click(function (e) { // permet d'ajouter un body parameter supplémentaire lors du clique sur le bouton
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
        $('.rm-another-collection-widget-headers').removeAttr('disabled');
    });

    $('.rm-another-collection-widget').click(function (e) { // permet d'enlever le dernier query parameter lors du clique sur le bouton
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

    $('.rm-another-collection-widget-body').click(function (e) { // permet d'enlever le dernier body parameter lors du clique sur le bouton
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

    $('.rm-another-collection-widget-headers').click(function (e) { // permet d'enlever le dernier body parameter lors du clique sur le bouton
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
            $('.rm-another-collection-widget-headers').attr('disabled', '');
        }

        if (counter === 0 && ($('#headers-fields-list').children('div')).length !== 0) {
            $('#headers-fields-list').children('div').remove();
        }
        // And store it, the length cannot be used if deleting widgets is allowed
        list.data('widget-counter', counter);

    });
});

function readUrl(url) { // permet de lire une url et de renvoyer les paramètres sous forme d'objet

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

function onChangeKey(_e) { // fonction permettant de faire les modifications nécessaire de la clé lors du changement de celle-ci
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

function onChangeParam(_e) { // fonction permettant de faire les modifications nécessaire de la valeur du query parameter lors du changement de celle-ci
    if (($('#send_url').val()).includes($($($(this).parent().parent().children('div')[0]).children('input')[0]).val() + '=' + previousParam) && $($($(this).parent().parent().children('div')[0]).children('input')[0]).val() !== '') {
        $('#send_url').val($('#send_url').val().replace($($($(this).parent().parent().children('div')[0]).children('input')[0]).val() + '=' + previousParam, $($($(this).parent().parent().children('div')[0]).children('input')[0]).val() + '=' + this.value));
    }
}

function onFocusKey(_e) { // permet de définir la valeur précédente de la clé du query parameter
    previousKey = this.value;
}


function onFocusParam(_e) { // permet de définir la valeur précédente de la valeur du query parameterr
    previousParam = this.value;
}

function addToSeparatedParameters(urlParams){ // permet d'ajouter un ou plusieurs query parameters lors de la modification de l'url
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

function modifySeparatedParameters(urlParams){ // permet de modifier les clés et/ou valeurs de un ou plusieurs query parameters lors de la modification de l'url
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
}

function removeSeparatedParameters(url){ // permet de supprimer un ou plusieurs query parameters lors de la modification de l'url
    for (let i = 0; i < Object.keys(readUrl(previousUrl)).length; i++){
        $('.rm-another-collection-widget').click();
    }
    previousUrl = '';
    addToSeparatedParameters(readUrl(url));
    $('#send_url').val(url);
}

function bodyOrParams(){ // permet d'afficher soit la liste des query parameters ou soit le body selon la méthode choisi
    if ($('#send_method').val() === 'GET') {
        document.querySelector('#paramsdiv').classList.remove('d-none');
        document.querySelector('#bodydiv').classList.add('d-none');
    } else {
        document.querySelector('#paramsdiv').classList.add('d-none');
        document.querySelector('#bodydiv').classList.remove('d-none');
    }
}

function disableRmBtOnZeroCounter(counter, btClass){ // permet de désactiver le bouton supprimer si il y a 0 paramètre dans la liste
    if (counter === 0) {
        $(`.${btClass}`).attr('disabled', '');
    }
}

function bindEventsToKeys(){ // lie les événements nécessaire avec les différentes clés des query parameters
    $($($('#params-fields-list').children()).children()).each(function () {
        $($($(this).children('div')[0]).children('input')[0]).off('change').on('change', onChangeKey).off('focus').on('focus', onFocusKey);
    });
}

function bindEventsToParamsValues(){ // lie les événements nécessaire avec les différentes valeurs des query parameters
    $($($('#params-fields-list').children()).children()).each(function () {
        $($($(this).children('div')[1]).children('input')[0]).off('change').on('change', onChangeParam).off('focus').on('focus', onFocusParam);
    });
}

function onRequestClick(e){
    const url = $($(this).children()[1]).html();
    const method = $($(this).children()[0]).html();
    $('#send_url').focus();
    $('#send_url').val(url);
    $('#send_method option[value="'+ method +'"]').prop('selected', true);
    bodyOrParams();
    $('#send_url').change();
}

$(document).ready(function () {
    let list = $($(this).attr('data-list-selector'));
    let counter = $('#params-fields-list').children().length;
    if(counter === 0){
        $('.rm-another-collection-widget').attr('disabled', '');
    }
    $('#send_url').on('change', function(e){
        console.log(readUrl($('#send_url').val()));
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
    });

    $('.rm-another-collection-widget').click(function (e) {
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

        if(counter === 0){
            $('.rm-another-collection-widget').attr('disabled', '');
        }

        if(counter === 0 && ($('#params-fields-list').children().children('div')).length !== 0){
            $('#params-fields-list').children('div').remove();
        }
        // And store it, the length cannot be used if deleting widgets is allowed
        list.data('widget-counter', counter);

    });
});

function readUrl(url){

    var para_str = '';

    // Checking url is defined or not

        /* url variable is defined */
        var split_url = url.split('?');
        para_str = split_url[1];
        if(para_str !== undefined){
            var parts = para_str.split('&');
        }

    // Check arguments are defined or not
    if( para_str !== undefined && para_str !== '' ){
        var parameter_obj = {}; // Object

        // looping through all arguments and store in Object
        for(var i=0;i<parts.length;i++){
            var split_val = parts[i].split('=');

            // Check argument is available or not e.g. ?num1=43&
            if(split_val[0] == undefined || split_val[0] == '' )
                continue;
            var value = split_val[1];
            // Check value is available or not e.g. ?num1=43&num2= or ?num1=43&num2
            if(value == undefined){
                value = ""; // Assign space if value is not defined
            }

            parameter_obj[split_val[0]] = value;

        }

        // Print all arguments
        return parameter_obj;

    }else{
        return {};
    }

}

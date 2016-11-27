﻿window.onload=function(){
    scForm.postRequest("", "", "", "psr:execute");
};

jQuery(document).ready(function ($) {
    if ($('#progressbar').length > 0) {
        $('#progressbar').empty().VistaProgressBar({
            mode: 'indeterminate',
            width: 355,
            highlightspeed: 3000
        });
        $('#progressbar').VistaProgressBar('start');
    }
    $('#Copyright').each(function() { // Notice the .each() loop, discussed below
        $(this).qtip({
            content: {
                text: "Copyright (c) 2010-2014 <a href='http://www.cognifide.com' target='_blank'>Cognifide Limited</a> &amp; <a href='http://blog.najmanowicz.com/' target='_blank'>Adam Najmanowicz</a>.",
                title: 'Sitecore PowerShell Extensions'
            },
            position: {
                my: 'bottom left',
                at: 'top center'
            },
            style: {
                width: 355,
                "max-width" : 355
            },
            hide: {
                event: false,
                inactive: 3000
            }
        });
    });
});

function undeterminateProgress(id) {
    var widget = $ise(id);
    widget.empty().VistaProgressBar({
        mode: 'indeterminate',
        width: 355,
        highlightspeed: 3000
    }).VistaProgressBar('start');
}

function updateProgress(id, progress) {
    var widget = $ise(id);
    var mode = widget.VistaProgressBar('getMode');
    if (mode != 'determinate') {
        widget.empty().VistaProgressBar({
            mode: 'determinate',
            highlight: true,
            highlightspeed: 1000,
            smooth: true,
            smoothdelta: 1,
            smoothsteps: 10, // &gt; 0 exponent easing, == 0 linear
            smoothdelay: 25 // in milliseconds
        }).VistaProgressBar('setProgress', progress);
    } else {
        widget.VistaProgressBar('setProgress', progress);
    }
}

function scriptFinished(id, hasResults, hasErrors) {
    var progress = $ise(id);
    progress.empty().VistaProgressBar({
        mode: 'determinate',
        highlight: true,
        highlightspeed: 1000,
        smooth: false
    }).VistaProgressBar('setProgress', 100);
    progress.addClass('done');
    if (hasResults || hasErrors) {
        var button;
        if (hasErrors) {
            button = $ise("#ViewErrorsButton");
        } else {
            button = $ise("#ViewButton");
        }
        button
            .fadeIn("slow")
            .css("display", "block")
            .effect("shake", { times: 2, distance:5 }, 1000);
    }
}

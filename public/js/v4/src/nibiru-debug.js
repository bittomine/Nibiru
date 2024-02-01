$(document).ready(() =>
{
    $(() =>
    {
        $("#tabs").tabs();
    });

    $("#nibiru-bar-open").on('click', () =>
    {
        const $nibiruDebug   = $('#nibiru-debug');
        const $nibiruBarOpen = $('#nibiru-bar-open');

        // Using css animations instead of jQuery's animate
        /*$nibiruDebug.toggleClass("up down");
        $nibiruBarOpen.toggleClass("open closed");*/

        // Using jQuery's animate
        let options = {
            duration: 1000,
            easing  : 'easeInElastic',
        };
        if ($nibiruDebug.hasClass('up')) {
            $nibiruDebug.animate({ bottom: '-300px' }, options)
                .removeClass('up')
                .addClass('down');

            $nibiruBarOpen.animate({ bottom: '0px' }, options)
                .removeClass('open')
                .addClass('closed');
        } else {
            $nibiruDebug.animate({ bottom: '0px' }, options)
                .removeClass('down')
                .addClass('up');

            $nibiruBarOpen.animate({ bottom: '300px' }, options)
                .removeClass('closed')
                .addClass('open');
        }
    });

    console.log("Nibiru Debugbar loaded!");
});

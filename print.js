/*-------------------------------------------------------
All javascript and jquery plugins activation
-------------------------------------------------------*/
(function($){

    $('#print').on('click', function() {
            printFunction();
        })

        function printFunction() {
            var contents = $("#print_div").html();
            var frame1 = $('<iframe />');
            frame1[0].name = "frame1";
            frame1.css({
                "position": "absolute",
                "top": "-1000000px"
            });
            $("body").append(frame1);
            var frameDoc = frame1[0].contentWindow;
            frameDoc.document.open();
            //Create a new HTML document.
            frameDoc.document.write('<html><head><title>Lucky Golden Dragon Co.,Ltd</title>');
            //Append the internal CSS file.
            frameDoc.document.write(`
                                    <style>
                                        .card{
                                            border: 0px !important;
                                        }
                                    </style>
                                    `);
            //bootstrap link
            frameDoc.document.write(
                '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" type="text/css" />'
            );
            frameDoc.document.write('</head><body>');

            //Append the DIV contents.
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            var curURL = window.location.href;
            frameDoc.document.close();
            setTimeout(function() {
                window.frames["frame1"].focus();
                history.replaceState(history.state, '', '/');
                window.frames["frame1"].print();
                history.replaceState(history.state, '', curURL);
                frame1.remove();
            }, 200);

        }

})(jQuery);

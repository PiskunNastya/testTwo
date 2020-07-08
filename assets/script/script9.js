var dccBts = (function () {
    try {
        document.addEventListener('DOMContentLoaded', function () {

            var linkElements = document.getElementsByTagName('a');
            for (var i = 0; i < linkElements.length; i++) {
                linkElements[i].setAttribute('data-dcc', 0);
            }

            function watchBotClicks(event) {
                if (!event) {
                    return false;
                }
                var clicked_Element = event.target;
                var clicked_Element_tag_name = event.target.nodeName.toLowerCase();

                if (clicked_Element.getAttribute('data-dcc') !== null || clicked_Element
                    .parentElement.getAttribute('data-dcc') !== null) {
                    if (clicked_Element_tag_name === "a" && clicked_Element.children.length >
                        0 && clicked_Element.getAttribute('data-dcc') !== null) {
                        for (var j = 0; j < clicked_Element.children.length; j++) {
                            clicked_Element.children[j].setAttribute('data-dcc', parseInt(
                                    clicked_Element.children[j].getAttribute('data-dcc')) +
                                1);
                        }
                    } else if (clicked_Element_tag_name !== "a" && clicked_Element.parentElement
                        .tagName.toLowerCase() === "a") {
                        clicked_Element.parentElement.setAttribute('data-dcc', parseInt(
                            clicked_Element.parentElement.getAttribute('data-dcc')) + 1);
                    }

                    if (clicked_Element_tag_name === "a") {
                        if (parseInt(clicked_Element.getAttribute('data-dcc')) >= 3) {
                            handleAttr(clicked_Element);
                        }
                    } else {
                        if (parseInt(clicked_Element.parentElement.getAttribute('data-dcc')) >=
                            3) {
                            handleAttr(clicked_Element.parentElement);
                        }
                    }
                    return false;
                }
            }

            function handleAttr(element) {
                element.removeProperties('target', 'class').setAttribute('href', '#');
                /**
                 * remove event doesn't work somehow
                 */
                // element.removeEventListener('click', watchBotClicks);
                // element.children[0].removeEventListener('click', watchBotClicks);
            };

            var watchedLinkElements = document.querySelectorAll('[data-dcc]');
            for (var l = 0; l < watchedLinkElements.length; l++) {
                watchedLinkElements[l].addEventListener('click', watchBotClicks);
            }
        });
    } catch (error) {}
})();
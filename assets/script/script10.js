 /* This opens a layer, when the user tries to submit the page but did not accept the t&c
         * the layer contains 2 buttons:
         * 1) confirm button accepts the t&c and submits
         * 2) skip button submits the form */
        var Optin_layer = function (options) {
            var self = this;
            var _defaults = {
                layer_id: 'optin_layer',
                hide_class: 'hidden',
                confirm_button_id: 'optin_confirm_button',
                skip_button_id: 'optin_skip_button',
                form_id: 'form_reg_half',
                checkbox_1_id: 'agb',
                checkbox_2_id: 'agb2',
                fake_checkbox_id: 'fake_agb_checkbox'
            };
            var _options = {};

            var init = function (options) {
                _options = (typeof options !== 'object') ? _defaults : Object.merge(_defaults, options);

                if (typeof $(_options.layer_id) === null) {
                    return;
                }

                add_events();
            };

            var add_events = function () {
                if ($(_options.confirm_button_id) !== null && $(_options.fake_checkbox_id) !== null) {
                    $$('#' + _options.confirm_button_id + ', #' + _options.fake_checkbox_id).each(function (
                        trigger) {
                        $(trigger).addEvent('click', function () {
                            if ($(_options.checkbox_1_id) !== null && $(_options
                                .checkbox_2_id) !== null && $(_options.fake_checkbox_id) !==
                                null) {
                                $$('#' + _options.checkbox_1_id + ', #' + _options
                                        .checkbox_2_id + ', #' + _options.fake_checkbox_id)
                                    .each(function (checkbox) {
                                        $(checkbox).set('checked', true);
                                    });
                                disable_buttons();
                                save_log(self.submit_form);
                            }
                        });
                    });
                }

                if ($(_options.skip_button_id) !== null) {
                    $(_options.skip_button_id).addEvent('click', function () {
                        disable_buttons();
                        save_log(self.submit_form);
                    });
                }
            };

            var disable_buttons = function () {
                $(_options.confirm_button_id).removeEvents();
                $(_options.skip_button_id).removeEvents();
                $(_options.fake_checkbox_id).removeEvents();
                $(_options.fake_checkbox_id).set('disabled', true);
                return;
            };

            var save_log = function (do_after_saving) {
                var ident = '';

                // none of the t&c checkboxes has been ticked
                if ($(_options.checkbox_1_id).checked === false && $(_options.checkbox_2_id).checked ===
                    false) {
                    ident = 'agb_dialog_62_agb_0';
                }

                // only the first t&c checkbox has been ticked
                if ($(_options.checkbox_1_id).checked === true && $(_options.checkbox_2_id).checked === false) {
                    ident = 'agb_dialog_62_agb_1';
                }

                // both t&c checkboxes have been ticked
                if ($(_options.checkbox_1_id).checked === true && $(_options.checkbox_2_id).checked === true) {
                    ident = 'agb_dialog_62_agb_2';
                }

                new Request({
                    'url': '/cgi-bin/global.pl?todo=log_misc&ident=' + ident,
                    onComplete: function () {
                        do_after_saving.attempt();
                    }
                }).send();
            };

            self.submit_form = function () {
                if (page_submitted === false) {
                    page_submitted = true;
                    $(_options.form_id).submit();
                }
                return;
            };

            self.test_checkboxes = function () {
                var is_valid = false;
                if ($(_options.checkbox_1_id) !== null && $(_options.checkbox_2_id) !== null) {
                    if ($(_options.checkbox_1_id).get('checked') === true && $(_options.checkbox_2_id).get(
                            'checked') === true) {
                        is_valid = true;
                    }
                }
                return is_valid;
            };

            self.show = function () {
                if (typeof $(_options.layer_id) !== null) {
                    $(_options.layer_id).removeClass(_options.hide_class);
                }
                return;
            };

            self.hide = function () {
                if (typeof $(_options.layer_id) !== null) {
                    $(_options.layer_id).removeClass(_options.hide_class);
                }
                return;
            };

            init(options);
        };
jQuery.entwine("dependentdropdown", function ($) {
    let droparr = [];

    $(":input.dependent-dropdown").entwine({
        onmatch: function () {
            var drop = this;
            droparr.push(drop)

            this.parents('.field:first').addClass('dropdown');

            $(".TreeDropdownField").entwine({
                onchange: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    // console.log($(this).attr('id').replace('Form_ItemEditForm_', ''))

                    for (let i = 0; i < droparr.length; i++) {
                        console.log(droparr[i].data('depends'))

                        if ($(this).attr('id').replace('Form_ItemEditForm_', '') === droparr[i].data('depends')) {
                            var depends = ($("#" + $(this).attr('id')));

                            depends.change(function (e1) {
                                e1.preventDefault();
                                e1.stopPropagation();
                                if ($(this).find('input').val() === '0') {
                                    droparr[i].disable(droparr[i].data('unselected'));
                                    droparr[i].empty().append($("<option />").val("")).attr("disabled", "disabled").trigger("liszt:updated").trigger("chosen:updated");
                                } else if ($(this).find('input').val() > 0) {
                                    droparr[i].disable("Loading...");

                                    $.get(droparr[i].data('link'), {
                                            val: $(this).find('input').val()
                                        },
                                        function (data) {
                                            droparr[i].enable();

                                            if (droparr[i].data('empty') || droparr[i].data('empty') === "") {
                                                droparr[i].append($("<option />").val("").text(droparr[i].data('empty')));
                                            }

                                            $.each(data, function () {
                                                droparr[i].append($("<option />").val(this.k).text(this.v));
                                            });
                                            droparr[i].trigger("liszt:updated").trigger("chosen:updated").trigger("change");
                                        });
                                }
                            });

                            if (!depends) {
                                droparr[i].disable(droparr[i].data('unselected'));
                            }
                        }
                    }

                }
            });

        },
        disable: function (text) {
            this.empty().append($("<option />").val("").text(text)).attr("disabled", "disabled").trigger("liszt:updated").trigger("chosen:updated");
        },
        enable: function () {
            this.empty().removeAttr("disabled").next().removeClass('chzn-disabled');
        }
    });

});

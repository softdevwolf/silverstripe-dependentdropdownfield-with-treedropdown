jQuery.entwine("dependentdropdown", function ($) {

	$(":input.dependent-dropdown").entwine({
		onmatch: function () {
			var drop = this;

			this.parents('.field:first').addClass('dropdown');

			$(".TreeDropdownField").entwine({
				onchange: function (e) {
					e.preventDefault();
					e.stopPropagation();
					if ($(this).attr('id').replace('Form_ItemEditForm_', '') === drop.data('depends')) {
						var depends = ($("#" + $(this).attr('id')));

						depends.change(function (e1) {
							e1.preventDefault();
							e1.stopPropagation();
							if ($(this).find('input').val() === '0') {
								drop.disable(drop.data('unselected'));
								drop.empty().append($("<option />").val("")).attr("disabled", "disabled").trigger("liszt:updated").trigger("chosen:updated");
							} else if ($(this).find('input').val() > 0) {
								drop.disable("Loading...");

								$.get(drop.data('link'), {
										val: $(this).find('input').val()
									},
									function (data) {
										drop.enable();

										if (drop.data('empty') || drop.data('empty') === "") {
											drop.append($("<option />").val("").text(drop.data('empty')));
										}

										$.each(data, function () {
											drop.append($("<option />").val(this.k).text(this.v));
										});
										drop.trigger("liszt:updated").trigger("chosen:updated").trigger("change");
									});
							}
						});

						if (!depends) {
							drop.disable(drop.data('unselected'));
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

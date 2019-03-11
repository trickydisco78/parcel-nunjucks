var SelectBoxes = function () {
    var $elements = {
        select: $('select'),
        selectError: $('select.form-error')
    };

    $elements.select.wrap('<div class="SelectWrapper"></div>');
    $elements.select.parent().append('<span class="SelectValue"></span>');
    if ($elements.selectError.length) {
        $elements.selectError.parent().addClass('form-error');
    }

    $elements.select.each(function () {
        var $this = $(this),
            selected = $this.find('option:selected').length,
            selectedValue = $this.find('option:selected').html(),
            $wrapper = $this.parent(),
            firstValue = $this.find('option:first').html();

        if ($this.attr('data-player-type') !== undefined) {
            $this.parent('.SelectWrapper').attr('data-player-type', $this.attr('data-player-type'));
        }

        if (selected) {
            $wrapper.find('span.SelectValue').html(selectedValue);
        } else {
            $wrapper.find('span.SelectValue').html(firstValue);
        }

        $(document).on('change', 'select', function () {
            var $this = $(this);
            var value = $this.find('option:selected').html();
            $this.parent().find('span.SelectValue').html(value);
        });
    });
};

(SelectBoxes());
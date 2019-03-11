function PostcodeLookup() {

    this.initialise = function (key) {

        var $select = $('.js-country-select');

        $('#postcode_lookup').getAddress({
            api_key: key,  
            output_fields: {
                line_1: '#Address',
                line_2: '#Address2',
                line_3: '#Address3',
                post_town: '#Town',
                county: '#County',
                postcode: '#PostCode'
            }
        });

        function checkOptionSelected() {

            var $selected = $('.js-country-select option:selected').val();
            var $postcodeContainer = $('.postcode-lookup-container');

            if ($selected === 'United Kingdom') {
                $postcodeContainer.css('display', 'block');
            } else {
                $postcodeContainer.css('display', 'none');
            }
        }

        checkOptionSelected();

        $select.change(function () {
            checkOptionSelected();
        });
    };
}

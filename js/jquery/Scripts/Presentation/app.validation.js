function Validation() {

  'use strict';

  var $elements = {
      confirmedInput: $("[data-confirm]"),
      confirmation: null
    },
    $variables = {
      target: null,
      source: null,
      sourceValue: "",
      targetValue: "",
      label: ""
    };

  function confirmInputs() {
    $elements.confirmedInput.each(function () {

      $variables.source = $(this);
      $variables.label = $variables.source.prev("label").text();
      $variables.target = $variables.source.data('confirm');
      $elements.confirmation = $("[name='" + $variables.target + "']");

      $('<span class="error" style="display:none;">*' + $variables.label + ' must match</span>').insertAfter($elements.confirmation);

    });

    $elements.confirmedInput.on('change', function () {

      $variables.source = $(this);
      $variables.sourceValue = $variables.source.val();
      $variables.target = $variables.source.data('confirm');
      $elements.confirmation = $("[name='" + $variables.target + "']");

      $elements.confirmation.on('keyup, change, blur', function () {

        $variables.target = $(this);
        $variables.targetValue = $variables.target.val();

        if ($variables.targetValue !== $variables.sourceValue) {
          $variables.target.addClass("form-error");
          $variables.target.next('.error').css('display', 'block');
        } else {
          $variables.target.removeClass("form-error");
          $variables.target.next('.error').css('display', 'none');
        }

      });

      // TODO: Disable submit and focus on first error

    });

  }

  this.init = function () {
    confirmInputs();
  };

}

var validate = new Validation();
validate.init();
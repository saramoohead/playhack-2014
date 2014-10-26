(function ($, window, document) {
  'use strict';

  var choices = [
        { name: 'Red', html: '<div class="item-circle" style="background-color: red"></div>' },
        { name: 'Blue', html: '<div class="item-circle" style="background-color: blue"></div>' },
        { name: 'Green', html: '<div class="item-circle" style="background-color: green"></div>' },
        { name: 'Yellow', html: '<div class="item-circle" style="background-color: yellow"></div>' },
        { name: 'On Air', html: '<div class="item-circle" style="background-color: lightgray"></div>' },
      ],
      sectionNames = [
        'Left Hand',
        'Left Foot',
        'Right Hand',
        'Right Foot',
      ];


  window.initializeSpinner = function (spinner) {
    var $spinner = $(spinner),
        $textOutput = $($spinner.data('text-output-selector')),
        sectionArc = (360 / sectionNames.length);

    $spinner.append('<div class="spinner-arm-container"><div class="spinner-arm"></div></div>');
    $.each(sectionNames, function (index, sectionName) {
      var $section = $('<div class="spinner-section"></div>');

      $.each(choices, function (choiceIndex, choice) {
        var $item = $('<div class="spinner-section-item">' + choice.html + '</div>');

        $section.append($item);
        $item.css('transform', 'rotate(' + (sectionArc * choiceIndex / choices.length - (sectionArc/2 * (choices.length - 1) / choices.length)) + 'deg)');
        $item.data('section', sectionName);
        $item.data('choice', choices[choiceIndex].name);
      });

      $section.css('transform', 'rotate(' + (360 * index / sectionNames.length) + 'deg)');
      $section.append('<h3 class="spinner-section-name">' + sectionName + '</h3>');
      $spinner.append($section);
    });

    $spinner.click((function ($itemsList, $textOutput) {
      var stepSize = 360 / $itemsList.length,
          disable = false;

      return function (event) {
        if (disable) {
          event.preventDefault();
          return;
        }

        var $this = $(this),
            $arm = $this.find('.spinner-arm-container'),
            revolutions = 4 + Math.ceil(Math.random() * 3),
            itemIndex = Math.floor(Math.random() * $itemsList.length),
            $item = $($itemsList[itemIndex]),
            match = /rotate\((\d+\.\d+|\d+)deg\)/.exec($arm.attr('style')),
            currentDeg = match ? parseFloat(match[1]) : 0;

        disable = true;
        $textOutput.text('Spinning…');
        currentDeg = Math.floor(currentDeg) % 360 + (currentDeg - Math.floor(currentDeg));
        $itemsList.removeClass('active');
        $({ deg: currentDeg }).animate({deg: ((itemIndex - 1.5 * choices.length + 0.5) * stepSize + revolutions * 360) }, {
          duration: (revolutions + 1) * 1000,
          step: (function ($arm) {
            return function (deg) {
              $arm.css('transform', 'rotate(' + deg + 'deg)');
            };
          })($arm),
          complete: (function ($item) {
            return function () {
              $item.addClass('active');

              $textOutput.text(['Landed on', $item.data('choice'), 'from section', $item.data('section')].join(' '));
              disable = false;
            };
          })($item),
        });
      };
    })($spinner.find('.spinner-section-item'), $textOutput));
  };

  $(document).ready(function () {
    $('.spinner').each(function (index, spinner) {
      window.initializeSpinner(spinner);
    });
  });
}).call(this, jQuery, window, document);

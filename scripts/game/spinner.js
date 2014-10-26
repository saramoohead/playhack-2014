'use strict';

angular.module('game')
  .directive('twSpinner', function () {
    var choices = [
          { name: 'Red', color: 'red', html: '<div class="item-circle red-background"></div>' },
          { name: 'Blue', color: 'blue', html: '<div class="item-circle blue-background"></div>' },
          { name: 'Green', color: 'green', html: '<div class="item-circle green-background"></div>' },
          { name: 'Yellow', color: 'yellow', html: '<div class="item-circle yellow-background"></div>' },
          { name: 'On Air', color: 'gray', html: '<div class="item-circle" style="background-color: lightgray"></div>' },
        ],
        sectionNames = [
          'Left Hand',
          'Left Foot',
          'Right Hand',
          'Right Foot',
        ];

    var firstSpin = true;

    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'game/templates/spinner.html',
      link: function ($scope, element, attr) {
        var $spinner = element.find('.spinner'),
            $textOutput = element.find('.spinner-text-output'),
            sectionArc = (360 / sectionNames.length),
            $tickAudio = element.find('.spinner-audio-tick')[0],
            $dingAudio = element.find('.spinner-audio-ding')[0];

        $spinner.append('<div class="spinner-arm-container"><div class="spinner-arm"></div></div>');
        $.each(sectionNames, function (index, sectionName) {
          var $section = $('<div class="spinner-section"></div>');

          $.each(choices, function (choiceIndex, choice) {
            var $item = $('<div class="spinner-section-item">' + choice.html + '</div>');

            $section.append($item);
            $item.css('transform', 'rotate(' + (sectionArc * choiceIndex / choices.length - (sectionArc/2 * (choices.length - 1) / choices.length)) + 'deg)');
            $item.data('section', sectionName);
            $item.data('choice', choices[choiceIndex].name);
            $item.data('color', choices[choiceIndex].color);
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
                currentDeg = match ? parseFloat(match[1]) : 0,
                currentIndex = 0;

            // scripting the first demo hit
            if (firstSpin) {
              itemIndex = 16;
              $item = $($itemsList[itemIndex]);
              revolutions = 4;
            }

            disable = true;
            $textOutput.text('Spinning…');
            currentDeg = Math.floor(currentDeg) % 360 + (currentDeg - Math.floor(currentDeg));
            $itemsList.removeClass('active');
            $({ deg: currentDeg }).animate({deg: ((itemIndex - 0.5 * choices.length + 0.5) * stepSize + revolutions * 360) }, {
              duration: (revolutions + 1) * 1000,
              step: (function ($arm) {
                return function (deg) {
                  var idx = Math.floor(deg / stepSize + 0.5 * choices.length) % $itemsList.length;
                  if (idx !== currentIndex) {
                    $($itemsList[currentIndex]).removeClass('active');
                    currentIndex = idx;
                    $($itemsList[currentIndex]).addClass('active');
                    $tickAudio.pause();
                    $tickAudio.currentTime = 0;
                    $tickAudio.play();
                  }
                  $arm.css('transform', 'rotate(' + deg + 'deg)');
                };
              })($arm),
              complete: (function ($item) {
                return function () {
                  $($itemsList[currentIndex]).removeClass('active');
                  $item.addClass('active');

                  if (firstSpin) {
                    element.find('.spinner-audio-bazinga')[0].play();
                    firstSpin = false;
                  }

                  $dingAudio.play();
                  $textOutput.html([$item.data('section'), ' - <span class="', $item.data('color'), '-color">', $item.data('choice'), '</span>'].join(''));
                  disable = false;
                };
              })($item),
            });
          };
        })($spinner.find('.spinner-section-item'), $textOutput));
      },
    };
  });

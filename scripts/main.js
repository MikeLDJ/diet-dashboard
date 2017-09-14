'use strict';

(function () {
  var blankHrefs = document.querySelectorAll('[href="#"]');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = blankHrefs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var href = _step.value;

      href.addEventListener('click', function (event) {
        return event.preventDefault();
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;

  var classSwitcher = function classSwitcher(elements, newClass) {
    var elementList = document.querySelectorAll(elements);
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop = function _loop() {
        var item = _step2.value;

        item.addEventListener('click', function (event) {
          event.preventDefault();
          item.classList.toggle(newClass);
        });
      };

      for (var _iterator2 = elementList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  };

  var optionsMaintainer = function () {
    classSwitcher('.icon__options-selector', 'icon__options-selector--disabled');
  }();

  var periodMaintainer = function () {
    var progressBarElements = document.querySelectorAll('.progress-bar__item');
    var periodView = document.querySelector('.period-selector');
    var periodDown = document.querySelector('.period-selector__control--left');
    var periodUp = document.querySelector('.period-selector__control--right');
    var periodList = [];
    for (var i = 1; i <= 12; i++) {
      periodList.push('Week ' + i);
    };

    var currentPeriodIndex = 6;

    periodDown.addEventListener('click', function () {
      currentPeriodIndex === 0 ? currentPeriodIndex = 11 : currentPeriodIndex--;
      switchPeriod(currentPeriodIndex);
      displayProgress(currentPeriodIndex);
    });

    periodUp.addEventListener('click', function () {
      currentPeriodIndex === 11 ? currentPeriodIndex = 0 : currentPeriodIndex++;
      switchPeriod(currentPeriodIndex);
      displayProgress(currentPeriodIndex);
    });

    var switchPeriod = function switchPeriod(newPeriodIndex) {
      periodView.innerHTML = periodList[newPeriodIndex];
    };

    var displayProgress = function displayProgress(progress) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = progressBarElements.keys()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var index = _step3.value;

          if (index < currentPeriodIndex) {
            setDot(index, 'done');
          } else if (index === currentPeriodIndex) {
            setDot(index, 'active');
          } else {
            setDot(index, 'pending');
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    };

    var setDot = function setDot(index, state) {
      var item = progressBarElements[index].querySelector('.progress-bar__dot');
      item.classList = '';
      item.classList.add('progress-bar__dot', 'progress-bar__dot--' + state);
    };
  }();

  var tableMaintainer = function () {
    var windowWidth = window.innerWidth;
    var headerRows = document.querySelectorAll('.table__column--lead .table__row--header').length;
    var rowsNo = document.querySelectorAll('.table__column--lead .table__row').length - headerRows;
    var rows = [];
    var rowsContent = [];

    function checkWidth() {
      windowWidth = window.innerWidth;
      setTitleRows();
    };

    function generateContent(array) {
      var content = [];
      Array.prototype.map.call(array, function (el) {
        content.push(el.innerHTML);
      });
      return content;
    }

    for (var i = 0; i < rowsNo; i++) {
      rows.push(document.querySelectorAll('.table__row--' + (i + 1)));
      rowsContent.push(generateContent(rows[i]));
    }

    function setTitleRows() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = rows.keys()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var index = _step4.value;

          if (windowWidth < 992) {
            for (var _i = 0; _i < rowsNo; _i++) {
              var newContent = '<span class="row-aside">' + rowsContent[index][0] + '</span>' + rowsContent[index][_i];
              rows[index][_i].innerHTML = newContent;
            }
          } else {
            for (var _i2 = 0; _i2 < rowsNo; _i2++) {
              rows[index][_i2].innerHTML = rowsContent[index][_i2];
            }
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      ;
    };

    function debounce(func) {
      var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var timeout;
      return function () {
        var context = this,
            args = arguments;
        var later = function later() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

    setTitleRows();
    window.addEventListener('resize', debounce(checkWidth));
  }();
})();
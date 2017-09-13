(function() {
  const blankHrefs = document.querySelectorAll('[href="#"]');
  for (const href of blankHrefs) {
    href.addEventListener('click', event => event.preventDefault());
  };

  const classSwitcher = (elements, newClass) => {
    const elementList = document.querySelectorAll(elements);
    for (const item of elementList) {
      item.addEventListener('click', event => {
        event.preventDefault();
        item.classList.toggle(newClass);
      })
    }
  };

  const optionsMaintainer = (function(){
    classSwitcher('.icon__options-selector', 'icon__options-selector--disabled');
  })();

  const periodMaintainer = (function() {
    const progressBarElements = document.querySelectorAll('.progress-bar__item');
    const periodView = document.querySelector('.period-selector');
    const periodDown = document.querySelector('.period-selector__control--left');
    const periodUp = document.querySelector('.period-selector__control--right');
    const periodList = [];
    for (let i = 1; i <= 12; i++) {
      periodList.push(`Week ${i}`);
    };

    let currentPeriodIndex = 6;

    periodDown.addEventListener('click', () => {
      currentPeriodIndex === 0 ? currentPeriodIndex = 11 : currentPeriodIndex--;
      switchPeriod(currentPeriodIndex);
      displayProgress(currentPeriodIndex);
    });

    periodUp.addEventListener('click', () => {
      currentPeriodIndex === 11 ? currentPeriodIndex = 0 : currentPeriodIndex++;
      switchPeriod(currentPeriodIndex);
      displayProgress(currentPeriodIndex);
    });

    const switchPeriod = newPeriodIndex => {
      periodView.innerHTML = periodList[newPeriodIndex];
    };

    const displayProgress = progress => {
      for (const index of progressBarElements.keys()) {
        if (index < currentPeriodIndex) {
          setDot(index, 'done');
        } else if (index === currentPeriodIndex) {
          setDot(index, 'active');
        } else {
          setDot(index, 'pending');
        }
      }
    };

    const setDot = (index, state) => {
      const item = progressBarElements[index].querySelector(`.progress-bar__dot`);
      item.classList = '';
      item.classList.add('progress-bar__dot', `progress-bar__dot--${state}`);
    }
  })();

  const tableMaintainer = (function() {
    let windowWidth = window.innerWidth;
    const headerRows = document.querySelectorAll('.table__column--lead .table__row--header').length;
    const rowsNo = document.querySelectorAll('.table__column--lead .table__row').length - headerRows;
    const rows = [];
    const rowsContent = [];

    function checkWidth() {
      windowWidth = window.innerWidth;
      setTitleRows();
    };

    function generateContent(array) {
      let content = [];
      Array.prototype.map.call(array, el => {
        content.push(el.innerHTML);
      });
      return content;
    }

    for (let i = 0; i < rowsNo; i++) {
      rows.push(document.querySelectorAll(`.table__row--${ i + 1 }`));
      rowsContent.push(generateContent(rows[i]));
    }

    function setTitleRows() {
      for (const index of rows.keys()) {
        if (windowWidth < 992) {
          for (let i = 0; i < rowsNo; i++) {
            const newContent = `<span class="row-aside">${ rowsContent[index][0] }</span>${ rowsContent[index][i] }`;
            rows[index][i].innerHTML = newContent;
          }
        } else {
          for (let i = 0; i < rowsNo; i++) {
            rows[index][i].innerHTML = rowsContent[index][i];
          }
        }
      };
    };

    function debounce(func, wait = 100, immediate = false) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
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
  })();
})();

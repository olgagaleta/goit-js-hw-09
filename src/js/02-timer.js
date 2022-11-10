import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePickerRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('button[data-start]');
const dataDaysRef = document.querySelector('[data-days]');
const dataHoursRef = document.querySelector('[data-hours]');
const dataMinutesRef = document.querySelector('[data-minutes]');
const dataSecondsRef = document.querySelector('[data-seconds]');

startBtnRef.disabled = true;

let newTime = 0;
let intervalId = null;

const options = {
  // вмикає засіб вибору часу
  enableTime: true,

  // Відображає засіб вибору часу в 24-годинному режимі
  // без вибору AM/PM, якщо ввімкнено.
  time_24hr: true,

  //   Встановлює початкові вибрані дати.
  // Якщо ви використовуєте mode: "multiple"календар діапазону ,
  // Array надайте Date об’єкти або масив рядків дат, які слідують за
  // вашим dateFormat.
  // В іншому випадку ви можете надати один об’єкт Date або рядок дати.
  defaultDate: new Date(),

  // Регулює крок для введення хвилин (включно з прокручуванням)
  minuteIncrement: 1,

  dateFormat: 'Y-m-d H:i',

  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (new Date() > selectedDates[0]) {
      startBtnRef.disabled = true;

      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } else {
      startBtnRef.disabled = false;

      startBtnRef.addEventListener('click', () => {
        startBtnRef.disabled = true;
        newTime = selectedDates[0].getTime() - new Date().getTime();

        const timerId = setInterval(() => {
          newTime -= 1000;

          console.log(convertMs(newTime));
          console.log(newTime);

          const { days, hours, minutes, seconds } = convertMs(newTime);

          dataDaysRef.textContent = addLeadingZero(String(days));
          dataHoursRef.textContent = addLeadingZero(String(hours));
          dataMinutesRef.textContent = addLeadingZero(String(minutes));
          dataSecondsRef.textContent = addLeadingZero(String(seconds));

          if (newTime <= 1000) {
            clearInterval(timerId);
            startBtnRef.disabled = false;
          }
        }, 1000);
      });
      console.log(newTime);
    }
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

flatpickr(datetimePickerRef, { ...options });

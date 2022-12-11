import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}

refs.startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] - new Date() < 0){
        Notiflix.Notify.failure('Please choose a date in the future');
        refs.startBtn.disabled = true;
      } else {
        refs.startBtn.disabled = false;
        refs.startBtn.addEventListener('click', dataTimer);

        function dataTimer() {
                const timerId = setInterval(() => {
                let diff = selectedDates[0] - new Date();
                let countTime = convertMs(diff);

                if (diff < 1000){
                    clearInterval(timerId);
                }
                if (timerId){
                    refs.startBtn.disabled = true;
                    // Notiflix.Notify.success('The time has come!');
                }
                refs.days.textContent = addLeadingZero(countTime.days);
                refs.hours.textContent = addLeadingZero(countTime.hours);
                refs.minutes.textContent = addLeadingZero(countTime.minutes);
                refs.seconds.textContent = addLeadingZero(countTime.seconds); }, 1000);
        }
      }
    },
  };

  flatpickr(refs.input, options);

  function addLeadingZero(value) {
    return value.toString().padStart(2, [0]);
  }

  function convertMs(ms) {
    const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;
 
   const days = Math.floor(ms / day);
   const hours = Math.floor((ms % day) / hour);
   const minutes = Math.floor(((ms % day) % hour) / minute);
   const seconds = Math.floor((((ms % day) % hour) % minute) / second);
 
   return { days, hours, minutes, seconds };
 }
 
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
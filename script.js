document.addEventListener('DOMContentLoaded', function () {
  fetch('eventos.json')
    .then(response => response.json())
    .then(data => {

      const calendarEl = document.getElementById('calendar');

      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        events: data.map(evento => ({
          title: evento.actividad,
          date: evento.fecha,
          extendedProps: {
            localidad: evento.localidad,
            barrio: evento.barrio
          }
        })),
        eventClick: function(info) {
          document.getElementById('modal-title').innerText = info.event.title;
          document.getElementById('modal-date').innerText = info.event.startStr;
          document.getElementById('modal-localidad').innerText = info.event.extendedProps.localidad;
          document.getElementById('modal-barrio').innerText = info.event.extendedProps.barrio;

          document.getElementById('modal').style.display = "block";
        }
      });

      calendar.render();
    });

  document.getElementById('close').onclick = function() {
    document.getElementById('modal').style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
      document.getElementById('modal').style.display = "none";
    }
  }
});

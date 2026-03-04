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
            barrio: evento.barrio,
            hora: evento.hora,
            direccion: evento.direccion,
            salon: evento.salon,
            contacto: evento.contacto
          }
        })),
        eventClick: function(info) {
            /*
            const fechaObj = new Date(info.event.start);
            const opciones = { day: 'numeric', month: 'long' };
            const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opciones);
            const hora = info.event.extendedProps.hora || '';
            const salon = info.event.extendedProps.salon || '';*/

            const fechaObj = new Date(info.event.start);
            const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
            const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opciones);

            const localidad = info.event.extendedProps.localidad || '';
            const barrio = info.event.extendedProps.barrio || '';
            const hora = info.event.extendedProps.hora;
            const salon = info.event.extendedProps.salon || '';
            const direccion = info.event.extendedProps.direccion;
            const contacto = info.event.extendedProps.contacto || '';

            // Construcción condicional
            let texto = `La Unidad Administrativa Especial de la Aeronautica Civil, invita a participar, en la actividad de ${info.event.title} de la localidad de ${localidad}, el próximo ${fechaFormateada}`;
            
            if (hora) {
              texto += ` a las ${hora}`;
            }
            if (salon){
              texto += `, en el ${salon}`;  
            }

            texto += `del barrio ${barrio}`;
  
            if (direccion) {
              texto += `, dirección ${direccion}`;
            }

            texto += `.

Para mayor información comunicarse con la profesional social ${contacto}.

Esperamos contar con su valiosa asistencia.`;
          
            /*const texto = `
        La Unidad Administrativa Especial de la Aeronautica Civil, invita a participar, en ${info.event.title} de la localidad de ${info.event.extendedProps.localidad}, 
        el próximo ${fechaFormateada} de 2026 a las ${hora}, 
        en el ${salon} del barrio ${info.event.extendedProps.barrio}, 
        dirección ${info.event.extendedProps.direccion}.

        Para mayor información comunicarse con la profesional social ${info.event.extendedProps.contacto}.

        Esperamos contar con su valiosa asistencia.
        `;*/
          
          document.getElementById('modal-texto').innerText = texto;
          /*document.getElementById('modal').classList.add('show');*/
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

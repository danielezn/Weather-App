import jQuery from 'jquery';
import moment from 'moment-timezone'

class Clock {

    updateClock(id, timezone) {
        setInterval(function(){
            let reloj = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
            var divLocal = $('#' + id);
            divLocal.text(reloj)
        },1000);
    }
}

export default Clock;
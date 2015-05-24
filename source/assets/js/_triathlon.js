/**
 * Triathlon partial
 *
 * Implements timers etc across the triathlon page
 */

g.triathlon = function() {
	var self = g.triathlon;

	self.selectors = {
		eventsHero: "[data-js='add-tri-event-clock']",
		eventsClock: "[data-js='update-clock-time']"
	}
	self.classes = {
		isTriathlon: "triathlon_index",
		clockDigit: "hero--tri__clock__num",
		clockSeparator: "hero--tri__clock__sep"
	}

	String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10) / 1000,
    	days		  = Math.floor(sec_num / 86400),
    	hours     = Math.floor((sec_num - (days * 86400)) / 3600),
    	minutes   = Math.floor((sec_num - (days * 86400) - (hours * 3600)) / 60),
    	seconds   = Math.floor(sec_num - (days * 86400) - (hours * 3600) - (minutes * 60)),
    	separator = '<span class="' + self.classes.clockSeparator + '">:</span>'

    if (hours   < 10) { hours   = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    var time    = self.wrapNum(days, "days") + separator + self.wrapNum(hours, "hrs") + separator + self.wrapNum(minutes, "mins") + separator + self.wrapNum(seconds, "secs");
    return time;
	};

	self.wrapNum = function(n, u) {
		return '<span class="' + self.classes.clockDigit + '" data-unit="' + u + '">' + n + '</span>';
	}

	self.updateTimes = function() {
		var today = new Date(),
			clockSet = false,
			eventsLength = events.length;
		if (eventsLength) {
			for (var i = 0, l = eventsLength; i < l; i++) {
				var that = events[i],
					eventDate = new Date(that.date),
					eventWait = (today - eventDate) * -1;
				if (eventWait > 0 && !clockSet) {
					var eventsClock = document.querySelector(self.selectors.eventsClock);
					if (eventsClock) {
						eventsClock.innerHTML = eventWait.toString().toHHMMSS();
					}
					else {
						var eventNode = document.createElement('div'),
          		clockInsert = document.querySelector(self.selectors.eventsHero),
		          nextEvent =  '<strong class="sc">Next event</strong>';
							nextEvent += '<span>' + that.event + '</span>';
							nextEvent += '<span class="hero--tri__clock" data-js="update-clock-time">';
							nextEvent += eventWait.toString().toHHMMSS();
							nextEvent += '</span>';
		        eventNode.innerHTML = nextEvent;
		        eventNode.className = 'hero--tri__next';
		        clockInsert.insertBefore(eventNode, clockInsert.firstChild);
					}
					clockSet = true;
					setTimeout(function() {
						self.updateTimes();
					}, 1000);
				}
			};
		};
	};

	self.ready = function() {
		if (typeof(events) != "undefined") {
	  	self.updateTimes();
	  };
  };

  self.ready();
	

};
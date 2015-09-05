/**
 * Strava Scroll partial
 */


g.strava = function() {
  var self = g.strava;

  self.selectors = {
    parent: "[data-js='insert-strava-data']"
  }

  self.dataSet = {
    total: 50,
    token: "33867077b8eb0e77f5af60e7e9e2e608ec87e4e0",
    callback: "populateData",
    data: null
  }
  var url = 'https://www.strava.com/api/v3/athlete/activities?per_page=' + self.dataSet.total + '&access_token=' + self.dataSet.token + '&callback=' + self.dataSet.callback

  var $jsonp = (function(){
    var that = {};

    that.send = function(src, options) {
      var callback_name = options.callbackName || 'callback',
        on_success = options.onSuccess || function(){},
        on_timeout = options.onTimeout || function(){},
        timeout = options.timeout || 10; // sec

      var timeout_trigger = window.setTimeout(function(){
        window[callback_name] = function(){};
        on_timeout();
      }, timeout * 1000);

      window[callback_name] = function(data){
        window.clearTimeout(timeout_trigger);
        on_success(data);
      }

      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = src;

      document.getElementsByTagName('head')[0].appendChild(script);
    }

    return that;
  })();

  this.getActivities = function() {
    $jsonp.send(url, {
      callbackName: self.dataSet.callback,
      onSuccess: function(json){
        self.dataSet.data = json;
        self.populateActivities(json);
      },
      onTimeout: function(){
        console.log('timeout!');
      },
      timeout: 5
    });
  };

  self.populateActivities = function(data) {
    var stravaList = ""
      dataLength = data.length;
    for (var i = 0; i < dataLength; i++) {
      stravaList += self.createActivity(data[i]);
    }
    document.getElementById("myDiv").innerHTML = stravaList
  };

  self.createActivity = function(activity) {
    console.log(activity);
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May", 
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
      date = new Date(activity.start_date_local),
      currentDate = new Date(),
      formattedDate = self.rationaliseDigit(date.getDate()) + ' ' + monthNames[date.getMonth()].substring(0, 3) + (date.getFullYear() < currentDate.getFullYear() ? ' ' + date.getFullYear().toString().substring(2, 4) : '');
    str =   '<a href="https://strava.com/activities/' + activity.id + '" class="list--large-icons__item triathlon-strava__item ss-triathlon-' + activity['type'].toLowerCase() + '">';
    str +=    '<h3>' + activity['name'] + '</h3>';
    str +=    '<p><strong class="sc">' + formattedDate + '</strong> ';
    str +=    self.getDistance(activity.distance);
    str +=    ' in ' + self.getDuration(activity.elapsed_time) + '</p>';
    str +=  '</a>';
    return str;
  } 

  self.getDuration = function(seconds, format) {
    var leftover = seconds;
    var hours = Math.floor(leftover / 3600);
    leftover = leftover - (hours * 3600);
    var minutes = Math.floor(leftover / 60);
    leftover = leftover - (minutes * 60);
    var toReturn = (hours ? hours + ':' : '') + self.rationaliseDigit(minutes) + ':' + self.rationaliseDigit(leftover);
    return toReturn;
  };

  self.getPace = function(speed, distance, unit) {
    return self.getDuration(distance / speed, 'hh:mm:ss') + '&#8202;/' + unit;  
  };

  self.getSpeed = function(speed) {
    return self.roundToNum(speed * (60 * 60 / 1000), 2) + '&#8202;kph';
  }

  self.getElevation = function(elevation) {
    return elevation + '&#8202;m';
  };

  self.getHeartRate = function(hr) {
    return self.roundToNum(hr, 0) + '&#8202;bpm';
  };

  self.getDistance = function(distance) {
    return self.roundToNum(distance / 1000, 2) + 'km';
  };

  self.rationaliseDigit = function(digit) {
    return (digit < 10 ? "0" : "") + Math.floor(digit);
  };

  self.roundToNum = function(num, dec) {
    return +(Math.round(num + "e+"+dec)  + "e-"+dec);
  };

  // this.getActivities();

  //   this.strava = function(opts) {
  //   var showStrava = this.getBooleanAttribute('show_strava');
  //   if(showStrava) {
  //     var totalNumber = opts.number;
  //     $.getJSON('https://www.strava.com/api/v3/athlete/activities?per_page=' + totalNumber + '&access_token=' + opts.token + '&callback=?', function(data) {
  //       if (data.length >= totalNumber) {
  //         var activityList = $(self.selectors.stravaData),
  //           html = '',
  //           t = 0;
  //           maps = [];
  //         while (t < totalNumber) {
  //           if (data[t]) {
  //             var activity = data[t],
  //               opts = {};
  //               opts.idx = t;
  //               opts.date = activity.start_date_local || false;
  //               opts.title = activity.name;
  //               opts.distance = activity.distance;
  //               opts.url = 'https://strava.com/activities/' + activity.id;
  //               opts.discipline = activity.type;
  //               opts.extra = {};
  //               opts.extra.heart = activity.average_heartrate;
  //               opts.extra.speed = activity.average_speed;
  //               opts.extra.kilojoules = activity.kilojoules;
  //               opts.extra.elevation = activity.total_elevation_gain;
  //               opts.extra.awards = activity.achievement_count;
  //               if (activity.start_latitude != null) {
  //                 opts.hasMap = true;
  //                 map = {};
  //                 map.lat = [activity.start_latlng[0], activity.end_latlng[0]];
  //                 map.lng = [activity.start_latlng[1], activity.end_latlng[1]];
  //                 map.line = activity.map.summary_polyline;
  //                 maps.push(map);
  //               }
  //               else {
  //                 opts.hasMap = false;
  //                 maps.push(null);
  //               }
  //             html += self.createActivity(opts);
  //             if (!opts.hasMap) {
  //               $('.team__strava').addClass('team__strava--loaded');
  //             }
  //           };
  //           t++;
  //         };
  //         activityList.empty().append(html);
  //         self.stravaMapSetup(maps);
  //       }
  //       else {
  //         $('.team__strava').remove();
  //       };
  //     });
  //   } else {
  //     $('.team__strava').remove();
  //   }
  // };

  // this.createActivity = function(activity) {
  //   var discipline = activity.discipline.toLowerCase(),
  //     data = '',
  //     extra = activity.extra,
  //     extras = '',
  //     
  //     date = new Date(activity.date),
  //     currentDate = new Date(),
  //     formattedDate = self.rationaliseDigit(date.getDate()) + ' ' + monthNames[date.getMonth()].substring(0, 3) + (date.getFullYear() < currentDate.getFullYear() ? ' ' + date.getFullYear().toString().substring(2, 4) : ''),
  //     givenName = $('[data-json-replace="given_name"]:first').text(),
  //     activityDate = '<time datetime="' + date + '" class="team__strava__date">' + formattedDate + '</time>';
  //   if (activity.distance) {
  //     data += self.stravaDataItem('distance', self.getDistance(activity.distance), stravaTranslations.metrics.distance);
  //   }
  //   if (activity.duration) {
  //     data += self.stravaDataItem('duration', self.getDuration(activity.duration,''), stravaTranslations.metrics.duration);
  //   }
  //   if (extra) {
  //     if (extra.speed) {
  //       if (discipline == 'ride') {
  //         extras += self.stravaDataItem('pace', self.getSpeed(extra.speed), stravaTranslations.metrics.speed);
  //       }
  //       else {
  //         var distance = discipline == 'swim' ? {distance: 100, unit: '100m'} : {distance: 1000, unit: 'km'};
  //         extras += self.stravaDataItem('pace', self.getPace(extra.speed, distance.distance, distance.unit), stravaTranslations.metrics.pace);
  //       }
  //     }
  //     if (extra.heart) {
  //       extras += self.stravaDataItem('hr', self.getHeartRate(extra.heart), stravaTranslations.metrics.hr);
  //     }
  //     if (extra.elevation) {
  //       extras += self.stravaDataItem('elevation', self.getElevation(extra.elevation), stravaTranslations.metrics.elevation);
  //     }
  //     if (extra.awards) {
  //       extras += self.stravaDataItem('awards', extra.awards, stravaTranslations.metrics.awards);
  //     }
  //   }

  // this.stravaDataItem = function(sClass, sValue, sHiddenLabel) {
  //   var str = '<span class="team__strava__data-item--' + sClass + '">';
  //     str +=    '<span class="team__strava__data-label">' + sHiddenLabel.replace('Average','<abbr title="Average">Avg</abbr>') + '<span class="visuallyhidden">: </span></span>';
  //     str +=    '<span class="team__strava__data-value">' + sValue + ' </span>';
  //     str +=  '</span>';
  //   return str;
  // };

  // this.stravaCreateMap = function(map, index) {
  //   var thisMap = ourMaps[index],
  //     latDiff = map.lat[0] - ((map.lat[0] - map.lat[1]) / 2),
  //     lngDiff = map.lng[0] - ((map.lng[0] - map.lng[1]) / 2),
  //     myLatlng = new google.maps.LatLng(latDiff, lngDiff),
  //     myOptions = {
  //       zoom: 13,
  //       center: myLatlng,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP,
  //       scrollwheel:false,
  //       styles:[
  //         {
  //           featureType: "road.highway",
  //           elementType: "labels",
  //           "stylers": [
  //             { "visibility": "off" }
  //           ]
  //         },
  //         {
  //           featureType: "transit",
  //           elementType: "",
  //           "stylers": [
  //             { "visibility": "off" }
  //           ]
  //         },
  //         {
  //           featureType: "poi",
  //           elementType: "",
  //           "stylers": [
  //             { "visibility": "off" }
  //           ]
  //         },
  //         {
  //           featureType: "road.arterial",
  //           elementType: "labels",
  //           "stylers": [
  //             { "visibility": "off" }
  //           ]
  //         },
  //         {
  //           stylers:[
  //             { lightness: -80 },
  //             { gamma: 0.89 },
  //             { saturation: -100 }
  //           ]
  //         }
  //       ],
  //       disableDefaultUI:true,
  //       draggable: false,
  //     },
  //     decodedPath = google.maps.geometry.encoding.decodePath(map.line), 
  //     decodedLevels = self.decodeLevels("BB");
  //   self.thisMap = [];
  //   self.thisMap[index] = new google.maps.Map(document.getElementById("map--" + index), myOptions);

  //   self.setRegion = [];
  //   self.setRegion[index] = new google.maps.Polyline({
  //       path: decodedPath,
  //       levels: decodedLevels,
  //       strokeColor: "#ae0000",
  //       strokeOpacity: 1.0,
  //       strokeWeight: 4,
  //       map: self.thisMap[index],
  //   }); 

  //   self.centerMap(self.setRegion[index], self.thisMap[index]);

  //   $('.team__strava').addClass('team__strava--loaded');

  //   $(window).on('resize', $.debounce(100, false, function() {
  //     if (FLD.PageType.type == 'member' && $('#map--0').length) {
  //       self.centerMap(self.setRegion[0], self.thisMap[0])
  //     };
  //   }));

  // };

  // this.centerMap = function(thisRegion, setMap) {
  //   var bounds = new google.maps.LatLngBounds();
  //   thisRegion.getPath().forEach(function(e) {
  //       bounds.extend(e);
  //   });
  //   setMap.fitBounds(bounds);
  // };

  // this.decodeLevels = function(encodedLevelsString) {
  //   var decodedLevels = [];
  //   for (var i = 0; i < encodedLevelsString.length; ++i) {
  //       var level = encodedLevelsString.charCodeAt(i) - 63;
  //       decodedLevels.push(level);
  //   };
  //   return decodedLevels;
  // };

  // this.getSvg = function(selector, replacement) {
  //   var svg = document.getElementById(selector);
  //   //svg.setAttribute('class', replacement);
  //   var serializer = new XMLSerializer();
  //   var str = serializer.serializeToString(svg);
  //   return str.replace('visuallyhidden', replacement);
  // };

  // this.numberWithCommas = function(x) {
  //   var parts = x.toString().split(".");
  //   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   return parts.join(".");
  // }


};
function display_blackout_overlay() {
  var start = new Date(blackout_config.start || "2019-03-21T00:00:00");
  var end = new Date(blackout_config.end || "2019-03-21T23:59:59");
  var close_wait = blackout_config.time_click || 0;
  var close_text = blackout_config.close_text || "Schlie&szlig;en";
  var cookie_time = blackout_config.cookie_time || 500;
  var now = new Date();
  var overlay = document.querySelector('#offlineday_overlay');
  var overlay_close_box = document.querySelector('#overlay_close_box');
  if(getCookie('copyright_overlay')==='1') {
    return;
  }
  if((now<end) && (now>start)) {
    setCookie('copyright_overlay','1',cookie_time);
    console.log("Displaying copyright blackout overlay!");
    overlay.style.display = "block";
    overlay_close_box.innerHTML = close_wait;
    // Countdown until overlay could be closed
    if(close_wait > 0) {
      var close_int = setInterval(function() {
      close_wait--;
      overlay_close_box.innerHTML = close_wait;
      if(close_wait<=0) {
        overlay_close_box.innerHTML = '<a href="javascript:void(0)" id="overlay_close">'+close_text+'</a>';
        clearInterval(close_int);
        var overlay_close_link = document.querySelector('#overlay_close');
        overlay_close_link.addEventListener('click',function() {
          overlay.style.display = "none";
        });
      }
    },1000);
  } else {
    overlay_close_box.innerHTML = '<a href="javascript:void(0)" id="overlay_close">'+close_text+'</a>';
    var overlay_close_link = document.querySelector('#overlay_close');
    overlay_close_link.addEventListener('click',function() {
      overlay.style.display = "none";
    });
  }
  }
}
// Force display of the overlay by deleting the cookie first
function force_display_blackout_overlay() {
setCookie('copyright_overlay','1',-10);
display_blackout_overlay();
}
// Helper functions for managing cookies
function setCookie(cname, cvalue, ex) {
  var d = new Date();
  d.setTime(d.getTime() + (ex*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

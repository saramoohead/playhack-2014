(function (d) {
    d.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (f, e) {
        d.fx.step[e] = function (g) {
            if (!g.colorInit) {
                g.start = c(g.elem, e);
                g.end = b(g.end);
                g.colorInit = true
            }
            g.elem.style[e] = "rgb(" + [Math.max(Math.min(parseInt((g.pos * (g.end[0] - g.start[0])) + g.start[0]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[1] - g.start[1])) + g.start[1]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[2] - g.start[2])) + g.start[2]), 255), 0)].join(",") + ")"
        }
    });

    function b(f) {
        var e;
        if (f && f.constructor == Array && f.length == 3) {
            return f
        }
        if (e = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)) {
            return [parseInt(e[1]), parseInt(e[2]), parseInt(e[3])]
        }
        if (e = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)) {
            return [parseFloat(e[1]) * 2.55, parseFloat(e[2]) * 2.55, parseFloat(e[3]) * 2.55]
        }
        if (e = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)) {
            return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
        }
        if (e = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)) {
            return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
        }
        if (e = /rgba\(0, 0, 0, 0\)/.exec(f)) {
            return a.transparent
        }
        return a[d.trim(f).toLowerCase()]
    }
    function c(g, e) {
        var f;
        do {
            f = d.css(g, e);
            if (f != "" && f != "transparent" || d.nodeName(g, "body")) {
                break
            }
            e = "backgroundColor"
        } while (g = g.parentNode);
        return b(f)
    }
    var a = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    }
})(jQuery);

(function () {
  $(window).load(function() {
    $('audio').each(function(){
      $(this)[0].volume = 0;
      $(this)[0].play();
    });

    //Bind events
    $(document).on( "click", ".twister-btn", function() {
      $(this).children(":first")[0].play();
    });

    $(document).on('keyup',function(e){
      var key = String.fromCharCode(e.which).toLowerCase(),
          bool = false;
      console.log("keyup - " + key);
      switch (key) {
        //fire green sounds
        case "":
          changeAudio("green", 0, bool);
        break;
        case "t":
          changeAudio("green", 1, bool);
        break;
        case "s":
          changeAudio("green", 2, bool);
        break;
        case "h":
          changeAudio("green", 3, bool);
        break;
        case "c":
          changeAudio("green", 4, bool);
        break;
        case "n":
          changeAudio("green", 5, bool);
        break;
        //fire yellow sounds
        case "":
          changeAudio("yellow", 0, bool);
        break;
        case "y":
          changeAudio("yellow", 1, bool);
        break;
        case "a":
          changeAudio("yellow", 2, bool);
        break;
        case "f":
          changeAudio("yellow", 3, bool);
        break;
        case "z":
          changeAudio("yellow", 4, bool);
        break;
        case "b":
          changeAudio("yellow", 5, bool);
        break;
        //fire blue sounds
        case "r":
          changeAudio("blue", 0, bool);
        break;
        case "q":
          changeAudio("blue", 1, bool);
        break;
        case "d":
          changeAudio("blue", 2, bool);
        break;
        case "g":
          changeAudio("blue", 3, bool);
        break;
        case "v":
          changeAudio("blue", 4, bool);
        break;
        case "":
          changeAudio("blue", 5, bool);
        break;
        //fire red sounds
        case "e":
          changeAudio("red", 0, bool);
        break;
        case "w":
          changeAudio("red", 1, bool);
        break;
        case "":
          changeAudio("red", 2, bool);
        break;
        case "":
          changeAudio("red", 3, bool);
        break;
        case "":
          changeAudio("red", 4, bool);
        break;
        case "x":
          changeAudio("red", 5, bool);
        break;
      }
    });

    $(document).on('keydown',function(e){
      var key = String.fromCharCode(e.which).toLowerCase(),
          bool = true;
      console.log("keydown - " + key);
      switch (key) {
        //fire green sounds
        case "":
          changeAudio("green", 0, bool);
        break;
        case "t":
          changeAudio("green", 1, bool);
        break;
        case "s":
          changeAudio("green", 2, bool);
        break;
        case "h":
          changeAudio("green", 3, bool);
        break;
        case "c":
          changeAudio("green", 4, bool);
        break;
        case "n":
          changeAudio("green", 5, bool);
        break;
        //fire yellow sounds
        case "":
          changeAudio("yellow", 0, bool);
        break;
        case "y":
          changeAudio("yellow", 1, bool);
        break;
        case "a":
          changeAudio("yellow", 2, bool);
        break;
        case "f":
          changeAudio("yellow", 3, bool);
        break;
        case "z":
          changeAudio("yellow", 4, bool);
        break;
        case "b":
          changeAudio("yellow", 5, bool);
        break;
        //fire blue sounds
        case "r":
          changeAudio("blue", 0, bool);
        break;
        case "q":
          changeAudio("blue", 1, bool);
        break;
        case "d":
          changeAudio("blue", 2, bool);
        break;
        case "g":
          changeAudio("blue", 3, bool);
        break;
        case "v":
          changeAudio("blue", 4, bool);
        break;
        case "":
          changeAudio("blue", 5, bool);
        break;
        //fire red sounds
        case "e":
          changeAudio("red", 0, bool);
        break;
        case "w":
          changeAudio("red", 1, bool);
        break;
        case "":
          changeAudio("red", 2, bool);
        break;
        case "":
          changeAudio("red", 3, bool);
        break;
        case "":
          changeAudio("red", 4, bool);
        break;
        case "x":
          changeAudio("red", 5, bool);
        break;
      }
    });

  });

  //var keyPresses = [];

  function changeAudioPlayerSrc(src, id){
    var audioElement = document.getElementById(id);
    audioElement.src=src;
    audioElement.load(); //call this to just preload the audio without playing
    audioElement.play(); //call this to play the song right away
    return audioElement;
  }

  function createAudioPlayer(src, id){
    var audioElement;
    audioElement = new Audio("");

    (function(audioElement){

      document.body.appendChild(audioElement);
      audioElement.autobuffer = true;
      audioElement.id = id;
      audioElement.setAttribute("preload", "auto");
      if (audioElement.canPlayType('audio/mpeg;')) {
        var source= document.createElement('source');
        source.type = 'audio/mpeg';
        source.src = src + '.mp3';
        audioElement.appendChild(source);
      }
      if (audioElement.canPlayType('audio/mpeg;')) {
        var source= document.createElement('source');
        source.type = 'audio/ogg';
        source.src = src + '.ogg';
        audioElement.appendChild(source);
      }
      audioElement.src = src + ".ogg";
      audioElement.load();


      audioElement.addEventListener('canplaythrough', function() {
        audioElement.play();
      }, false);
      audioElement.onerror = function(event) {
        console.log("Failed to load audio: " + event.code);
      }

      if (typeof audioElement.loop == 'boolean')
        {
          audioElement.loop = true;
        }
        else
          {
            audioElement.addEventListener('ended', function() {
              this.currentTime = 0.1;
              this.play();
            }, false);
          }
          if (typeof audioElement.autoplay == 'boolean')
            {
              audioElement.autoplay = true;
            }
    }(audioElement));
    return audioElement;
  }

  function changeAudio(color, num, play){
    if(play === true){//} && keyPresses["color"+num] == false){
      //keyPresses["color"+num] == true;
      $('#' + color + "-button-" + num).children(":first").stop().animate({ backgroundColor: color }, "slow");
      if($('#' + color + "-audio-" + num).length == 0){
        createAudioPlayer("assets/audio/" + color + num + "",  color + "-audio-" + num);
      }
    }else{
      $('#' + color + "-button-" + num).children(":first").stop().animate({ backgroundColor: "darkgrey" }, "slow");
      if($('#' + color + "-audio-" + num).length > 0){
        $('#' + color + "-audio-" + num)[0].volume = 0.0;
        $('#' + color + "-audio-" + num)[0].pause();
        $('#' + color + "-audio-" + num).remove();
      }
      //keyPresses["color"+num] == false;
    }
  }
})();


    // Courtesy www.0AV.com, LGPL license or as set by forked host, Travis Holliday, https://codepen.io/travisholliday/pen/gyaJk (modified by fixing for browser security change)
    let canvas = document.getElementById("canvas");
    canvas.width = 400;
    canvas.height = 300;
    canvasContext = canvas.getContext("2d");
    var spriteImage = new Image();
    spriteImage.src = "dino.png";
    sprite = 0;
    let Dino = new Dinosour(spriteImage, 10, canvas.height/2, canvasContext);
    window.onload = function () {
        let Dino = new Dinosour(spriteImage, 0, 0, canvasContext);
        Dino.draw();
    }

    function startr() {
        console.log("starting...");
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: true },
                function (stream) {
                    audioContext = new AudioContext();
                    analyser = audioContext.createAnalyser();
                    microphone = audioContext.createMediaStreamSource(stream);
                    javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

                    analyser.smoothingTimeConstant = 0.8;
                    analyser.fftSize = 1024;

                    microphone.connect(analyser);
                    analyser.connect(javascriptNode);
                    javascriptNode.connect(audioContext.destination);

                    
                    //Clear Canvas;
                    Dino.started = true;
                    
                    javascriptNode.onaudioprocess = function () {
                        var array = new Uint8Array(analyser.frequencyBinCount);
                        analyser.getByteFrequencyData(array);
                        var values = 0;

                        var length = array.length;
                        for (var i = 0; i < length; i++) {
                            values += (array[i]);
                        }
                        var average = values / length;
                        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
                        canvasContext.font = "20px Georgia";
                        canvasContext.fillText("Volume: " + String(Math.floor(average)), canvas.width - 150, 30);
                        Dino.draw();
                        
                        if(average > 25 ){
                            console.log("hareket");
                            Dino.jump();
                        }
                        else console.log("yerde");

                    } 
                },
                function (err) {
                    console.log("The following error occured: " + err.name)
                });
        } else {
            console.log("getUserMedia not supported");
        }
    }
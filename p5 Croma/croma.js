var filtrado = {

     doLoad: function() {
       this.video = document.getElementById("video");
       this.filtro = document.getElementById("filtro");
       this.filtrado = this.filtro.getContext("2d");
       this.resultado = document.getElementById("resultado");
       this.salida = this.resultado.getContext("2d");
       let self = this;
       this.video.addEventListener("play", function() {
           self.width = self.video.videoWidth / 2;
           self.height = self.video.videoHeight / 2;
           self.timerCallback();
         }, false);
     },

   timerCallback: function() {
     if (this.video.paused || this.video.ended) {
       return;
     }
     this.computeFrame();
     let self = this;
     setTimeout(function () {
         self.timerCallback();
       }, 0);
   },

   computeFrame: function() {
     this.filtrado.drawImage(this.video, 0, 0, this.width, this.height);
     let frame = this.filtrado.getImageData(0, 0, this.width, this.height);
 		             let l = frame.data.length / 4;

     for (let i = 0; i < l; i++) {
       let r = frame.data[i * 4 + 0];
       let g = frame.data[i * 4 + 1];
       let b = frame.data[i * 4 + 2];
       if (g >=150 && g <= 260 && r < 30 && b < 30)
         frame.data[i * 4 + 3] = 0;
     }
     this.salida.putImageData(frame, 0, 0);
     return;
   }
 };

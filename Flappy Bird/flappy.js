window.addEventListener("load", () => {
    var iniciado = false;
    var imgPajaro = document.getElementById("bird");
    var divMensaje = document.getElementById("mensaje");
    var divGameOver = document.getElementById("gameOver");
    var divScoreText = document.getElementById("score_text");
    var divScore_Puntos = document.getElementById("score_puntos");
    var gravedad = 0.02;
    var velocidadY = 0;
    var salto = false;
    var muerto = false;
    var espacioEntreTuberias = 200;
    var anchoTuberia = 100;
    var alturaTuberia = 300; // Ajustar la altura de las tuberías
    var tuberiasGeneradas = 0; // Contador de tuberías generadas

    function generarTuberias() {
        // Verificar si ya se están generando tuberías
        if (tuberiasGeneradas > 2  ) {
            return;
        }

        // Incrementar el contador de tuberías generadas
        tuberiasGeneradas++;

        var divTuberiaSuperior = document.createElement("div");
        var divTuberiaInferior = document.createElement("div");

        divTuberiaSuperior.className = "tuberia";
        divTuberiaInferior.className = "tuberia";

        divTuberiaSuperior.style.width = anchoTuberia + "px";
        divTuberiaInferior.style.width = anchoTuberia + "px";

        var alturaSuperior = Math.floor(Math.random() * (window.innerHeight - espacioEntreTuberias - alturaTuberia));
        var alturaInferior = window.innerHeight - alturaSuperior - espacioEntreTuberias;

        divTuberiaSuperior.style.height = alturaSuperior + "px";
        divTuberiaInferior.style.height = alturaInferior + "px";

        divTuberiaSuperior.style.position = "absolute";
        divTuberiaInferior.style.position = "absolute";

        divTuberiaSuperior.style.top = "0";
        divTuberiaInferior.style.top = alturaSuperior + espacioEntreTuberias + "px"; // Ajustar la posición de la tubería inferior

        divTuberiaSuperior.style.left = window.innerWidth + "px"; // Colocar las tuberías al final de la pantalla
        divTuberiaInferior.style.left = window.innerWidth + "px"; // Colocar las tuberías al final de la pantalla

        document.body.appendChild(divTuberiaSuperior);
        document.body.appendChild(divTuberiaInferior);
    }

    document.addEventListener("keydown", function (event) {
        detectarTecla(event);
    });

    function detectarTecla(event) {
        // Inicio juego
        if (!iniciado) {
            divMensaje.innerHTML = "Pulsa enter para comenzar";
            imgPajaro.style.top = "40vh";
            imgPajaro.style.left = "30vw";
        }
        var codigoTecla = event.keyCode || event.which;
        // Detecta la tecla para iniciar el juego
        if (codigoTecla == 13 && !iniciado) {
            iniciado = true;
            divMensaje.innerHTML = "";
            divScore_Puntos.innerHTML = "0";
            divScoreText.innerHTML = "Score: ";
            requestAnimationFrame(animarPajaro);
            setInterval(generarTuberias, 2000); // Llama a generarTuberias repetidamente
        } else if (codigoTecla == 13 && iniciado && muerto) {
            iniciado = false;
            muerto = false;
            divScore_Puntos.innerHTML = "0";
            velocidadY = 0;
            divGameOver.innerHTML = "";
            divMensaje.innerHTML = "Pulsa enter para comenzar";
            divGameOver.innerHTML = "";
        }
        //  Movimiento salto
        else if (iniciado && (codigoTecla == 32 || codigoTecla == 38) && !salto && !muerto) {
            salto = true;
            velocidadY = 0;
            imgPajaro.style.top = imgPajaro.offsetTop - 75 + "px";
            if (imgPajaro.offsetTop <= 0) {
                imgPajaro.style.top = 10 + "px";
            }
            setTimeout(function () {
                salto = false;
            }, 100);
        } else {
            return;
        }
    }

    function actualizarPajaro() {
        movimientoGravedad();
        movimientoTuberia();
        if (imgPajaro.offsetTop > window.innerHeight) {
            gameOver();
        }
    }

    function movimientoGravedad() {
        velocidadY += gravedad;
        imgPajaro.style.top = imgPajaro.offsetTop + velocidadY + "px";
    }

    function movimientoTuberia() {
        var tuberias = document.querySelectorAll('.tuberia');
        var velocidadMovimiento = 2;
        tuberias.forEach(function (tuberia) {
            var tuberiaPosicionX = parseInt(tuberia.style.left);

            tuberia.style.left = tuberiaPosicionX - velocidadMovimiento + 'px';

            // Volver a posicionar las tuberías al final de la pantalla
            if (tuberiaPosicionX <= -anchoTuberia) {
                tuberia.style.left = window.innerWidth + "px";
            }
        });
    }

    function gameOver() {
        divGameOver.innerHTML = "Game Over!";
        muerto = true;
    }

    function animarPajaro() {
        if (iniciado) {
            actualizarPajaro();
            requestAnimationFrame(animarPajaro);
        } else {
            return;
        }
    }
});

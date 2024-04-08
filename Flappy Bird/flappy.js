window.addEventListener("load", () => {
	var iniciado = false;
	var imgPajaro = document.getElementById("bird");
	var divMensaje = document.getElementById("mensaje");
	var divGameOver = document.getElementById("gameOver");
	var divScoreText = document.getElementById("score_text");
	var divScore_Puntos = document.getElementById("score_puntos");
	var gravedad = 0.08;
	var velocidadY = 0;
	var VelocidadX = 1.5;
	var salto = false;

	function generarTuberias() {
		var espacioEntreTuberias = 50;
		var anchoTuberia = 100;
		var AlturaTuberia = 200;

		var divTuberiaSuperior = document.createElement("div");
		var divTuberiaInferior = document.createElement("div");

		divTuberiaSuperior.className = "tuberia";
		divTuberiaInferior.className = "tuberia";

		divTuberiaInferior.style.zIndex = 1;
		divTuberiaSuperior.style.zIndex = 1;

		divTuberiaSuperior.style.width = anchoTuberia + "px";
		divTuberiaInferior.style.width = anchoTuberia + "px";

		divTuberiaSuperior.style.height =
			Math.floor(
				Math.random() *
					(window.innerHeight - espacioEntreTuberias - AlturaTuberia)
			) + "px";
		divTuberiaInferior.style.height =
			window.innerHeight -
			parseInt(divTuberiaSuperior.style.height) -
			espacioEntreTuberias +
			"px";

		divTuberiaSuperior.style.position = "absolute";
		divTuberiaInferior.style.position = "absolute";

		divTuberiaSuperior.style.top = "0";
		divTuberiaInferior.style.bottom = "0";

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
		if (codigoTecla == 13) {
			if (!iniciado) {
				iniciado = true;
				divMensaje.innerHTML = "";
				divScore_Puntos.innerHTML = "0";
				divScoreText.innerHTML = "Score: ";
				requestAnimationFrame(animarPajaro);
			} else {
				iniciado = false;
				divScore_Puntos.innerHTML = "0";
				velocidadY = 0;
				divGameOver.innerHTML = "";
				divMensaje.innerHTML = "Pulsa enter para comenzar";
				divGameOver.innerHTML = "";
			}
		}
		//  Movimiento salto
		else if (iniciado && (codigoTecla == 32 || codigoTecla == 38) && !salto) {
			salto = true;
			velocidadY = 0;
			imgPajaro.style.top = imgPajaro.offsetTop - 75 + "px";
			if (imgPajaro.offsetTop <= 0) {
				imgPajaro.style.top = 5 + "px";
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
		if (imgPajaro.offsetTop > window.innerHeight) {
			gameOver();
		}
	}
	function movimientoGravedad() {
		velocidadY += gravedad;
		imgPajaro.style.top = imgPajaro.offsetTop + velocidadY + "px";
	}

	function gameOver() {
		divGameOver.innerHTML = "Game Over!";
	}
	function animarPajaro() {
		if (iniciado) {
			actualizarPajaro();
			requestAnimationFrame(animarPajaro);
		} else {
			return;
		}
	}

	setInterval(generarTuberias, 2000);
});



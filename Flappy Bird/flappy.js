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

	document.addEventListener("keydown", function (event) {
		detectarTecla(event);
	});

	function detectarTecla(event) {
		if (!iniciado) {
			divMensaje.innerHTML = "Pulsa enter para comenzar";
			imgPajaro.style.top = "40vh";
			imgPajaro.style.left = "30vw";
		}
		var codigoTecla = event.keyCode || event.which;
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
		} else if (iniciado && (codigoTecla == 32 || codigoTecla == 38)) {
			velocidadY = 0;
			imgPajaro.style.top = imgPajaro.offsetTop - 75 + "px";
			if (imgPajaro.offsetTop <= 0) {
				imgPajaro.style.top = 5 + "px";
			}
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
});

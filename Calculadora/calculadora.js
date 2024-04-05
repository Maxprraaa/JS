var result = false;
window.addEventListener("load", () => {
	document.getElementById("calculadora").addEventListener("click", (event) => {
		// resutlado
		if (event.target.id == "igual") {
			try {
				operacion = eval(resultado.innerHTML);
				resultado.innerHTML = operacion;
			} catch (error) {
				resultado.innerHTML = "ERROR";
			}
			result = true;
		}
		// Borrar todo
		else if (event.target.id == "c") {
			resultado.innerHTML = 0;
			return;
		}
		// Borraro ultima entrada
		else if (event.target.id == "ce") {
			let contenido = resultado.innerHTML;
			let ultSimb = contenido[contenido.length - 1];
			if (/[\+\-\*\/]/.test(ultSimb)) {
				resultado.innerHTML = contenido.slice(0, -1);
			} else {
				let valores = contenido.split(/[+\-*/]/);
				let ultimoNumero = valores[valores.length - 1];
				resultado.innerHTML = contenido.slice(0, -ultimoNumero.length);
			}
		}
		// Borrar ultimo digito
		else if (event.target.id == "borrar") {
			let valorActual = resultado.innerHTML;
			resultado.innerHTML = valorActual.slice(0, -1);
		}
		// Raiz cuadrada
		else if (event.target.id == "raiz2") {
			let contenido = resultado.innerHTML;
			let ultSimb = contenido[contenido.length - 1];
			if (/[\+\-\*\/]/.test(ultSimb)) {
				return;
			} else {
				let valores = contenido.split(/[+\-*/]/);
				let ultimoNumero = valores[valores.length - 1];
				resultado.innerHTML = contenido.slice(0, -ultimoNumero.length);
				resultado.innerHTML += Math.sqrt(ultimoNumero);
			}
		}
		// Numero al cuadrado
		else if (event.target.id == "x2") {
			let contenido = resultado.innerHTML;
			let ultSimb = contenido[contenido.length - 1];
			if (/[\+\-\*\/]/.test(ultSimb)) {
				return;
			} else {
				let valores = contenido.split(/[+\-*/]/);
				let ultimoNumero = valores[valores.length - 1];
				resultado.innerHTML = contenido.slice(0, -ultimoNumero.length);
				resultado.innerHTML += Math.pow(ultimoNumero, 2);
			}
		}
        // 1 partido X
        else if(event.target.id == "1/x"){
            let contenido = resultado.innerHTML;
			let ultSimb = contenido[contenido.length - 1];
			if (/[\+\-\*\/]/.test(ultSimb)) {
				return;
			} else {
				let valores = contenido.split(/[+\-*/]/);
				let ultimoNumero = valores[valores.length - 1];
				resultado.innerHTML = contenido.slice(0, -ultimoNumero.length);
				resultado.innerHTML += 1 / (ultimoNumero);
			}
        }
        // Porcentaje 
        else if(event.target.id == "%"){
            let contenido = resultado.innerHTML;
			let ultSimb = contenido[contenido.length - 1];
			if (/[\+\-\*\/]/.test(ultSimb)) {
				return;
			} else {
				let valores = contenido.split(/[+\-*/]/);
				let ultimoNumero = valores[valores.length - 1];
				resultado.innerHTML = contenido.slice(0, -ultimoNumero.length);
				resultado.innerHTML += ultimoNumero  * 0.01;
			}
        }
		// Errores comprendidos
		else if (
			event.target.id == "resultado" ||
			event.target.id == "calculadora"
		) {
			return;
		}
		// Escribir valores
		else {
			if (resultado.innerHTML == "0" || result) {
				resultado.innerHTML = event.target.id;
				result = false;
			} else {
				resultado.innerHTML += event.target.id;
			}
		}
		// Nunca dejar en blanco
		if (resultado.innerHTML == "") {
			resultado.innerHTML = 0;
		}
	});
});

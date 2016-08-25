/* OPERACIONES DE LA CALCULADORA*/

function suma(x,y){
	var result = x + y;
	return result;
}

function resta(x,y){
	var result = x - y;
	return result;
}

function multiplicacion(x,y){
	var result = x * y;
	return result;
}

function division(x,y){
	var result;
	if(y != 0){
		result = x / y;
	}
	else{
		result = NaN;
	}
	return result;
}

function potencia(x,y){
	var result = Math.pow(x,y);
	return result;
}

function raiz(x){
	var result = Math.sqrt(x);
	return result;
}

function factorial(x){
	var result;
	if(x>=0){
		result = fac(x);
	}
	else{
		result = (-1)*fac((-1)*x);	
	}
	return result;
}

function fac(n){
	if (n == 0){ 
		return 1; 
	}
	return n * fac(n-1); 
}

function seno(x){
	var result = Math.sin(x);
	return result;
}

function coseno(x){
	var result = Math.cos(x);
	return result;
}

function tangente(x){
	var result = Math.tan(x);
	return result;
}

function pi(){
	return Math.PI;
}

function e(){
	return Math.E;
}
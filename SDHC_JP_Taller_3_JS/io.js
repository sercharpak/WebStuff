var Temp = "";		// Guarda el numero temporalmente
var pila = [];		// Almacena los numeros y operaciones
var id = [];		// Identifica cuando es numero '0' y cuando es operacion '1'


function display(value){
	document.getElementById("display").value = document.getElementById("display").value + value;
}

function clearAll(){
	document.getElementById("display").value = "";
	Temp = "";
	pila = [];
	id = [];
}

function Number(value){
	display(value);
	Temp += value;
	console.log(Temp);
}

function addNumber(){
	if(Temp!=""){
		pila.push(parseFloat(Temp));
		id.push(0);
		console.log(Temp.toString());
		Temp="";
	}
}

function Operator(value){
	addNumber();

	display(value);
	pila.push(value);
	id.push(1);
	console.log(value);
}

function Operator2(value){
	addNumber();

	display(value);
	pila.push(value);
	id.push(2);
	console.log(value);
}

function Operator3(value){
	addNumber();

	display(value);
	pila.push(value);
	id.push(3);
	console.log(value);
}

function Compute(){
	document.getElementById("pila").innerHTML = document.getElementById("display").value + ' =';
	addNumber();
	var result = Calculator(pila,id);

	clearAll();

	if(isNaN(result)){
		display(result);
	}else{
		display(result);
		pila.push(result);
		id.push(0);
	}
}
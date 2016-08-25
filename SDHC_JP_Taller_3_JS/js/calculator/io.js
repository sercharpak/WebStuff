var Temp = "";		// Guarda el numero temporalmente
var pila = [];		// Almacena los numeros y operaciones
var id = [];		// Identifica cuando es numero '0' y cuando es operacion '1'
var ERROR = "Error!";


function display(value){
	document.getElementById("display").value = document.getElementById("display").value + value;
}

function clearAll(){
	document.getElementById("display").value = "";
	Temp = "";
	pila = [];
	id = [];
}
function clearPila(){
	document.getElementById("pila").innerHTML = "";
}

function Number(value){
	if (document.getElementById("display").value===ERROR || document.getElementById("display").value==="NaN") {clearAll()}
	display(value);
	Temp += value;
}

function Number2(value){
	if (document.getElementById("display").value===ERROR || document.getElementById("display").value==="NaN") {clearAll()}
	display(value);
	if(value==="e"){
		pila.push(e());
		id.push(0);
	}else{
		pila.push(pi());
		id.push(0);
	}	
}

function addNumber(){
	if(Temp!=""){
		pila.push(parseFloat(Temp));
		id.push(0);
		Temp="";
	}
}

function Operator(value){
	if (document.getElementById("display").value===ERROR || document.getElementById("display").value==="NaN") {clearAll()}
	addNumber();
	if(value==="^2"){
		display("^");
		pila.push("^");
		id.push(1);
		display(2);
		pila.push(2);
		id.push(0);
	}else{
		display(value);
		pila.push(value);
		id.push(1);
	}
}

function Operator2(value){
	if (document.getElementById("display").value===ERROR || document.getElementById("display").value==="NaN") {clearAll()}
	addNumber();
	display(value);
	pila.push(value);
	id.push(2);
}

function Operator3(value){
	if (document.getElementById("display").value===ERROR || document.getElementById("display").value==="NaN") {clearAll()}
	addNumber();
	display(value);
	pila.push(value);
	id.push(3);
}

function Compute(){
	document.getElementById("pila").innerHTML = document.getElementById("display").value + ' =';
	document.getElementById("list").innerHTML = document.getElementById("list").innerHTML + document.getElementById("display").value + '<br>';
	addNumber();

	if(Verify(pila,id)){
		var result = Calculator(pila,id);

		clearAll();

		if(isNaN(result)){
			display(result);
		}else{
			display(result);
			Temp = result.toString();
		}
	}else{
		clearAll();
		display("Error!");
	}
}

var operaciones = [];
var numeritos = [];
var numTemp = "";

function display(value){
	document.getElementById("display").value = document.getElementById("display").value + value;
}

function clearAll(){
	document.getElementById("display").value = "";
	operaciones = [];
	numeritos = [];
	numTemp = "";
}

function addCipher(value){
	display(value);
	numTemp += value;
	console.log(numTemp);
}

function addOperator(value){
	display(value);
	numeritos.push(parseFloat(numTemp));
	console.log(numTemp.toString());
	numTemp="";
	operaciones.push(value);
	console.log(value);
}

function compute(){
	numeritos.push(parseFloat(numTemp));
	result = numeritos.pop();
	while(numeritos.length>0){
		operador = operaciones.pop();
		var2 = numeritos.pop();
		result = operation(operador,result,var2);
	}
	clearAll();
	display(result);
}


function operation(operation, var1, var2){
	if(operation==="+"){
		return var2+var1;
	}
	else if(operation==="-"){
		return var2-var1;
	}
	else if (operation==="*") {
		return var2*var1;
	}
	else  {
		return var2/var1;
	}
}

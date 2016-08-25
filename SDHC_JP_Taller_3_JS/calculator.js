var ERROR = "Error!";

function Verify(pila,id){
	bool = false;


	return bool;
}


function Calculator(pila,id){ 
	/* Analizador de la pila capturada
	   verifica el lenguaje y calcula la operación	
	*/	
	var result;
	var longitud = id.length;

	switch(longitud){
		case 0:
			result = 0;
		break;
		case 1:
			if(id[0] == 0){
				result = pila[0];
			}else{
				result = ERROR;
			}	
		break;
		default:
			/*OP2*/
			var con = 0;
			var PILAop2 = [];
			var IDop2 = [];
			var pi;
			var pf;
			var O;

			for(i = 0; i <id.length ; i++){
				if(id[i] == 2){
					if(pila[i]===")"){
						
						con--;

						if(con==0){
							pf=i;
							/* Creando los vectores para recurisividad */
							for(j = pi+1; j<pf;j++){
								PILAop2.push(pila[j]);
								IDop2.push(id[j]);
							}

							/* Funcion recursiva*/
							op2 = OP2(O,Calculator(PILAop2,IDop2));
							PILAop2 = [];
							IDop2 = [];
							/* Retorno de datos*/

							pila[pi] = op2;
							id[pi] = 0;
							pila.splice(pi+1,pf-pi);
							id.splice(pi+1,pf-pi);
							i=pi;

						}
					}else{
						if(con==0){
							pi=i;
							O = pila[i];
						}
						con++;
					}
				}

			}

			/*OP3*/
			for(i = 0; i <id.length ; i++){
				if(id[i] == 3){
					op3 = OP3(pila[i-1]);
					/* Retorno de datos*/
					pila[i-1] = op3;
					id[i-1] = 0;
					pila.splice(i,1);
					id.splice(i,1);
					i=i-1;
				}
			}

			/*OP1*/
			for(i = 0; i <id.length ; i++){
				if(id[i] == 1 && pila[i]==="^"){
					op1 = OP1(pila[i],pila[i-1],pila[i+1]);
					/* Retorno de datos*/
					pila[i-1] = op1;
					id[i-1] = 0;
					pila.splice(i,2);
					id.splice(i,2);
					i=i-1;
				}
			}

			for(i = 0; i <id.length ; i++){
				if(id[i] == 1 && (pila[i]==="*" || pila[i]==="/")){
					op1 = OP1(pila[i],pila[i-1],pila[i+1]);
					/* Retorno de datos*/
					pila[i-1] = op1;
					id[i-1] = 0;
					pila.splice(i,2);
					id.splice(i,2);
					i=i-1;
				}
			}

			for(i = 0; i <id.length ; i++){
				if(id[i] == 1 && (pila[i]==="+" || pila[i]==="-")){
					op1 = OP1(pila[i],pila[i-1],pila[i+1]);
					/* Retorno de datos*/
					pila[i-1] = op1;
					id[i-1] = 0;
					pila.splice(i,2);
					id.splice(i,2);
					i=i-1;
				}
			}
			result = pila[0];
		break;
	}

	return result;
}


function OP2(O,value){
	switch(O){
		case "(":
			return value;
		break;
		case "sqrt(":
			return raiz(value);
		break;
		case "sin(":
			return seno(value);
		break;
		case "cos(":
			return coseno(value);
		break;
		case "tan(":
			return tangente(value);
		break;
	}
}

function OP3(value){
	return factorial(value);
}

function OP1(O,value1,value2){
	switch(O){
		case "+":
			return suma(value1,value2);
		break;
		case "-":
			return resta(value1,value2);
		break;
		case "*":
			return multiplicacion(value1,value2);
		break;
		case "/":
			return division(value1,value2);
		break;
		case "^":
			return potencia(value1,value2);
		break;
	}
}
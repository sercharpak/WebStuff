var ERROR = "Error!";

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
			if(con!=0){
				result = ERROR;
				return result;
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

function Verify(pila,id){
	bool = false;
	l = id.length;
	if( (l>1 && ( (id[0]==0 || id[0]==2) && (id[l-1] != 1) ) ) ){
		var prev = id[0];
		var text = pila[0];
		for(i = 1; i<l ; i++){

			switch(prev){
				case 0:					
					if(id[i] == 0){
						return bool;
					}
					if(id[i] == 2){
						if(!(VOP2(text,prev,pila[i],id[i]))){
							return bool;
						}
					}
				break;
				case 1:
					if(id[i] == 1 || id[i] == 3){
						return bool;
					}

					if(id[i] == 2){
						if(!(VOP2(text,prev,pila[i],id[i]))){
							return bool;
						}
					}
				break;
				case 2:					
					if(!(VOP2(text,prev,pila[i],id[i]))){
						return bool;
					}
				break;
				case 3:
					if(id[i] == 0 && id[i] == 3){
						return bool;
					}
					if(id[i] == 2){
						if(!(VOP2(text,prev,pila[i],id[i]))){
							return bool;
						}
					}					
				break;
			}			
			prev = id[i];
			text = pila[i];

		}

		bool = true;
	}else{
		if(id[l-1]!=1){
			if(id[0]==0){
				bool = true;
			}
		}
	}
	return bool;
}

function VOP2(t1,id1,t2,id2){
	bool = false;
	switch(id1){
		case 0:
			if(t2===")"){
				bool=true;
			}
		break;
		case 1:
			if(!(t2===")")){
				bool=true;
			}
		break;
		case 2:
			if(!(t1===")") && id2==0){
				bool=true;
			}
			if(t1===")" && id2==1){
				bool=true;
			}
			if(((!(t1===")")) && (!(t2===")"))) ||(t1===")" && t2===")")){
				bool = true;
			}
			if(t1===")" && id2==3){
				bool =true;
			}
		break;
		case 3:
			if(t2===")"){
				bool=true;
			}
		break;
	}
	return bool;
}
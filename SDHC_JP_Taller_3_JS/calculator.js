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
				result = parseFloat(pila[0]);
			}else{
				result = ERROR;
			}	
		break;
		default:
			if(id[i]==1){
				OpNext(pila[0],0);
			}
			for(i=0;i<longitud;i++){
				console.log(id[i]);
				
			}
		break;
	}

	return result;
}

function OP1(){
	
}

function OP2(){
	
}

function OP3(){

}
const checkEmail = (x) => {
	const reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
	if (reg.test(x) == true){
		return true;
	}else {
        console.log("errore email: ", x);
		return false;
	}
}

const checkMessage = (x) => {
    const reg = /^[^<>&£"}{]{1,500}$/i ;
	if (reg.test(x) == true){
		return true;
	}else {
        console.log("Errore Messaggio: ", x);
		return false;
	}
}

const checkPhone = (x) => {
    const reg = /^[0-9 +]{8,20}$/
	if(reg.test(x) == true){
		return true;
	}else{
        console.log("errore telefono: ", x);
		return false;
	}
}

export { checkEmail, checkPhone, checkMessage }
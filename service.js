function dummyService(password){
	var pdfLinks = getPdfslist();
	var data = {password : password, pdfLinks :pdfLinks };
	let params = JSON.stringify(data) 
	var url = '';
    return new Promise(function(resolve, reject) {
        $.ajax(url, {
            contentType: 'application/json', 
            dataType: 'json', 
            method: 'POST',
            crossDomain:true,
            data: params
        }).done(resolve).fail(reject);
    });
}


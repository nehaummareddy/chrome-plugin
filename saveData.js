var pdfsList = [];
function updatePdfsList(initialUpdate,latestPdfs){
	if(initialUpdate && pdfsList.length === 0) pdfsList = latestPdfs;
	else if(!initialUpdate) pdfsList = latestPdfs;
}

function getPdfslist (){
	return pdfsList;
}
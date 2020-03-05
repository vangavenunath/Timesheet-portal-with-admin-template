import React, {useState, useEffect} from 'react'
import PDFObject from 'pdfobject'
export const Document = () => {
	const [reloadData, setReloadData] = useState(true)

	useEffect(() => {
		var options = {
			height: "500px",
			pdfOpenParams: { view: 'FitV', page: '2' }
		};
		PDFObject.embed("http://localhost/api/data/document.pdf", "#iframeContainer", options); 
	},[reloadData])
    return (<div id="iframeContainer">
		{PDFObject.supportsPDFs ? console.log("Yay, this browser supports inline PDFs.") : 
		console.log("Boo, inline PDFs are not supported by this browser")
			}
    </div>)
}
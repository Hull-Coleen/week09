const express = require('express')
const path = require('path')
var url = require('url')
const PORT = process.env.PORT || 5000

const app = express();
  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
  app.get('/getRate', function(request, response) {
	 calcPostalRate(request, response); 
  });
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

function calcPostalRate(request, response) {
	var requestUrl = url.parse(request.url, true);

	console.log("Query parameters: " + JSON.stringify(requestUrl.query));
	// TODO: Here we should check to make sure we have all the correct parameters

	var mailType = Number.parseInt(requestUrl.query.mailOption);
	var weight = Number(requestUrl.query.weight);
     
	computeRate(response, weight, mailType);
}
function computeRate(response, weight, type) {
	console.log(type);
	
	var result = 0;
    switch(type) {
		case 1:
		   if(weight <= 1)
			   result = .50;
		   else if (weight > 1 && weight <= 2)
			   result = .71;
		   else if (weight > 2 && weight <= 3.5)
			   result = .92;
		   else
			   result = "Stamped letters can only weight 3.5 ounces or less";
		break;
		case 2:
		break;
		case 3:
		break;
		case 4:
		break;
		default:
		  result = "there is a problem with the weights";
		break;
		
	}
	var t = "hello";
	var test = {weight: weight, mail: type, result: result};
	console.log(JSON.stringify(test));
     console.log("test json" + test.mail); 
	/*var mail;
	if (type == 1)
		mail = "stamped";
	else if(type == 2)
		mail = "metered";
	else if(type == 3)
		mail = "Flat Large Envelope";
	else if (type == 4)
		mail = "first class shippting";
	*/

	// Set up a JSON object of the values we want to pass along to the EJS result page
	var params = {weight: weight, mail: type, result: result};
     console.log("params" + params.weight + "M" +  params.mail + "R" + params.result);
	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/result', params);

}

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
		   else if (weight > 2 && weight <= 3)
			   result = .92;
		   else if(weight > 3 && weight <= 3.5)
			   result = 1.13;
		   else
			   result = "Stamped letters can only weight 3.5 ounces or less";
		break;
		case 2:
		    if(weight <= 1)
			   result = .47;
		   else if (weight > 1 && weight <= 2)
			   result = .68;
		   else if (weight > 2 && weight <= 3)
			   result = .89;
		   else if(weight > 3 && weight <= 3.5)
			   result = 1.10;
		   else
			   result = "Metered letters can only weight 3.5 ounces or less";
		break;
		case 3:
		    if(weight <= 1)
			   result = 1.00;
		   else if (weight > 1 && weight <= 2)
			   result = 1.21;
		   else if (weight > 2 && weight <= 3)
			   result = 1.42;
		   else if(weight > 3 && weight <= 4)
			   result = 1.63;
		   else if (weight > 4 && weight <= 5)
			   result = 1.84;
		   else if(weight > 5 && weight < 6)
			   result = 2.05;
		    else if (weight > 6 && weight < 7)
			   result = 2.26;
		   else if (weight > 7 && weight <8)
			   result = 2.47;
		   else if(weight > 8 && weight < 9)
			   result = 2.68;
		    else if (weight > 9 && weight <10)
			   result = 2.89;
		   else if (weight > 10 && weight < 11)
			   result = 3.10;
		   else if(weight > 11 && weight < 12)
			   result = 3.31;
		    else if(weight > 12 && weight <= 13)
			   result = 3.52;
		    else
			   result = "Large Envelopes letters can only weight 13 ounces or less";
		break;
		case 4:
		     if(weight <= 4)
			   result = 3.50;
		   else if (weight > 4 && weight <= 8)
			   result = 3.75;
		   else if (weight > 8 && weight <= 9)
			   result = 4.10;
		    else if (weight > 9 && weight <10)
			   result = 4.45;
		   else if (weight > 10 && weight < 11)
			   result = 4.80;
		   else if(weight > 11 && weight < 12)
			   result = 5.15;
		    else if(weight > 12 && weight <= 13)
			   result = 5.50;
		    else
			   result = "First class packages can only weight 13 ounces or less";
		break;
		default:
		  result = "there is a problem with the weights";
		break;
		
	}
	var test = {weight: weight, mail: type, result: result};
	console.log(JSON.stringify(test));
     console.log("test json" + test.mail); 
	var mail;
	if (type == 1)
		mail = "stamped";
	else if(type == 2)
		mail = "metered";
	else if(type == 3)
		mail = "Flat Large Envelope";
	else if (type == 4)
		mail = "first class shipping";
	

	// Set up a JSON object of the values we want to pass along to the EJS result page
	var params = {weight: weight, mail: mail, result: result};
     console.log("params" + params.weight + "M" +  params.mail + "R" + params.result);
	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/result', params);

}

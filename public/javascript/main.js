function fetchAnswer () {
  console.log('inside fetchAnswer');
  var operand1 = document.querySelector('#weight').value;
  var operand2 = document.querySelector('#mailOption').value;
  

  fetch(`Rate?weight=${weight}&mailOption=${mailOption}`)
    .then( (res) => {
      return res.json()
    })
    .then( json => {
      console.log(json);
      let output = document.querySelector('#output');
      output.innerText = json.answer;
    })
}
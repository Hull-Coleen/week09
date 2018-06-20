function fetchAnswer () {
  console.log('inside fetchAnswer');
  var weight = document.querySelector('#weight').value;
  var mailOption = document.querySelector('#mailOption').value;
  

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

module.exports.getDate = getDate;


function getDate(){

 let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const day = today.toLocaleDateString("en-US", options);
//   console.log(day);

  return day;

}

module.exports.getDay = getDay;

function getDay(){

 let today = new Date();

  let options = {
    weekday: "long",
    
  };

  const day = today.toLocaleDateString("en-US", options);
  console.log(day);

  return day;

}
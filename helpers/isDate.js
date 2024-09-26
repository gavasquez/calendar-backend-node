const moment = require( 'moment' );

const isDay = (value, { req, location, path }) => {
  if(!value){
    return false;
  }

  const fecha = moment(value);
  if(fecha.isValid() ){
    return true;
  }else {
     return false;
  }

}

module.exports = { isDay };
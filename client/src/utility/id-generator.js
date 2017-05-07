const SINCE = Date.UTC(2017);
let idCounter = 0;

const idGenerator = (prefix)=>{
  idCounter++;
  return prefix + (Date.now() - SINCE).toString(36) + "." + idCounter.toString(36);
}


export default idGenerator

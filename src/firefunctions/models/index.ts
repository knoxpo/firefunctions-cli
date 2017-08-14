/* 
* FILE NAME: index.ts
* FILE PATH: './models/'
* AUTHOR: NAYAN HATHIWALA
* CREATED ON: 10/8/2017
* DESCRIPTION: BASE Model.
*/


/*
 * Example For 'Type'
 */ 
type TypeModelLocation = {
  lat: number;
  log: number;
};

/* 
 * Use in code
 * 
  var location: TypeModelLocation = {
    lat: -1.00000000,
    log: -1.00000000
  };
*/

/*
 * Example For 'Interface'
 */ 
interface InterfaceModelLocation {
  lat: number;
  log: number;
}

/* 
 * Use in code
 * 
  var location: InterfaceModelLocation = {
    lat: -1.00000000,
    log: -1.00000000
  };
*/
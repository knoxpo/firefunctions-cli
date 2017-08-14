/* 
* FILE NAME: index.ts
* FILE PATH: './triggers/'
* AUTHOR: NAYAN HATHIWALA
* CREATED ON: 10/8/2017
* DESCRIPTION: BASE TRIGGER.
*/

/* 
* IMPORT LIBRARY HERE
*/
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

/*
 * Below you can write your triggers 
 */

 // Source: https://firebase.google.com/docs/functions/database-events
export const makeUppercase = functions.database.ref('/messages/{pushId}/original').onWrite(event => {
  // Grab the current value of what was written to the Realtime Database.
  const original = event.data.val();
  console.log('Uppercasing', event.params.pushId, original);
  const uppercase = original.toUpperCase();
  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  return event.data.ref.parent.child('uppercase').set(uppercase);
});
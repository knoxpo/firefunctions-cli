/* 
* FILE NAME: index.ts
* FILE PATH: './lib/'
* AUTHOR: NAYAN HATHIWALA
* CREATED ON: 10/8/2017
* DESCRIPTION: All necessary library initialization are to be done in this file.
*/

// IMPORT LIBRARY HERE


/* 
* Validate Firebase Token ID via `HEADER` or `COOKIE`
* Source: https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js
*/
export const validateFireTokenId = (req: any , res: any, next: any) => {
  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) && !req.cookies.__session) {
    res.status(403).json({
      error: 'Unauthorized Access Token',
      code: 403
    });
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    idToken = req.cookies.__session;
  }
  admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
    req.user = decodedIdToken;
    next();
  }).catch(error => {
    res.status(403).json({
      error: 'Unauthorized Access Token',
      code: 403
    });
  });
}

/* 
* MAKE YOUR LIBARAY INITIALIZED EXPORT HERE
*/
// export const fireFunctions = functions;
/* 
* FILE NAME: sub.ts
* FILE PATH: './api/sub-api/'
* AUTHOR: NAYAN HATHIWALA
* CREATED ON: 10/8/2017
* DESCRIPTION: ALL TYPE OF API WITHOUT AUTHENTICATED REQUEST
*/

/* 
* IMPORT LIBRARY HERE
*/
import * as functions from 'firebase-functions'
import { validateFireTokenId } from '../../lib'
import * as express from 'express'


/* 
* Initiating Express Router
*/
const api = express.Router();

/*
* All API Base Functions goes below.
* -----------------------------------
* You can add as many sub-routes as you want, by just 
* defining express and initiating with express router
*/
api.get('/', function (req, res) {
      res.send('Hello from APIv1 root route.');
});

api.get('/path/:name', function (req, res) {
      res.json({
            req: req.params.name
      });
});

api.get('/get', function (req, res) {
      res.json({
            req: req.param['name']
      });
});

api.post('/post', function (req, res) {
      res.json({
            req: req.body.name
      });
});

export const SubApi = api;
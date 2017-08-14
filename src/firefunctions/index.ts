/* 
* FILE NAME: index.ts
* FILE PATH: './'
* AUTHOR: NAYAN HATHIWALA
* CREATED ON: 10/8/2017
* DESCRIPTION: MAIN INDEX.
*/
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as fs from 'fs'
import * as http from 'http'
import * as https from 'https'
import { ApiBase } from './api'
import { makeUppercase } from './triggers'

// FIREBASE FUNCTION INITIALIZATION
admin.initializeApp(functions.config().firebase)

/*
* CREATING EXPRESS APP
*/
const app = express()
app.use(cors({ origin: true }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Importing  Base Api to Express app's root
app.use("/", ApiBase)

/*
* EXPORTING EXPRESS APP
*/
export const api = functions.https.onRequest((req, res) => {
      if (!req.path) req.url = `/${req.url}`
      return app(req, res)
})

/*
* EXPORTING EVENT TRIGGERS HERE
*/
export { makeUppercase }
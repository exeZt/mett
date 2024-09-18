// @ts-ignore
import express from "express";
import * as http from "http";
import * as https from "https";
import * as socket_io from "socket.io";

export function buildServerArch(ssl: boolean, httpsSslOpts?: object){
  if (ssl === true){
    if (!httpsSslOpts || typeof httpsSslOpts === "undefined"){
      throw new Error('SSL marked as Required but no SSL options given')
    }else {
      const appRouter = createExpressApp()
      return createHttpsServer(httpsSslOpts, appRouter);
    }
  }else {
    const appRouter = createExpressApp()
    return createHttpServer(appRouter);
  }
}

function createHttpsServer(httpsOptions: object, app: any){
  return https.createServer(httpsOptions, app)
}

function createHttpServer(app: any){
  return http.createServer( app)
}

export function createSocketServer(expressServer: any){
  return new socket_io.Server(expressServer, {
    cors: {
      origin: "*"
    }
  });
}

function createExpressApp(){
  const app = express()
  app.set('etag', false)
  app.set('x-powered-by', false)
  app.use((req: any,res: any,next: any): void => {
    res.set('Cache-Control', 'no-store');
    next();
  });
  app.get('*', (req: express.Request,res: express.Response): void => {
    res.status(200).send('App is running');
  });
  return app;
}
import * as sql from "mysql2";
import {Connection, Pool, PoolOptions, RowDataPacket} from "mysql2";
import {query} from "express";
import * as queryString from "querystring";

export function MysqlConnect(): Connection {
  return sql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'mett'
  });
}

export function MysqlPoolConnection() : Pool {
  const pool: PoolOptions = {
    user: 'root',
    password: 'root',
    database: 'mett'
  }
  return sql.createPool(pool);
}

export function MysqlExecute(connection: Connection, queryString: string, callback : (data: any) => void) : void {
  connection.execute<RowDataPacket[]>(queryString, (err, data: any):void => {
    if (!err)
      callback(data)
    else
      console.log(err)
  })
}

export function MysqlQuery(connection: Connection, queryString: string, callback: (data: any) => void) : void{
  connection.query<RowDataPacket[]>(queryString, (err, data: any) => {
    if (!err)
      try {
        callback(data)
      }catch(error){

      }
    else
      console.log(err)
  })
}
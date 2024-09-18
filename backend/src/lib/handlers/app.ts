import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  UserProfile
} from "../types/types";
import {MysqlConnect, MysqlQuery} from "../db_handlers/mysql";
import {Connection} from "mysql2";
import {Server, Socket} from "socket.io";
import {Utils} from "../utils/utils";
import {config} from "../config/config";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

export const appComponent = (socket: any, io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>):void => {
  socket.on('app_getprofiles', (UserDataRow: any, callback: (profiles: object) => void):void => {
    let connection : Connection = MysqlConnect();
    MysqlQuery(connection, `SELECT * FROM \`users\` WHERE \`user_id\`!='${UserDataRow.user_id}'
                        ORDER BY RAND() LIMIT 10`, (data):void => { // change * to user_id
      callback(data);
    });
  });

  socket.on('app_getlikes', (UserDataRow: any, callback: (likes: object) => void) : void => {
    let conn : Connection = MysqlConnect();
    MysqlQuery(conn, `SELECT * FROM \`likes\` WHERE \`liked_to\`='${UserDataRow.user_id}'`, (likesData):void => {
      callback(likesData);
    })
  });
}
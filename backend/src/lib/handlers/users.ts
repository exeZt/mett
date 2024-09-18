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

export const usersComponent = (socket: any, io: Server<ClientToServerEvents, ServerToClientEvents>): void => {
  socket.on('user_initialize', (UserDataRow: any, callback: (data: object) => void): void => {
    let connection : Connection = MysqlConnect();
    MysqlQuery(connection, `SELECT * FROM \`users\` WHERE \`user_id\` = '${UserDataRow.user_id}'`, (data) => {
      if (data.length === 0) {
        MysqlQuery(connection,
          `INSERT INTO \`users\`(\`user_id\`, \`user_name\`, \`user_telegram\`) VALUES (
                              '${UserDataRow.user_id}',
                              '${UserDataRow.user_name}',
                              '${UserDataRow.user_telegram}')`, (cbData) => {
            callback(cbData);
          })
      }else {
        callback(data);
      }
    });
  });

  socket.on('user_editprofile', (UserDataRow: any, callback: (success: boolean) => void):void => {
    const userData: any = UserDataRow; // userName, userAge, userDesc,userCity,userId
    let connection: Connection = MysqlConnect();
    MysqlQuery(connection, `
      UPDATE \`users\` SET \`user_name\`='${userData.user_name}',
                           \`user_age\`='${userData.user_age}',
                           \`user_desc\`='${userData.user_desc}',
                           \`user_city\`='${userData.user_city}'   
      WHERE \`user_id\`='${userData.user_id}'
    `, (data) => {
      callback(true);
    });
  });

  socket.on('user_change_viewable', (UserDataRow: any, callback: (success: boolean) => void): void => {
    let connection: Connection = MysqlConnect();
    MysqlQuery(connection, `UPDATE \`users\` SET \`user_viewable\` = (
      CASE \`user_viewable\` WHEN 1 THEN 0 ELSE 1 END) WHERE \`user_id\`='${UserDataRow.user_id}'`, (data) => {
      callback(true);
    });
  });

  socket.on('user_liked', (DataRow: any, callback: (bool: boolean) => void): void => {
    let likeId: string = new Utils.CUtils().genId();
    let connection: Connection = MysqlConnect();
    MysqlQuery(connection, `INSERT INTO \`likes\` VALUES ('${likeId}', '${DataRow.liked_to}', '${DataRow.user_id}', '${DataRow.message_text??''}')`, ():void => {
      callback(true);
    });
  });
}
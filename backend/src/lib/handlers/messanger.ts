import {Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {Chat, Message} from "../types/chat";
import {MysqlConnect, MysqlQuery} from "../db_handlers/mysql";
import {Connection} from "mysql2";

const messengerComponent = (socket: any, io: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>):void => {
  socket.on('chat_create', (chatObject: Chat, callback: (isSuccessfully: boolean) => void): void => {
    const conn : Connection = MysqlConnect();
    MysqlQuery(conn, `INSERT INTO \`chats\`(
                      \`chat_id\`,
                      \`chat_creator\`,
                      \`chat_follower\`)
                      VALUES ('${chatObject.chat_id}',
                              '${chatObject.chat_creator}',
                              '${chatObject.chat_follower}')`, (nothing): void => {
      callback(true)
    });
  });

  socket.on('chat_created_message', (messageObject: Message, callback: (isSuccessfully: boolean) => void): void => {
    const conn : Connection = MysqlConnect();
    MysqlQuery(conn, `INSERT INTO \`messages\`(
                         \`chat_id\`,
                         \`message_id\`,
                         \`message_text\`,
                         \`message_to\`,
                         \`message_from\`) 
        VALUES ('${messageObject.chat_id}',
                '${messageObject.message_id}',
                '${messageObject.message_text}',
                '${messageObject.message_to}',
                '${messageObject.message_from}')`, (): void => {
      callback(true)
    })
  });

  socket.on('chat_delete', (chatObject: Chat, callback: (isSuccessfully: boolean) => void): void => {
    const conn: Connection = MysqlConnect();
    MysqlQuery(conn, `DELETE FROM \`chats\` WHERE \`chat_id\`='${chatObject.chat_id}' 
                        AND (\`chat_creator\`='${chatObject.chat_creator}' OR \`chat_follower\`='${chatObject.chat_follower}');`, (): void => {
      callback(true)
    })
  });
}
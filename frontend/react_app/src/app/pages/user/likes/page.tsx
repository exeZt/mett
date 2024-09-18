'use client';

import {useEffect, useRef, useState} from "react";
import {useLocalStorage} from "@/app/utils/hooks";
import {io} from "socket.io-client";
import {MockScope} from "undici-types/mock-interceptor";

export default function LikesPage() {
  const socketRef = useRef(io('ws://localhost:3001', {
    timeout: 1000
  }));
  const [userLikes, setUsersLikes] = useState<object[]>([{ item: 'item' }]);

  useEffect(() => {
    socketRef.current.emit('user_getlikes', useLocalStorage('get').user_id,(callback):void => {
      setUsersLikes(callback)
    })
  }, []);

  const eventHandler = (event) : void => {
    if (event.target.classList.contains('like_item__active'))
      event.target.classList.remove('like_item__active')
    else event.target.classList.add('like_item__active')
  }

  const LikesObject = () => userLikes.map((v: object,i: number) => (
    <div className='like_item' key={i}
         style={{ marginTop: i === 0 ? 0 : 20 }} onClick={eventHandler}>
      <div className='like_item_padding'>
        <div className='like_item_avatar'>

        </div>
        <div className='like_item_content'>
          <span className='like_item_content_name'>Name, age</span>
          <span className='like_item_content_message'>Some interesting message</span>
        </div>
        <div className='like_item_pic'>

        </div>
      </div>
    </div>
  ))

  return (
    <>
      <div className='likes_holder'>
        <div className='likes-padding'>
          <LikesObject/>
        </div>
      </div>
    </>
  );
}
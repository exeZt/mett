'use client';
import React, {useEffect, useRef} from "react";
import appLogoBlack from './media/app_logos/app_logo_1_black.svg';
import {useLocalStorage} from "@/app/utils/hooks";
import {io, Socket} from "socket.io-client";
import {ClientToServerEvents, localUserData, ServerToClientEvents} from "@/app/utils/types";
import {DefaultEventsMap} from "@socket.io/component-emitter";
import {useAppContext} from "@/app/components/app_context";
import Image from 'next/image';
import {redirect} from "next/navigation";

const sio: Socket<DefaultEventsMap> = new io(`ws://localhost:3001`, {
  timeout: 1000,
})

export default function HomePage(){
  const socketRef: React.MutableRefObject<Socket<ServerToClientEvents, ClientToServerEvents>> = useRef(io(`ws://localhost:3001`, {
    timeout: 1000,
  }))
  const {setAppTitle} = useAppContext();

  useEffect((): void => {
    // load user data
    let data: localUserData = {
      user_id: 'someid', // telegram data
      user_name: 'somename',
      user_telegram: '@piurg'
    }
    sio.emit('user_initialize', data, async (response):Promise<void> => {
      useLocalStorage('set', response)
    });
    setAppTitle('Mett')
  },[])

  return (
    <>
      <div className='home'>
        <div className='home-wrapper'>
          <div className='home-logo-holder'>
            <Image
              priority
              src={appLogoBlack}
              alt=''
            />
          </div>
          <div className='home-input-wrapper'>
            <input type='button' value='Начать'
                   onClick={redirect('/pages/viewprofiles')}/>
            <span className='home-input-wrapper-span1'>
              нажимая кнопку Начать вы выражаете согласие с нашей политикой
              <span className='home-input-wrapper-span2'> конфиденциальности </span>
              и подтверждаете что вам есть 16 лет
            </span>
          </div>
          <div className='home-team-wrapper'>
            <span> by exezt- </span>
          </div>
        </div>
      </div>
    </>
  )
}
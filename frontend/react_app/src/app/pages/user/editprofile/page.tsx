'use client';
import React, {LegacyRef, MutableRefObject, useContext, useEffect, useRef} from "react";
import {AppContext} from "@/app/components/app_context";
import {Validation} from "@/app/utils/validate";
import Valid = Validation.Valid;
import {io} from "socket.io-client";
import {useLocalStorage} from "@/app/utils/hooks";

export default function EditProfile(){
  const socketRef = useRef(io('http://localhost:3001', {
    timeout: 1000
  }));

  const userName= React.useRef<HTMLInputElement | string>(''),
    userCity= React.useRef<HTMLInputElement | string>(''),
    userDescription= React.useRef<HTMLInputElement | string>(''),
    userAge= React.useRef<HTMLInputElement | number>(16);

  const { setAppTitle } = useContext(AppContext);

  function validate(){
    if (new Valid().isValidName(userName.current.value)
    && new Valid().isValidAge(userAge.current.value)
    && new Valid().isValidCity(userCity.current.value)
    && new Valid().isValidDesc(userDescription.current.value)){
      let userData = {
        user_id: useLocalStorage('get').user_id,
        user_name: userName.current.value,
        user_age: userAge.current.value,
        user_city: userCity.current.value,
        user_desc: userDescription.current.value
      }

      socketRef.current.emit('user_editprofile', userData, (success) => {
        if (success)
          alert('Successfully updated profile');
      })
    }
  }

  useEffect(() => {
    setAppTitle('Редактировать профиль');
  }, []);

  return(
    <>
      <div className='eprofile-wrapper'>
        <div className='eprofile-frame'>
          <div className='eprofile-user-image'>
            <div className='eprofile-user-image-image'>

            </div>
          </div>
          <div className='eprofile-user-name'>
            <input type='text' minLength={2} maxLength={16} ref={userName} placeholder="Имя" />
          </div>
          <div className='eprofile-user-age'>
            <input type='text' minLength={1} maxLength={2} ref={userAge} placeholder="Возраст" />
          </div>
          <div className='eprofile-user-description'>
            <textarea maxLength={200} minLength={0} >

            </textarea>
            <span>
              Расскажите немного о себе, ваших увлечениях и чем вы хотите заняться
            </span>
          </div>
          <div className='eprofile-user-location'>
            <input type='text' minLength={1} maxLength={2} ref={userCity} placeholder="Город" />
          </div>
        </div>
        <div className='eprofile-frame-apply-button-holder'>
          <input type='button' value='Принять' onClick={() => validate()}/>
        </div>
      </div>
    </>
  );
}
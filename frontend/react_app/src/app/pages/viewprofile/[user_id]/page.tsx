'use client';
import React, {useEffect} from "react";
import {io} from "socket.io-client";
import {SwiperSlide, Swiper} from "swiper/react";
import {EffectCards} from "swiper/modules";


export default function ViewProfilePage({ params }:{ params: { user_id: string | number } }) {
  const [userInfo, setUserInfo] = React.useState([])
  const [sliderImages, setSliderImages] = React.useState(['img', 'img2', 'img3', 'img4'])
  const socketRef = React.useRef(io('ws://localhost:3001', {
    timeout: 1000,
  }))

  useEffect(() => {
    // socketRef.current.emit('user_getinfo', params.user_id, (callback):void  => {
    //   setUserInfo(callback)
    // });
  }, []);

  return (
    <>
      <div className='view_profile_wrapper'>
        <div className='view_profile_padding'>
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className='view_profile_swiper'
          >
            {[...sliderImages].map((v, i) => (
              <SwiperSlide className='view_profile_image'>

              </SwiperSlide>
            ))}
          </Swiper>
          <div className='view_profile_flying_user_data'>
            <div className='view_profile_flying_user_data_wrapper'>
              <span className='view_profile_flying_ud_name'> Name, age </span>
              <span className='view_profile_flying_ud_city'> Moscow </span>
              <span className='view_profile_flying_ud_desc'>Description</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
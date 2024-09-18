'use client';
import TinderCard from 'react-tinder-card'
import React, {LegacyRef, MutableRefObject, Ref, useEffect, useMemo, useRef, useState} from "react";
import {getCookie, useLocalStorage} from "@/app/utils/hooks";
import {io}from "socket.io-client"
import {Socket} from "socket.io-client";
import {ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from "@/app/utils/types";
import NegativeDecision from "@/app/components/effect/negotive_decision";
import PositiveDecision from "@/app/components/effect/positive_decision";
import ReportDecision from "@/app/components/effect/report_decision";
import MessageDecision from "@/app/components/effect/message_decision";
import PopupWindow from "@/app/components/popup";
import {Validation} from "@/app/utils/validate";

export default function ViewProfiles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profilesArray, setProfilesArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentOpenedCard,setCurrentOpenedCard] = useState(null);
  const popupMessageRef= useRef(null);
  const socketRef= useRef(io(`ws://localhost:3001`, {
    timeout: 1000,
  }))
  const [lastDirection, setLastDirection] = useState()
  // used for outOffFrame closure
  const currentIndexRef: MutableRefObject<number> = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(profilesArray.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  useEffect(() => {
    socketRef.current.off('app_getprofiles').emit('app_getprofiles',
      {
        user_id: useLocalStorage('get').user_id
      }, (callback) => {
      setProfilesArray(callback)
      console.log(callback)
    })
  }, []);

  function showNegotiveWindow (): void {
    document.getElementById('negative_decision').classList.add('active');
  }

  function closePopupWindow() : void{
    document.getElementById('popup_like_with_message')?.classList.remove('active')
    document.getElementById('popup_bg_like_with_message')?.classList.remove('active')
  }

  function showPositiveWindow():void {
    document.getElementById('positive_decision').classList.add('active');
  }

  function showMessageWindow(): void {
    document.getElementById('message_decision').classList.add('active');
  }

  function showMessageWindowPopup(): void {
    document.getElementById('popup_like_with_message')?.classList.add('active')
    document.getElementById('popup_bg_like_with_message')?.classList.add('active')
  }

  function showReportEffect() :void {
    document.getElementById('report_decision').classList.add('active');
  }

  function closeDicisionWindow () : void {
    setTimeout(() => {
      document.getElementById('negative_decision').classList.remove('active');
      document.getElementById('positive_decision').classList.remove('active');
      document.getElementById('report_decision').classList.remove('active');
      document.getElementById('message_decision').classList.remove('active');
    }, 250)
  }

  function sendLikeWithMessage (messageRef) : void {
    socketRef.current.emit('user_liked', {
      user_id: useLocalStorage('get').user_id,
      liked_to:  currentOpenedCard.user_id,
      message_text: messageRef.current.value
    })
    setTimeout(() => closePopupWindow(), 200)
  }

  const updateArray = (): void => {
    socketRef.current.emit('app_getprofiles',
      {
        user_id: useLocalStorage('get').user_id
      }, (callback) => {
        setProfilesArray(callback)
      })
  }

  const updateCurrentIndex = (val): void  => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const animateCardDecision = (dir): void => {
    if (dir === 'left') {
      showNegotiveWindow();
    } else if(dir === 'right') {
      showPositiveWindow();
    } else if(dir === 'up') {
      showReportEffect();
    } else{
      showMessageWindow();
    }
  }

  const swipeCard = async (dir, index, isLast): Promise<void> => {
    await childRefs[index].current.swipe(dir)
  }

  const swipedEvent = (dir, index, isLast): void => {
    let item = profilesArray[index];
    if (dir === 'right'){
      socketRef.current.emit('user_liked', {
        user_id: useLocalStorage('get').user_id,
        liked_to: item.user_id,
      })
      closeDicisionWindow();
    } else if(dir === 'left') { // dislike
    } else if(dir === 'up') { //report
    } else { //message decision
      setCurrentOpenedCard(item)
      console.log(item)
      showMessageWindowPopup()
    }
    setProfilesArray(profilesArray.filter((v: any, i : number) => v !== item || i !== index));
    closeDicisionWindow();
    setLastDirection(dir);
    updateCurrentIndex(index);
    if (isLast === true) {
      updateArray();
    }
  }

  const Profiles = () => profilesArray.map((val, i : number) =>
    <TinderCard
      key={i}
      ref={childRefs[i]}
      onSwipeRequirementUnfulfilled={() => closeDicisionWindow()}
      onSwipeRequirementFulfilled={(dir) => animateCardDecision(dir)}
      className='swipe'
      onSwipe={(dir) => swipedEvent(dir, i, i === 0)}
      // onCardLeftScreen={() => outOfFrame(i)}
      //preventSwipe={['direction']}
      swipeThreshold={200}
      flickOnSwipe={true}
      swipeRequirementType={'position'}
    >
      <div className='item-card'>
        <div className='item-card-holder'>
          <div className='item-card-upperpanel'></div>
          <div className='item-card-lowerPanel'>
            <div className='item-card-text'>
              <span className='item-card-userName'>{val.user_name}</span>
              <span className='item-card-city'>{val.user_id}</span>
              <span className='item-card-description'>{}</span>
            </div>
            <div className='item-card-buttons'>
              {/*<input type='button' className='pressable' itemID='1'*/}
              {/*       onClick={() => swipeCard('left', i, true)}/>*/}
              {/*<input type='button' itemID='2' />*/}
              {/*<input type='button' className='pressable' itemID='3'*/}
              {/*       onClick={() => swipeCard('right', i, true)}/>*/}
            </div>
          </div>
        </div>
      </div>
    </TinderCard>
  )

  const PopupWindowControls_Message = () => (
    <textarea
      className='popup__additional_controls__textarea'
      ref={popupMessageRef}
      placeholder='Ваше сообщение...'
      maxLength={200}
      minLength={50}>

    </textarea>
  );

  return (
    <>
      <div className='index-body' style={{ overflow: 'hidden' }}>
        <input type={"button"} className='restoreButton'
               onClick={() => childRefs[currentIndex].current.restoreCard()}/>
        <div className='cardContainer'>
          <Profiles />
        </div>
      </div>
      <NegativeDecision />
      <PositiveDecision />
      <MessageDecision />
      <ReportDecision />
      <PopupWindow
        popupCloseButton={true}
        popupId='popup_like_with_message'
        popupBackgroundId='popup_bg_like_with_message'
        popupText='Сообщение пользователю'
        popupTitle=''
        popupCustomStyle={{ height: 400 }}
        popupButtonVoid={() => sendLikeWithMessage(popupMessageRef)}
        popupCustomElements={<PopupWindowControls_Message />}
      />
    </>
  );
}
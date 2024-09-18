import {PopupWindowOptions} from "@/app/utils/types";

export default function PopupWindow(options: PopupWindowOptions) {
  function closePopup(): void {
    document.getElementById(options.popupId).classList.remove('active')
    document.getElementById(options.popupBackgroundId).classList.remove('active')
  }

  return(
    <>
      <div className="popup__bg" id={options.popupBackgroundId}>
        <form className="popup" id={options.popupId} style={options.popupCustomStyle}>
          <div className='popupFormer'>
            <div className='popup__top_panel'>
              <span></span>
              <span className='popup__close_icon'
                    onClick={closePopup} hidden={!options.popupCloseButton??true}> x </span>
            </div>
            <div className='popup__message_text'>
              {options.popupText}
            </div>
            { options.popupCustomElements }
            <input type='button' value={options.popupButtonText??'Принять'}
                   onClick={options.popupButtonVoid} style={{marginTop: '10px'}}/>
          </div>
        </form>
      </div>
    </>
  )
}
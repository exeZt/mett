import settingsImage from '../media/setting-5-svgrepo-com.svg'

export default function Header({ title }){
  return(
    <>
      <header>
        <div className="header-items-holder-component">
          <div className="header-upper-panel">
            <span className='header-up-pagename'>{title}</span>
            <input type='button' className='header-up-settings-btn' hidden={false}/>
          </div>
          <div className="header-lower-panel">
            <input type='button'
                   onClick={() => window.location.replace('/pages/viewprofiles')}/>
            <input type='button'
                   onClick={() => window.location.replace('/pages/user/likes')}/>
            <input type='button'
                   onClick={() => window.location.replace('/pages/user/chats')}/>
            <input type='button'
                   onClick={() => window.location.replace('/pages/user/editprofile')}/>
          </div>
        </div>
      </header>
    </>
  )
}
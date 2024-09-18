import mailImage from "@/app/media/mail-svgrepo-com.svg";
import Image from "next/image";

export default function MessageDecision() {
  return(
    <div className="popup__bg mes_background" id='message_decision'>
      <div className='mes_dec_holder'>
        <Image
          src={mailImage}
          width={175}
          height={175}
          style={{ marginTop: 250 }}
          alt={''}/>
      </div>
    </div>
  )
}
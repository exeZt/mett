import crossImage from "@/app/media/add-svgrepo-com.svg";
import Image from "next/image";

export default function NegativeDecision() {
  return(
    <div className="popup__bg neg_background" id='negative_decision'>
      <div className='neg_dec_holder'>
        <Image
          src={crossImage}
          width={275}
          height={275}
          style={{ transform: 'rotate(-45deg)' }}
          alt={''}/>
      </div>
    </div>
  )
}
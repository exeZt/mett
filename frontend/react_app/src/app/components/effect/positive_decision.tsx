import heartImage from '../../media/heart-svgrepo-com.svg'
import Image from 'next/image';

export default function PositiveDecision() {
  return(
    <div className="popup__bg pos_background" id='positive_decision'>
      <div className='neg_dec_holder'>
        <Image
          src={heartImage}
          width={250}
          height={250}
         alt={''}/>
      </div>
    </div>
  )
}
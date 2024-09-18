import reportImage from '../../media/report.svg';
import Image from 'next/image';

export default function ReportDecision() {
  return(
    <div className="popup__bg rep_background" id='report_decision'>
      <div className='rep_dec_holder'>
        <Image
          src={reportImage}
          width={175}
          height={175}
          style={{ marginTop: 100 }}
          alt={''}/>
      </div>
    </div>
  )
}
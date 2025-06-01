import React, { useContext, useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { GeneralContext } from '../contexts/GeneralContext';

const AdsBanner = () => {
  const {ads_banner} = useContext(GeneralContext);
  const MySwal = withReactContent(Swal);
  const adsFire = () => {
    MySwal.fire({
      imageUrl: ads_banner?.img,
      imageHeight: 150,
      width: '100%',
      text: "Bossi Website မှ မည်သည့်ဂိမ်းကိုမဆို မသမာသောနည်းဖြင့် ကစားထားခြင်း၊ ကစားထားသော ဂိမ်းများ report ကြည့်မရခြင်း၊ အကောင့်တခုထပ်ပို၍ဖွင့်ကစားထားခြင်း စသည်များကို တွေ့ရှိပါက ထိုကဲ့သို့ ကစားထားသော Player အနိုင်ကြေးအပြင် သွင်းငွေကိုပါ ထုတ်ပေးမည် မဟုတ်ကြောင်း လေးစားစွာအသိပေးအပ်ပါသည်။"
    })
  }
  useEffect(() => {
    if(ads_banner?.img){
      adsFire()
    }
  }, [ads_banner?.img]);

  return (
    <div>

    </div>
  )
}

export default AdsBanner
import React from 'react';
import VideoPlayer from './components/VideoPlayer';

function App() {

  const videos = [
    "https://cdn.videvo.net/videvo_files/video/premium/video0238/large_watermarked/06_day_part_II_729_wide_lednik_preview.mp4",
    "https://cdn.videvo.net/videvo_files/video/premium/2020-08/large_watermarked/Smart_City_Car_Follow_4K_Loop_Green_preview.mp4",
    "https://cdn.videvo.net/videvo_files/video/free/2020-04/large_watermarked/200314 _Work Life_02_ 4k_058_preview.mp4",
    "https://cdn.videvo.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4",
    "https://cdn.videvo.net/videvo_files/video/premium/video0229/large_watermarked/07_usa_day_4_360_lob_couple_preview.mp4",
    "https://cdn.videvo.net/videvo_files/video/free/2015-08/large_watermarked/FireworksSlowMotion_preview.mp4",
    "https://cdn.videvo.net/videvo_files/video/premium/2020-07/large_watermarked/200727_02_Videvo_Stock_Market_2_Growth_Color_2_preview.mp4",
    "https://cdn.videvo.net/videvo_files/video/free/2015-03/large_watermarked/fire_background_loop2_videvo2_preview.mp4",
    "https://cdn.videvo.net/videvo_files/video/premium/video0223/large_watermarked/08_dogs_plus_271_paint_money_preview.mp4",
    "https://cdn.videvo.net/videvo_files/video/free/2012-07/large_watermarked/Countdown Timer_preview.mp4"
  ]
  return (
    <div className='App'>
      {
        videos.map((vd,i) => (
          <VideoPlayer source={vd} wide={500} key={i}  />
        ))
      }
    </div>
  )
}

export default App
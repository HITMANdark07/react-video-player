import React from 'react';
import VideoPlayer from './components/VideoPlayer';

function App() {

  const videos = [
    // "https://cdn.videvo.net/videvo_files/video/premium/2020-08/thumbnails/Smart_City_Loop_3_4K_Purple_small.jpg",
    "https://cdn.videvo.net/videvo_files/video/premium/2020-08/large_watermarked/Smart_City_Car_Follow_4K_Loop_Green_preview.mp4",
    "https://cdn.videvo.net/videvo_files/video/free/2020-04/large_watermarked/200314 _Work Life_02_ 4k_058_preview.mp4",
    
  ]
  return (
    <div className='App'>
      {
        videos.map((vd,i) => (
          <VideoPlayer source={vd} wide={500} key={i} />
        ))
      }
    </div>
  )
}

export default App
import React from "react";
import "../styles.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
const src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/49_20HQOeijh9fog1/tv-noise-on-television-screen_e_hexxnue__fbcddf4a43ae5e9781fd5fa867190cd2__P360.mp4";
export default function VideoPlayer({source=src, wide=600}) {
  const [play, setPlay] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const [volumeWidth, setVolumeWidth] = React.useState(0);
  const [muted, setMuted] = React.useState(false);
  const [currTime, setCurrTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [fullScreeen, setFullScreen] = React.useState(false);
  const videoRef = React.useRef();
  const volumeRef = React.useRef();
  const togglePlay = () => {
    setPlay((prevState) => !prevState);
  };
  const [playCounter, setPlayCounter] = React.useState(0);
  const playBackSpeed = [{text:'1.0 X', rate:1.0},{text:'1.25 X', rate:1.25},{text:'1.75 X', rate:1.75},{text:'2.0 X', rate:2.0}];
  React.useEffect(() => {
    if (play) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [play]);

  const formateTime = (time) => {
    return (
      <div className="format-time">
        {parseInt(time / 60) < 10
          ? `0` + parseInt(time / 60)
          : parseInt(time / 60)}
        :
        {parseInt(time % 60) < 10
          ? `0` + parseInt(time % 60)
          : parseInt(time % 60)}
      </div>
    );
  };
  const toggleMute = () => {
    videoRef.current.muted = !muted;
    setMuted((prevState) => !prevState);
  };
  const togglePlayCounter = () => {
    if(videoRef.current){
      let counter = (playCounter+1)%playBackSpeed.length;
      videoRef.current.playbackRate = playBackSpeed[counter].rate;
      setPlayCounter((prevCount) => prevCount+1);
    }
  }
  const toggleFullScreen = () => {
    let elem = videoRef.current;
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);
    if (videoRef.current && !fullScreeen) {
        if (elem.parentNode.requestFullscreen) {
          elem.parentNode.requestFullscreen();
        } else if (elem.parentNode.webkitRequestFullscreen) {
          elem.parentNode.webkitRequestFullscreen();
        } else if (elem.parentNode.msRequestFullscreen) {
          elem.parentNode.msRequestFullscreen();
        }
        setFullScreen(true);
    }else if(videoRef.current && fullScreeen){
         if (isInFullScreen) document.exitFullscreen()
        setFullScreen(false);
    }
  };
  React.useEffect(() => {
    videoRef.current.addEventListener("timeupdate", () => {
      if (videoRef.current) {
        let pos = videoRef.current.currentTime / videoRef.current.duration;
        setWidth(pos * 100);
        setCurrTime(videoRef.current.currentTime);
        setDuration(videoRef.current.duration);
        setVolumeWidth(videoRef.current ? videoRef.current.volume * 100 : 0);
        // videoRef.current.volume = 1;
      }
      if (videoRef.current?.ended) {
        setPlay(false);
      }
    });
    // return () => {
    //   if (videoRef.current) {
    //     videoRef.current.removeEventListener("timeupdate");
    //   }
    // };
  }, []);

  return (
      <div className="video-box" style={{width:wide}}>
        <video
          ref={videoRef}
          src={source}
          controls={false}
        />
        <div className="controls">
          <div className="play">
            {play ? (
              <PauseIcon
                onClick={togglePlay}
                style={{ color: "#fff", fontSize: "2rem", cursor: "pointer" }}
              />
            ) : (
              <PlayCircleIcon
                onClick={togglePlay}
                style={{ color: "#fff", fontSize: "2rem", cursor: "pointer" }}
              />
            )}
            <div className="main-controls">
              <div className="subtitle">
                <ClosedCaptionIcon style={{
                      color: "#fff",
                      fontSize: "2rem",
                      cursor: "pointer"
                  }} />
              </div>
              <div className="playback" onClick={togglePlayCounter}>
                {playBackSpeed[playCounter%(playBackSpeed.length)].text}
              </div>
              <div className="volume">
                {muted ? (
                  <VolumeMuteIcon
                    onClick={toggleMute}
                    style={{
                      color: "#fff",
                      fontSize: "2rem",
                      cursor: "pointer"
                    }}
                  />
                ) : (
                  <VolumeUpIcon
                    onClick={toggleMute}
                    style={{
                      color: "#fff",
                      fontSize: "2rem",
                      cursor: "pointer"
                    }}
                  />
                )}
                <div
                  ref={volumeRef}
                  className="volume-control"
                  onClick={(e) => {
                    setVolumeWidth(e.clientX - volumeRef.current.offsetLeft);
                    let vol = (e.clientX - volumeRef.current.offsetLeft) / 100;
                    if (vol > 1) videoRef.current.volume = 1;
                    else videoRef.current.volume = vol;
                  }}
                >
                  <div
                    className="v-control"
                    style={{ width: `${volumeWidth}%` }}
                  ></div>
                </div>
              </div>
              <div className="time">- {formateTime(duration - currTime)}</div>
              <div className="fullscreen">
                {fullScreeen ? (
                  <FullscreenExitIcon
                    onClick={toggleFullScreen}
                    style={{
                      color: "#fff",
                      fontSize: "2rem",
                      cursor: "pointer"
                    }}
                  />
                ) : (
                  <FullscreenIcon
                    onClick={toggleFullScreen}
                    style={{
                      color: "#fff",
                      fontSize: "2rem",
                      cursor: "pointer"
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className="seek-bar"
            onClick={(e) => {
              videoRef.current.currentTime =
                (e.clientX / videoRef.current.offsetWidth) *
                videoRef.current.duration;
            }}
          >
            <div className="seek-progress" style={{ width: `${width}%` }}></div>
          </div>
        </div>
      </div>
  );
}

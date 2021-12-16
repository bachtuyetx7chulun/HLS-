import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { bounce } from "react-animations";
import styled, { keyframes } from "styled-components";
import "./App.css";

const bounceAnimation = keyframes`${bounce}`;
const Video = styled.video`
  width: 100%;
  height: 100%;
  max-width: 960px;
  max-height: 540px;
  margin: 20px auto;
  color: green;
  animation: 1s ${bounceAnimation};
`;

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<any>();
  useEffect(() => {
    const videoSource =
      "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8";
    const video = document.getElementById("video") as any;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSource);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSource;
    }
  }, []);

  return (
    <div className="App">
      <Video
        onClick={() => {
          if (!isPlaying) {
            ref.current.play();
            setIsPlaying(true);
          }

          if (isPlaying) {
            ref.current.pause();
            setIsPlaying(false);
          }
        }}
        id="video"
        ref={ref}
      />
    </div>
  );
}

export default App;

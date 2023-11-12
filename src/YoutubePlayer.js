import React, { useState } from 'react';
import YouTube from 'react-youtube';
import './YoutubePlayer.css'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const YoutubePlayer = () => {
    const [playerRef, setPlayerRef] = useState(null);
    const session_end_url = 'https://blog.askjhansi.com/session-ended/';

    // Redirect to another page once the video ends.
    let redirecting = false;
    function video_ended() {
        if (playerRef !== null) {
            let currentTime = playerRef.getCurrentTime();
            let duration = playerRef.getDuration();
            let timeLeft = duration - currentTime;
            if (timeLeft < 5 && !redirecting) {
                redirecting = true;
                window.location.href = session_end_url;
            }
        }
    }
    setInterval(video_ended, 2000);

    // Make live if the user changes tab or closes.
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
            make_live();
        }
    });

    // Calculate and move the video cursor to live timings.
    function make_live(myPlayer = playerRef) {
        if (myPlayer !== null) {
            let now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
            let startSeconds = window.start_hour * 60 * 60;
            startSeconds = startSeconds + window.start_minute * 60;
            let startTime = hours * 60 * 60 + minutes * 60 + seconds - startSeconds;
            try {
                if (startTime < 0) {
                    window.location.href = 'https://blog.askjhansi.com/2757-2/';
                } else {
                    myPlayer.seekTo(startTime);
                }
                myPlayer.playVideo();
            } catch (e) { console.log(e) }
        }
    }

    // Youtube iframe API to initialize player.
    const onPlayerReady = (event) => {
        const overlay = document.getElementsByClassName('yt-player-button')[0];
        overlay.addEventListener('click', function () {
            setPlayerRef(event.target);
            make_live(event.target);
            document.getElementsByClassName('yt-player-button')[0].style.display = 'none';
        });
    };

    // Removes the overlay once the player starts playing.
    let done = false;
    const onPlayerStateChange = (event) => {
        if (event.data === 1) {
            setTimeout(() => {
                document.getElementsByClassName('yt-thumbnail-overlay')[0].style.opacity = '0';
                document.getElementsByClassName('yt-player-button')[0].style.display = 'none';
            }, 3100);
            if (!done) {
                make_live();
                done = true;
            }
        }
        if (event.data === 0) {
            event.target.pauseVideo();
            window.location.href = session_end_url;
        }
    };

    const opts = {
        playerVars: {
            playsinline: 1,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            autoplay: 0,
            controls: 0,
            vq: 'large'
        },
        width: '100%',
        height: '100%'
    };

    return (
        <div className="yt-video-container">
            <YouTube
                videoId={window.video_id}
                className="yt-video-player"
                opts={opts}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange}
            />
            <img className="yt-thumbnail-overlay" src={window.thumbnail_url} alt="Overlay Player" draggable="false" />
            <PlayCircleIcon className="yt-player-button" style={{ fontSize: '100px' }} />
        </div>
    );
};

export default YoutubePlayer;

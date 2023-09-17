import React, { useEffect, useRef, useState } from 'react';
import { BsFillPlayCircleFill, BsPauseCircleFill, BsThreeDotsVertical } from 'react-icons/bs';
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled } from 'react-icons/tb';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import './style.scss';

function MusicPlayer({ songDetails, songs, setSelectedSongDetails, setSelectedSong, onSongChange, isPlaying, handleTogglePlayPause }) {
    const { name, artist, cover } = songDetails;
    const audioRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.src = songDetails.url;
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, songDetails]);

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.addEventListener('timeupdate', () => {
                setCurrentTime(audioElement.currentTime);
                setDuration(audioElement.duration);
            });
        }
        return () => {
            if (audioElement) {
                audioElement.removeEventListener('timeupdate', () => {
                    setCurrentTime(audioElement.currentTime);
                    setDuration(audioElement.duration);
                });
            }
        };
    }, []);

    const handleNext = () => {
        const currentSongIndex = songs.findIndex((s) => s.id === songDetails.id);
        const nextIndex = (currentSongIndex + 1) % songs.length;
        const nextSong = songs[nextIndex];
        setSelectedSong(nextSong.id);
        setSelectedSongDetails(nextSong);
        if (onSongChange) {
            onSongChange(nextSong.accent);
        }
        handleTogglePlayPause();
    };

    const handlePrev = () => {
        const currentSongIndex = songs.findIndex((s) => s.id === songDetails.id);
        const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        const prevSong = songs[prevIndex];
        setSelectedSong(prevSong.id);
        setSelectedSongDetails(prevSong);
        if (onSongChange) {
            onSongChange(prevSong.accent);
        }
        handleTogglePlayPause();
    };

    const handleVolumeIconClick = () => {
        const audioElement = audioRef.current;

        if (audioElement) {
            if (isMuted) {
                audioElement.muted = false;
            } else {
                audioElement.muted = true;
            }
            setIsMuted(!isMuted);
        }
    };

    const handleSeek = (e) => {
        const audioElement = audioRef.current;
        const newTime = (e.target.value / 100) * duration;
        audioElement.currentTime = newTime;
    };

    if (!songDetails) {
        return null;
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="music-player">
            <div className="song-info">
                <span>{name}</span>
                <span>{artist}</span>
            </div>
            <div className="cover-photo">
                <img src={`https://cms.samespace.com/assets/${cover}`} alt={name} />
            </div>
           < div className="seek-bar">
                <input
                className='seek'
                    type="range"
                    min={0}
                    max={100}
                    value={(currentTime / duration) * 100 || 0}
                    onChange={handleSeek}
                />
                {/* <div className="time-display">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div> */}
            </div>
            <audio ref={audioRef} />
            <div className="controls">
                <div className="controls__menu"><BsThreeDotsVertical /></div>
                <div className="controls__btns">
                    <div className="prev" onClick={handlePrev}>
                        <TbPlayerTrackPrevFilled size={20} />
                    </div>
                    <div className='playpause-btn' onClick={handleTogglePlayPause}>
                        {isPlaying ? <BsPauseCircleFill size={40} /> : <BsFillPlayCircleFill size={40} />}
                    </div>
                    <div className="next" onClick={handleNext}>
                        <TbPlayerTrackNextFilled size={20} />
                    </div>
                </div>
                <div className="controls__sound" onClick={handleVolumeIconClick}>
                    {isMuted ? <HiSpeakerXMark size={20} /> : <HiSpeakerWave size={20} />}
                </div>
            </div>
            <audio ref={audioRef} />
        </div>
    );
}

export default MusicPlayer;

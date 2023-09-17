import React, { useEffect, useState } from 'react';
import './style.scss';
import axios from 'axios';
import MusicPlayer from '../MusicArea/MusicPlayer';

function SongsLists({ onAccentData }) {
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [selectedSongDetails, setSelectedSongDetails] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const apiUrl = 'https://cms.samespace.com/items/songs';

        axios.get(apiUrl)
            .then(response => {
                const songData = response.data.data;
                setSongs(songData);
                const randomIndex = Math.floor(Math.random() * songData.length);
                const initialSelectedSong = songData[randomIndex];
                onAccentData(initialSelectedSong.accent);
                setSelectedSong(initialSelectedSong.id);
                setSelectedSongDetails(initialSelectedSong);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [onAccentData]);

    const handleSongClick = (songId) => {
        const selectedSongData = songs.find(s => s.id === songId);
        setSelectedSong(songId);
        setSelectedSongDetails(selectedSongData);
        onAccentData(selectedSongData.accent);
        setIsPlaying(true);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredSongs = songs.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const SongsList = () => {
        return (
            <>
                {filteredSongs.map((s) => (
                    <div className={`song ${s.id === selectedSong ? 'active' : ''}`} onClick={() => handleSongClick(s.id)} key={s.id}>
                        <div className="album">
                            <div className="album__img">
                                <img src={`https://cms.samespace.com/assets/${s.cover}`} alt={s.name} />
                            </div>
                            <div className="album__details">
                                <div className="name">
                                    {s.name}
                                </div>
                                <div className="artist">
                                    {s.artist}
                                </div>
                            </div>
                        </div>
                        <div className="song__duration">
                            4:45
                        </div>
                    </div>
                ))}
            </>
        );
    };

    return (
        <div className="music__container">
            <div className='songsList__section'>
                <div className="songsList">
                    <div className="songsList__tabs">
                        <h2>For You</h2>
                        <h2>Top Tracks</h2>
                    </div>
                    <div className="songsList__search">
                        <input
                            type="search"
                            name="search"
                            id="search"
                            placeholder='Search Song, Artist'
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <g opacity="0.4">
                                <path d="M25.6668 25.6666L20.6668 20.6666L25.6668 25.6666ZM6.33343 14.6666C6.33343 10.0643 10.0644 6.33331 14.6668 6.33331C19.2692 6.33331 23.0001 10.0643 23.0001 14.6666C23.0001 19.269 19.2692 23 14.6668 23C10.0644 23 6.33343 19.269 6.33343 14.6666Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </div>
                    <div className="songsList__songlists">
                        <SongsList />
                    </div>
                </div>
            </div>
            {selectedSongDetails && (
                <MusicPlayer
                    songDetails={selectedSongDetails}
                    songs={songs}
                    setSelectedSongDetails={setSelectedSongDetails}
                    setSelectedSong={setSelectedSong}
                    onSongChange={onAccentData}
                    isPlaying={isPlaying}
                    handleTogglePlayPause={() => setIsPlaying(!isPlaying)}
                />
            )}
        </div>
    );
}

export default SongsLists;

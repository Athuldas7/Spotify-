import React from 'react'
import './style.scss'

const ProfileBar = () => {
    return (
        <div className="profilebar__section">
            <div className="profilebar">
                <img className="profilebar__logo" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="Spotify Logo" />
                <div className="profilebar__ac">
                    <img src="https://images.pexels.com/photos/10311994/pexels-photo-10311994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Profile" />
                </div>
            </div>
        </div>
    )
}

export default ProfileBar
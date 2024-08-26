import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
    const [songs, setSongs] = useState([]);
    const [newSong, setNewSong] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get('/api/songs');
                setSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };
        fetchSongs();
    }, []);

    const handleLike = async (songId) => {
        try {
            const response = await axios.post(`/api/songs/${songId}/like`);
            const updatedSong = response.data;
            const updatedSongs = songs.map((song) =>
                song.id === songId ? updatedSong : song
            );
            setSongs(updatedSongs);
        } catch (error) {
            console.error('Error liking song:', error);
        }
    };

    const handleAddSong = async () => {
        if (newSong.trim() !== '') {
            try {
                const response = await axios.post('/api/songs', { title: newSong, likes: 0 });
                const newSongData = response.data;
                setSongs([...songs, newSongData]);
                setNewSong('');
            } catch (error) {
                console.error('Error adding new song:', error);
            }
        }
    };

    const filteredSongs = songs.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home-page">
            <header className="header">
                {/* ... (phần header không thay đổi) ... */}
            </header>

            <main className="main">
                <section className="song-list">
                    <h2>Bảng xếp hạng bài hát</h2>
                    <ul>
                        {filteredSongs.sort((a, b) => b.likes - a.likes).map((song) => (
                            <li key={song.id}>
                                {song.title}
                                <button onClick={() => handleLike(song.id)}>❤️ {song.likes}</button>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="add-song">
                    <h2>Thêm bài hát</h2>
                    <input
                        type="text"
                        value={newSong}
                        onChange={(e) => setNewSong(e.target.value)}
                        placeholder="Nhập tên bài hát"
                    />
                    <button onClick={handleAddSong}>Thêm</button>
                </section>

                <section className="search-song">
                    <h2>Tìm kiếm bài hát</h2>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Tìm kiếm bài hát"
                    />
                </section>
            </main>

            <footer className="footer">
                {/* ... (phần footer không thay đổi) ... */}
            </footer>
        </div>
    );
};

export default HomePage;
import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
    const [songs, setSongs] = useState([]);
    const [newSong, setNewSong] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Lấy dữ liệu bài hát từ API hoặc từ trạng thái ứng dụng
        const initialSongs = [
            { id: 1, title: 'Truyền Thái Y - Ngô Kiến Huy', likes: 420 },
            { id: 2, title: 'Years Love', likes: 14335 },
            { id: 3, title: 'See tình', likes: 123430 },
            { id: 4, title: 'Phong cách', likes: 10 },
        ];
        setSongs(initialSongs);
    }, []);

    const handleLike = (songId) => {
        // Cập nhật số lượng lượt thích của bài hát
        const updatedSongs = songs.map((song) =>
            song.id === songId ? { ...song, likes: song.likes + 1 } : song
        );
        setSongs(updatedSongs);

        // Hiệu ứng trái tim bay lên
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * 100}%`;
        document.body.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 1000);
    };

    const handleAddSong = () => {
        if (newSong.trim() !== '') {
            // Thêm bài hát mới vào danh sách
            const newSongItem = { id: songs.length + 1, title: newSong, likes: 0 };
            setSongs([...songs, newSongItem]);
            setNewSong('');
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
                {/* ... (phần main không thay đổi) ... */}

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
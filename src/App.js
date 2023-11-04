import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [data, satData] = useState([]);


  const handleSearch = e => {
    if (searchTerm) {
      const accessKey = 'Kh5sg-0AuSKsO3MhPKc7klBO88WOCPoxnSUlr2P06Gs';
      axios.get(`https://api.unsplash.com/search/photos?page=${page}&query=${searchTerm}&client_id=${accessKey}`,
        {
          headers: {
            Authorization: "Client-ID " + accessKey
          }
        })
        .then(res => {
          satData([...data, ...res.data.results]);
          // setPage(page + 1)
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    handleSearch()
  }, [page]);

  const handleScroll = () => {
    const threshold = 100; // Adjust this value as needed
    const isBottomOfPage = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - threshold;
    if (isBottomOfPage) {
      setPage(prevPage => prevPage + 1);
    }
  };

  console.log(data)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, []);

  const jumbotronStyles = {
    height: '200px',
    display: 'flex',
    justifyContent: 'top',
    alignItems: 'top',
    color: 'black',
  };

  return (
    <>
      <div style={jumbotronStyles} className=" jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Unsplash</h1>
          <p className="lead">The internet's source of freely-usable images.</p>
          <div className="form-group mx-sm-3 mb-2">
            <input onChange={e => setSearchTerm(e.target.value)} type="text" className="form-control" id="search" placeholder="Search" />
          </div>
          <button onClick={handleSearch} className="btn btn-primary mb-2">Search</button>

        </div>
      </div>
      <div>
        <div className="image-grid">
          {data && data.map(image =>
            <img key={image.id} src={image.urls.small} alt={image.alt_description} />
          )}
        </div>
      </div>

    </>
  );
};

export default HomePage;
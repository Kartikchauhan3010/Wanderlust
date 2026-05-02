import { useState } from 'react';
import { searchDestinations } from '../services/travelApi';
import { MOCK_DESTINATIONS } from '../utils/mockData';
import SearchBar from '../components/common/SearchBar';
import DestinationCard from '../components/common/DestinationCard';
import { CardSkeleton } from '../components/common/Skeleton';
import './Search.css';

const Search = () => {
  const [results, setResults] = useState(MOCK_DESTINATIONS);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (q) => {
    setQuery(q);
    setError('');
    if (!q.trim()) {
      setResults(MOCK_DESTINATIONS);
      return;
    }
    setLoading(true);
    try {
      const data = await searchDestinations(q);
      setResults(data);
      if (data.length === 0) setError(`No destinations found for "${q}".`);
    } catch (err) {
      setError('Search failed. Showing popular destinations.');
      setResults(MOCK_DESTINATIONS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-page__header">
          <h1 className="search-page__title">Search Destinations</h1>
          <p className="search-page__subtitle">
            Find your next adventure — search by city, country, or region
          </p>
          <div className="search-page__bar-wrap">
            <SearchBar onSearch={handleSearch} loading={loading} placeholder="Try 'Paris', 'Japan', 'Bali'…" />
          </div>
        </div>

        <div className="search-page__meta">
          {query && !loading && (
            <p className="search-page__count">
              {error ? error : `${results.length} destination${results.length !== 1 ? 's' : ''} found for "${query}"`}
            </p>
          )}
          {!query && (
            <p className="search-page__count">Showing {results.length} popular destinations</p>
          )}
        </div>

        <div className="dest-grid">
          {loading
            ? Array(6).fill(0).map((_, i) => <CardSkeleton key={i} />)
            : results.map((dest) => (
                <DestinationCard key={dest.xid} destination={dest} />
              ))}
        </div>

        {!loading && results.length === 0 && !error && (
          <div className="search-page__empty">
            <div className="search-page__empty-icon">🗺</div>
            <h3>No results found</h3>
            <p>Try a different search term or explore our popular destinations.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

import { useEffect, useMemo, useState } from 'react';
import EmptyState from '../components/EmptyState.jsx';
import Hero from '../components/Hero.jsx';
import HotelGrid from '../components/HotelGrid.jsx';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import SearchFilters from '../components/SearchFilters.jsx';
import { fetchHotels } from '../api/hotelsApi.js';
import { getPriceNumber } from '../utils/formatters.js';

const initialFilters = {
  query: '',
  city: 'all',
  rating: '0',
  maxPrice: 'all',
  sortBy: 'recommended',
};

export default function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('stayfinder-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetchHotels(controller.signal)
      .then((data) => {
        setHotels(Array.isArray(data) ? data : []);
        setStatus('success');
      })
      .catch((apiError) => {
        if (apiError.name !== 'AbortError') {
          setError('Unable to load hotels right now. Please check your connection and try again.');
          setStatus('error');
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    localStorage.setItem('stayfinder-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const cities = useMemo(() => {
    return [...new Set(hotels.map((hotel) => hotel.location).filter(Boolean))].sort();
  }, [hotels]);

  const filteredHotels = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();
    const minimumRating = Number(filters.rating);
    const maximumPrice = filters.maxPrice === 'all' ? Infinity : Number(filters.maxPrice);

    const results = hotels.filter((hotel) => {
      const hotelName = hotel.name || '';
      const hotelLocation = hotel.location || '';
      const matchesQuery =
        !normalizedQuery ||
        hotelName.toLowerCase().includes(normalizedQuery) ||
        hotelLocation.toLowerCase().includes(normalizedQuery);
      const matchesCity = filters.city === 'all' || hotel.location === filters.city;
      const matchesRating = Number(hotel.rating) >= minimumRating;
      const matchesPrice = getPriceNumber(hotel.price) <= maximumPrice;

      return matchesQuery && matchesCity && matchesRating && matchesPrice;
    });

    return [...results].sort((first, second) => {
      if (filters.sortBy === 'price-low') return getPriceNumber(first.price) - getPriceNumber(second.price);
      if (filters.sortBy === 'price-high') return getPriceNumber(second.price) - getPriceNumber(first.price);
      if (filters.sortBy === 'rating-high') return Number(second.rating) - Number(first.rating);
      return first.id - second.id;
    });
  }, [filters, hotels]);

  function handleFilterChange(name, value) {
    setFilters((currentFilters) => ({ ...currentFilters, [name]: value }));
  }

  function handleReset() {
    setFilters(initialFilters);
  }

  function handleToggleFavorite(hotelId) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(hotelId)
        ? currentFavorites.filter((favoriteId) => favoriteId !== hotelId)
        : [...currentFavorites, hotelId],
    );
  }

  return (
    <>
      <Hero totalHotels={hotels.length} />
      <div className="page-container listing-page">
        <SearchFilters
          cities={cities}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          filteredCount={filteredHotels.length}
          totalCount={hotels.length}
        />

        {status === 'loading' && <LoadingSkeleton />}

        {status === 'error' && (
          <EmptyState title="Hotels could not be loaded" message={error} actionLabel="Try again" onAction={() => window.location.reload()} />
        )}

        {status === 'success' && filteredHotels.length === 0 && (
          <EmptyState
            title="No hotels found"
            message="Try a different city, rating, price range, or search keyword."
            actionLabel="Clear filters"
            onAction={handleReset}
          />
        )}

        {status === 'success' && filteredHotels.length > 0 && (
          <HotelGrid hotels={filteredHotels} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
        )}
      </div>
    </>
  );
}

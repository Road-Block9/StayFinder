import HotelCard from './HotelCard.jsx';

export default function HotelGrid({ hotels, favorites, onToggleFavorite }) {
  return (
    <section className="hotel-grid" aria-label="Hotel results">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          isFavorite={favorites.includes(hotel.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
}

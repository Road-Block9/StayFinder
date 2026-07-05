import { Link } from 'react-router-dom';
import { formatCurrency, getShortDescription } from '../utils/formatters.js';

export default function HotelCard({ hotel, isFavorite, onToggleFavorite }) {
  return (
    <article className="hotel-card">
      <div className="card-media">
        <img src={hotel.thumbnail} alt={hotel.name} loading="lazy" />
        <button
          className={`favorite-button ${isFavorite ? 'is-active' : ''}`}
          type="button"
          onClick={() => onToggleFavorite(hotel.id)}
          aria-label={isFavorite ? `Remove ${hotel.name} from favorites` : `Save ${hotel.name}`}
        >
          {isFavorite ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className="card-content">
        <div className="card-title-row">
          <h3>{hotel.name}</h3>
          <span className="rating-pill">{Number(hotel.rating).toFixed(1)}</span>
        </div>
        <p className="location-text">{hotel.location}</p>
        <p className="description-text">{getShortDescription(hotel.description)}</p>
        <div className="card-footer">
          <div>
            <span className="price-label">From</span>
            <strong>{formatCurrency(hotel.price)}</strong>
          </div>
          <Link className="primary-button" to={`/hotels/${hotel.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

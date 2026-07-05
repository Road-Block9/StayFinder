import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchHotelById } from '../api/hotelsApi.js';
import EmptyState from '../components/EmptyState.jsx';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import { formatCurrency } from '../utils/formatters.js';

export default function HotelDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');

    fetchHotelById(id, controller.signal)
      .then((data) => {
        setHotel(data);
        setStatus(data ? 'success' : 'empty');
      })
      .catch((apiError) => {
        if (apiError.name !== 'AbortError') {
          setStatus('error');
        }
      });

    return () => controller.abort();
  }, [id]);

  if (status === 'loading') {
    return (
      <div className="page-container details-loading">
        <LoadingSkeleton />
      </div>
    );
  }

  if (status === 'error' || status === 'empty') {
    return (
      <div className="page-container">
        <EmptyState
          title="Hotel details unavailable"
          message="The selected hotel could not be loaded from the API."
          actionLabel="Back to hotels"
          onAction={() => navigate('/')}
        />
      </div>
    );
  }

  const galleryPhotos = [hotel.thumbnail, ...(hotel.photos || [])].filter(Boolean).slice(0, 5);

  return (
    <div className="details-page">
      <section className="details-hero">
        <img src={hotel.thumbnail} alt={hotel.name} />
        <div className="details-hero-content">
          <button className="back-button" type="button" onClick={() => navigate(-1)}>
            Back
          </button>
          <p className="eyebrow">{hotel.location}</p>
          <h1>{hotel.name}</h1>
          <div className="details-badges">
            <span>{Number(hotel.rating).toFixed(1)} rating</span>
            <span>{formatCurrency(hotel.price)} per night</span>
          </div>
        </div>
      </section>

      <div className="page-container detail-layout">
        <article className="detail-main">
          <p className="eyebrow">Hotel overview</p>
          <h2>A closer look at your stay</h2>
          <p>{hotel.description || 'This hotel offers a convenient and comfortable stay for travelers.'}</p>

          {galleryPhotos.length > 1 && (
            <div className="gallery-grid" aria-label="Hotel gallery">
              {galleryPhotos.map((photo) => (
                <img src={photo} alt={`${hotel.name} view`} key={photo} loading="lazy" />
              ))}
            </div>
          )}
        </article>

        <aside className="booking-panel" aria-label="Hotel summary">
          <h2>Stay summary</h2>
          <dl>
            <div>
              <dt>City</dt>
              <dd>{hotel.location}</dd>
            </div>
            <div>
              <dt>Rating</dt>
              <dd>{Number(hotel.rating).toFixed(1)} / 5</dd>
            </div>
            <div>
              <dt>Starting price</dt>
              <dd>{formatCurrency(hotel.price)}</dd>
            </div>
            <div>
              <dt>Photos</dt>
              <dd>{galleryPhotos.length}</dd>
            </div>
          </dl>
          <Link className="primary-button full-width" to="/">
            Browse more hotels
          </Link>
        </aside>
      </div>
    </div>
  );
}


import { Link } from 'react-router-dom';
import './EventCard.css';

function EventCard({ event }) {
  const venue = event._embedded?.venues?.[0];

  // Choose an image belonging to this specific event.
  // Prefer a landscape image when available.
  const images = event.images || [];

  const eventImage =
    images.find(
      (image) =>
        image.ratio === '16_9' &&
        image.url &&
        !image.url.toLowerCase().includes('transparent')
    )?.url ||
    images.find((image) => image.url)?.url;

  const eventDate = event.dates?.start?.localDate;

  return (
    <div className="event-card">
      {eventImage ? (
        <img
          src={eventImage}
          alt={event.name || 'Event'}
          className="event-image"
          loading="lazy"
        />
      ) : (
        <div className="event-image event-image-placeholder">
          Image unavailable
        </div>
      )}

      <div className="event-info">
        <h3 className="event-title">
          {event.name || 'Untitled Event'}
        </h3>

        <p className="event-date">
          📅 {eventDate || 'Date unavailable'}
        </p>

        <p className="event-venue">
          📍 {venue?.name || 'Venue unavailable'}
        </p>

        <Link
          to={`/events/${event.id}`}
          className="view-button"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;

import {
  faAddressCard,
  faEnvelope,
  faLocationDot,
  faPhone,
  faQuoteLeft,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUserById } from '../features/users/usersSlice';

const UserPage = () => {
  const { id } = useParams();
  const userId = parseInt(id);
  const user = useSelector((state) => selectUserById(state, userId));
  if (user) {
    const style = { color: 'var(--primary-500)' };
    const {
      name,
      username,
      email,
      phone,
      address: { street, city, zipcode } = {},
      company: { catchPhrase } = {},
    } = user;
    return (
      <section className="section">
        <div className="row">
          <div className="column">
            <FontAwesomeIcon
              className="fa-lg"
              icon={faUserCircle}
              style={style}
            />
          </div>
          <div className="column">
            <div className="value">{name}</div>
            <div className="label">Name</div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <FontAwesomeIcon
              className="fa-lg"
              icon={faAddressCard}
              style={style}
            />
          </div>
          <div className="column">
            <div className="value">{username}</div>
            <div className="label">Username</div>
          </div>
        </div>
        {email && (
          <div className="row">
            <div className="column">
              <FontAwesomeIcon
                className="fa-lg"
                icon={faEnvelope}
                style={style}
              />
            </div>
            <div className="column">
              <div className="value">{email}</div>
              <div className="label">Email</div>
            </div>
          </div>
        )}
        {phone && (
          <div className="row">
            <div className="column">
              <FontAwesomeIcon className="fa-lg" icon={faPhone} style={style} />
            </div>
            <div className="column">
              <div className="value">{phone}</div>
              <div className="label">Mobile</div>
            </div>
          </div>
        )}
        {street && city && zipcode && (
          <div className="row">
            <div className="column">
              <FontAwesomeIcon
                className="fa-lg"
                icon={faLocationDot}
                style={style}
              />
            </div>
            <div className="column">
              <div className="value">
                {street} <br /> {city}, {zipcode}
              </div>
              <div className="label">Work</div>
            </div>
          </div>
        )}
        {catchPhrase && (
          <div className="row">
            <div className="column">
              <FontAwesomeIcon
                className="fa-lg"
                icon={faQuoteLeft}
                style={style}
              />
            </div>
            <div className="column">
              <div className="value">{catchPhrase}</div>
              <div className="label">Catch phrase</div>
            </div>
          </div>
        )}
      </section>
    );
  } else {
    return (
      <section className="section">
        <p className="error-not-found">Not found</p>
      </section>
    );
  }
};
export default UserPage;

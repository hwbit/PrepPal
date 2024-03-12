import { Card } from "react-bootstrap";
import '../../styles/global.css';
import { dateToString } from "../../utils/date";
import './review.css';

function Review(review: any): JSX.Element {
  const renderStars = (rating: any) => {
    const stars = [];
    // Logic to render stars based on rating
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star filled">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="star">&#9733;</span>);
      }
    }
    return stars;
  };

  return (
    <Card className="review-card">
      <Card.Body>
        <Card.Title className='review-title'>{review.title}</Card.Title>
        <Card.Subtitle className='review-author'>By: {review.author}</Card.Subtitle>
        <Card.Text className='review-rating'>Rating: {renderStars(review.rating)}</Card.Text>        
        <Card.Text className='review-comment'>{review.comment}</Card.Text>
        <Card.Text className='review-date'>{dateToString(new Date(review.date))}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Review;
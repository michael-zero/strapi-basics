import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom'


const REVIEWS = gql`
  query GetReviews {
    reviews {
      data {
        id 
        attributes {
          title,
          body,
          rating,
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`

const Homepage = () => {

  const {loading, data, error} = useQuery(REVIEWS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <div>
      {data && data.reviews.data.map(review => (
        <div key={review.attributes.id} className="review-card">
          <div className="rating">{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>
          
          {review.attributes.categories.data.map((c) => (
                <small key={c.id}>{c.attributes.name}</small>
              ))}

          <p>{review.attributes.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}

export default Homepage
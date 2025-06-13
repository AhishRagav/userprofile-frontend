
import { useState, useEffect } from "react"
import axios from "axios"
import "./review.css"

function Review() {
  const [rating, setRating] = useState("")
  const [comment, setComment] = useState("")
  const [average, setAverage] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchAverage()
  }, [])

  const fetchAverage = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getavg")
      setAverage(response.data)
    } catch (err) {
      console.error("Error fetching average:", err)
    }
  }

  const handleSubmit = async () => {
    const parsedRating = Number.parseFloat(rating)
    if ( parsedRating < 0 || parsedRating > 5) {
      setError("Rating must be a number between 0 and 5 .")
      return
    }

    setError("")
    try {
      await axios.post("http://localhost:8080/postreview", {
        review: parsedRating,
        comment,
      })

      setRating("")
      setComment("")
      fetchAverage()
    } catch (err) {
      console.error("Error submitting review:", err)
    }
  }

  return (
    <div className="review-main-container">
      <h1 className="review-heading">We at TRANZY welcome your reviews!</h1>
      <div className="review-box-container">
        <div className="review-box review-form-box">
          <h2>Submit Your Review</h2>

          <label>
            Rating (0.0 - 5.0):
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>

          <label>
            Comment:
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
          </label>

          <button onClick={handleSubmit}>Submit Review</button>

          {error && <p className="review-error">{error}</p>}
        </div>

        <div className="review-box review-average-box">
          <h2>CURRENT AVERAGE RATING</h2>
          <p className="review-average-rating">{average !== null ? average.toFixed(1) : "Loading..."}</p>
          <p className="review-thank-you">
            Thank you for choosing TRANZY!
            <br />
            Your feedback helps us maintain our high standards and continue providing excellent service to all our
            customers.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Review

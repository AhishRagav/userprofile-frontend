"use client"

import { useState } from "react"
import { User, Settings, Lock, Trash2, Star, MapPin, Camera, Edit3, X, Save } from "lucide-react"
import ChangePassword from "./password/ChangePassword"
import ForgotPassword from "./password/ForgotPassword"
import Review from "./reviews/Review.jsx"
import "./profile-page.css"

const ProfilePage = () => {
 
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editingReview, setEditingReview] = useState(null)
  const [profileData, setProfileData] = useState({
    username: "traveler_john",
    email: "john.doe@email.com",
    phone: "+1-234-567-8900",
    preferences: {
      themes: ["Adventure", "Cultural"],
      budgetRange: "Medium",
      modeOfTravel: "Solo",
    },
  })

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [reviews, setReviews] = useState([
    {
      id: 1,
      destination: "Bali, Indonesia",
      rating: 5,
      content: "Amazing experience! The beaches were pristine and the culture was fascinating.",
      date: "2024-03-15",
    },
    {
      id: 2,
      destination: "Tokyo, Japan",
      rating: 4,
      content: "Great food and technology. Would love to visit again during cherry blossom season.",
      date: "2024-02-28",
    },
  ])

  const [memories, setMemories] = useState([
    {
      id: 1,
      destination: "Bali, Indonesia",
      imageUrl: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=300&h=200&fit=crop",
      uploadDate: "2024-03-15",
    },
    {
      id: 2,
      destination: "Tokyo, Japan",
      imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop",
      uploadDate: "2024-02-28",
    },
    {
      id: 3,
      destination: "Paris, France",
      imageUrl: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=200&fit=crop",
      uploadDate: "2024-01-20",
    },
  ])

  const [uploadData, setUploadData] = useState({
    destination: "",
    file: null,
  })

  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const travelThemes = ["Adventure", "Cultural", "Relaxation", "Wildlife", "Urban", "Beach", "Mountain", "Historical"]
  const budgetRanges = ["Budget", "Medium", "Luxury"]
  const travelModes = ["Solo", "Couple", "Family", "Group"]

  
  const handleProfileUpdate = () => {
    
    console.log("Updating profile:", profileData)
    alert("Profile updated successfully!")
  }

  const handlePasswordChange = () => {
    if (passwordData.new !== passwordData.confirm) {
      alert("New passwords do not match!")
      return
    }
    console.log("Changing password")
    alert("Password changed successfully!")
    setPasswordData({ current: "", new: "", confirm: "" })
  }

  const handleDeleteAccount = () => {
    console.log("Deleting account")
    alert("Account deleted successfully!")
    setShowDeleteConfirm(false)
  }

  const handleReviewEdit = (reviewId, newContent) => {
    setReviews(reviews.map((review) => (review.id === reviewId ? { ...review, content: newContent } : review)))
    setEditingReview(null)
  }

  const handleReviewDelete = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId))
  }

  const handleMemoryUpload = () => {
    if (!uploadData.destination || !uploadData.file) {
      alert("Please select a destination and image file")
      return
    }

    
    const newMemory = {
      id: memories.length + 1,
      destination: uploadData.destination,
      imageUrl: URL.createObjectURL(uploadData.file),
      uploadDate: new Date().toISOString().split("T")[0],
    }

    setMemories([...memories, newMemory])
    setUploadData({ destination: "", file: null })
    alert("Memory uploaded successfully!")
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`review-star ${i < rating ? "review-star-filled" : "review-star-empty"}`} />
    ))
  }

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`tab-button ${isActive ? "tab-button-active" : "tab-button-inactive"}`}
    >
      <Icon className="tab-button-icon" />
      <span>{label}</span>
    </button>
  )

  return (
    <div className="container">
      {}
      <div className="header">
        <div className="header-content">
          <div className="avatar">
            <User className="avatar-icon" />
          </div>
          <div>
            <h1 className="page-title">Profile Management</h1>
            <p className="page-subtitle">Manage your travel profile and preferences</p>
          </div>
        </div>
      </div>

      <div className="layout">
        {}
        <div>
          <div className="sidebar">
            <div className="sidebar-nav">
              <TabButton
                id="profile"
                label="Profile Info"
                icon={User}
                isActive={activeTab === "profile"}
                onClick={setActiveTab}
              />
              <TabButton
                id="preferences"
                label="Preferences"
                icon={Settings}
                isActive={activeTab === "preferences"}
                onClick={setActiveTab}
              />
              <TabButton
                id="password"
                label="Password"
                icon={Lock}
                isActive={activeTab === "password"}
                onClick={setActiveTab}
              />
              <TabButton
                id="reviews"
                label="My Reviews"
                icon={Star}
                isActive={activeTab === "reviews"}
                onClick={setActiveTab}
              />
              <TabButton
                id="memories"
                label="My Memories"
                icon={Camera}
                isActive={activeTab === "memories"}
                onClick={setActiveTab}
              />
              <TabButton
                id="delete"
                label="Delete Account"
                icon={Trash2}
                isActive={activeTab === "delete"}
                onClick={setActiveTab}
              />
            </div>
          </div>
        </div>

        {}
        <div>
          <div className="main-content">
            {}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="section-title">Basic Information</h2>

                <div className="form-grid form-grid-2col">
                  <div>
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label">Email (Read-only)</label>
                    <input type="email" value={profileData.email} disabled className="form-input form-input-disabled" />
                  </div>

                  <div className="form-input-full">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <button onClick={handleProfileUpdate} className="btn btn-primary">
                  <Save className="btn-icon" />
                  <span>Update Profile</span>
                </button>
              </div>
            )}

            {}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <h2 className="section-title">Travel Preferences</h2>

                <div className="space-y-6">
                  <div>
                    <label className="form-label">Travel Themes</label>
                    <div className="checkbox-grid">
                      {travelThemes.map((theme) => (
                        <label key={theme} className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={profileData.preferences.themes.includes(theme)}
                            onChange={(e) => {
                              const themes = e.target.checked
                                ? [...profileData.preferences.themes, theme]
                                : profileData.preferences.themes.filter((t) => t !== theme)
                              setProfileData({
                                ...profileData,
                                preferences: { ...profileData.preferences, themes },
                              })
                            }}
                          />
                          <span className="checkbox-text">{theme}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-grid form-grid-2col">
                    <div>
                      <label className="form-label">Budget Range</label>
                      <select
                        value={profileData.preferences.budgetRange}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            preferences: { ...profileData.preferences, budgetRange: e.target.value },
                          })
                        }
                        className="form-input"
                      >
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Mode of Travel</label>
                      <select
                        value={profileData.preferences.modeOfTravel}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            preferences: { ...profileData.preferences, modeOfTravel: e.target.value },
                          })
                        }
                        className="form-input"
                      >
                        {travelModes.map((mode) => (
                          <option key={mode} value={mode}>
                            {mode}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button onClick={handleProfileUpdate} className="btn btn-primary">
                  <Save className="btn-icon" />
                  <span>Save Preferences</span>
                </button>
              </div>
            )}

            {}
            {activeTab === "password" && (
              <div className="space-y-6">
                {!showForgotPassword ? (
                  <ChangePassword onForgotPasswordClick={() => setShowForgotPassword(true)} />
                ) : (
                  <ForgotPassword onBackToChangePassword={() => setShowForgotPassword(false)} />
                )}
              </div>
            )}

            {}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                {showReviewForm ? (
                  <div>
                    <div className="review-header">
                      <h2 className="section-title">Submit Review</h2>
                      <button onClick={() => setShowReviewForm(false)} className="review-back-link">
                        Back to My Reviews
                      </button>
                    </div>
                    <Review />
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <h2 className="section-title">My Reviews</h2>
                      <div className="center-content">
                        <button onClick={() => setShowReviewForm(true)} className="btn btn-primary btn-sm">
                          Submit Review
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="review-item">
                          <div className="review-item-header">
                            <div>
                              <div className="review-location">
                                <MapPin className="review-location-icon" />
                                <h3 className="review-location-text">{review.destination}</h3>
                              </div>
                              <div className="review-meta">
                                <div className="review-stars">{renderStars(review.rating)}</div>
                                <span className="review-date">{review.date}</span>
                              </div>
                            </div>
                            <div className="review-actions">
                              <button
                                onClick={() => setEditingReview(review.id)}
                                className="review-action-btn review-edit-btn"
                              >
                                <Edit3 className="review-star" />
                              </button>
                              <button
                                onClick={() => handleReviewDelete(review.id)}
                                className="review-action-btn review-delete-btn"
                              >
                                <Trash2 className="review-star" />
                              </button>
                            </div>
                          </div>

                          {editingReview === review.id ? (
                            <div className="review-edit-form">
                              <textarea
                                value={review.content}
                                onChange={(e) =>
                                  setReviews(
                                    reviews.map((r) => (r.id === review.id ? { ...r, content: e.target.value } : r)),
                                  )
                                }
                                className="review-textarea"
                                rows={3}
                              />
                              <div className="review-edit-actions">
                                <button
                                  onClick={() => handleReviewEdit(review.id, review.content)}
                                  className="btn btn-success btn-sm"
                                >
                                  <Save className="btn-icon" />
                                  <span>Save</span>
                                </button>
                                <button onClick={() => setEditingReview(null)} className="btn btn-gray btn-sm">
                                  <X className="btn-icon" />
                                  <span>Cancel</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="review-content">{review.content}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {}
            {activeTab === "memories" && (
              <div className="space-y-6">
                <h2 className="section-title">My Memories</h2>

                {}
                <div className="memory-upload">
                  <h3 className="memory-upload-title">Upload New Memory</h3>
                  <div className="form-grid form-grid-2col">
                    <div>
                      <label className="form-label">Destination</label>
                      <input
                        type="text"
                        value={uploadData.destination}
                        onChange={(e) => setUploadData({ ...uploadData, destination: e.target.value })}
                        placeholder="Enter destination name"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="form-label">Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setUploadData({ ...uploadData, file: e.target.files[0] })}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <button onClick={handleMemoryUpload} className="btn btn-primary" style={{ marginTop: "1rem" }}>
                    <Camera className="btn-icon" />
                    <span>Upload Memory</span>
                  </button>
                </div>

                {}
                <div className="memory-grid">
                  {memories.map((memory) => (
                    <div key={memory.id} className="memory-card">
                      <img
                        src={memory.imageUrl || "/placeholder.svg"}
                        alt={memory.destination}
                        className="memory-image"
                      />
                      <div className="memory-details">
                        <div className="memory-location">
                          <MapPin className="memory-location-icon" />
                          <h3 className="memory-location-text">{memory.destination}</h3>
                        </div>
                        <p className="memory-date">Uploaded on {memory.uploadDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {}
            {activeTab === "delete" && (
              <div className="space-y-6">
                <h2 className="section-title">Delete Account</h2>

                <div className="delete-container">
                  <div className="delete-header">
                    <Trash2 className="delete-icon" />
                    <div className="delete-content">
                      <h3 className="delete-title">Permanent Account Deletion</h3>
                      <p className="delete-warning">
                        This action cannot be undone. Deleting your account will permanently remove:
                      </p>
                      <ul className="delete-list">
                        <li>Your profile information and preferences</li>
                        <li>All submitted reviews and ratings</li>
                        <li>Uploaded memories and images</li>
                        <li>Account history and data</li>
                      </ul>

                      {!showDeleteConfirm ? (
                        <button onClick={() => setShowDeleteConfirm(true)} className="btn btn-danger">
                          <Trash2 className="btn-icon" />
                          <span>Delete My Account</span>
                        </button>
                      ) : (
                        <div className="space-y-4">
                          <p className="delete-confirm">Are you absolutely sure?</p>
                          <div className="delete-actions">
                            <button onClick={handleDeleteAccount} className="btn btn-danger">
                              Yes, Delete My Account
                            </button>
                            <button onClick={() => setShowDeleteConfirm(false)} className="btn btn-gray">
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

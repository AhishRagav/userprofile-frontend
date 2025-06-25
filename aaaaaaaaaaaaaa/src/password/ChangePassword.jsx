

import { useState } from "react"
import axios from "axios"
import "./password.css"

function ChangePassword({ onForgotPasswordClick }) {
  const [username, setUsername] = useState("")
  const [oldpassword, setOldPassword] = useState("")
  const [newpassword, setNewPassword] = useState("")
  const [status, setStatus] = useState(null)

  const handleSubmit = async () => {
    if (!username || !oldpassword || !newpassword) {
      setStatus("All fields are required")
      return
    }

    try {
      const response = await axios.post("http://localhost:8086/changepassword", {
        username,
        oldpassword,
        newpassword,
      })
      if (response.data === "success") {
        setStatus("success")
      } else {
        setStatus("wrong credentials")
      }
    } catch (error) {
      alert("Error occurred while changing password")
    }
  }

  return (
    <div className="password-container">
      <h2>TRANZY - Change Password</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input
        type="password"
        placeholder="Old Password"
        value={oldpassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newpassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      {status === "success" && <h3 style={{ color: "green" }}>Password has been updated</h3>}
      {status && status !== "success" && <h3 style={{ color: "red" }}>{status}</h3>}

      <a className="password-link" onClick={onForgotPasswordClick}>
        Forgot Password?
      </a>
    </div>
  )
}

export default ChangePassword

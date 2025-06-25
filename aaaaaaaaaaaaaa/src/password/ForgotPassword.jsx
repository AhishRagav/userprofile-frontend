

import { useState } from "react"
import axios from "axios"
import "./password.css"

function ForgotPassword({ onBackToChangePassword }) {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setpassword] = useState("")
  const [status, setStatus] = useState(null)
  const [status1, setStatus1] = useState(null)

  const handleGetOtp = async () => {
    if (!email) {
      setStatus("Enter Email")
      return
    }

    try {
      const response = await axios.post("http://localhost:8086/send-email", {
        email,
      })
      setStatus(response.data)
    } catch (err) {
      setStatus("failed to send otp")
    }
  }

  const handleResetPassword = async () => {
    if (!email || !otp || !password) {
      setStatus1("All fields are required")
      return
    }

    try {
      const response = await axios.post("http://localhost:8086/changewith-otp", {
        email,
        otp,
        password,
      })
      if (response.data === "success") {
        setStatus1("success")
      } else {
        setStatus1("incorrect OTP")
      }
    } catch (error) {
      setStatus1("error has been occured")
    }
  }

  return (
    <div className="password-container">
      <h2>TRANZY - Forgot Password</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleGetOtp}>Get OTP</button>

      {status === "success" && <h3 style={{ color: "green" }}>Email has been sent</h3>}
      {status && status !== "success" && <h3 style={{ color: "red" }}>{status}</h3>}

      <input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>

      {status1 === "success" && <h3 style={{ color: "green" }}>Password has been updated</h3>}
      {status1 && status1 !== "success" && <h3 style={{ color: "red" }}>{status1}</h3>}

      <a className="password-link" onClick={onBackToChangePassword}>
        Back to Change Password
      </a>
    </div>
  )
}

export default ForgotPassword

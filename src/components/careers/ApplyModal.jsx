import { useState } from "react";
import "./applyModal.css";

export default function ApplyModal({ isOpen, onClose, jobTitle }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const data = new FormData();
      data.append("jobTitle", jobTitle);
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("resume", formData.resume);

      const response = await fetch(
       `${process.env.REACT_APP_API_URL}/api/applications/apply`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Failed");

      alert("✅ Application submitted successfully!");
      onClose();
      setFormData({ name: "", email: "", phone: "", resume: null });
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-overlay">
      <div className="apply-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>Apply for {jobTitle}</h2>
        {errorMsg && <div className="error-msg">{errorMsg}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
          <input type="file" name="resume" accept=".pdf,.doc,.docx" required onChange={handleChange} />
          <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Application"}</button>
        </form>
      </div>
    </div>
  );
}

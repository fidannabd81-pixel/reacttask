import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    hobbies: [],
    city: "",
    note: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const hobbyList = ["Musiqi", "İdman", "Kitab", "Oyun", "Səyahət"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setForm({ ...form, hobbies: [...form.hobbies, value] });
    } else {
      setForm({ ...form, hobbies: form.hobbies.filter((h) => h !== value) });
    }
  };

  const validate = () => {
    const err = {};

    if (form.name.trim() === "") {
      err.name = "Ad daxil edin";
    }
    if (form.email.trim() === "" || !form.email.includes("@") || !form.email.includes(".")) {
      err.email = "Düzgün email daxil edin";
    }
    if (form.password.length < 6) {
      err.password = "Şifrə ən azı 6 simvol olmalıdır";
    }
    if (form.gender === "") {
      err.gender = "Cins seçin";
    }
    if (form.hobbies.length === 0) {
      err.hobbies = "Ən azı bir seçim edin";
    }
    if (form.city === "") {
      err.city = "Şəhər seçin";
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    setSuccess(Object.keys(err).length === 0);
  };

  return (
    <div className="container">
      <h2>Qeydiyyat Formu</h2>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Ad</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="field">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="field">
          <label>Şifrə</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="field">
          <label>Cins</label>
          <label className="inline">
            <input
              type="radio"
              name="gender"
              value="Kişi"
              checked={form.gender === "Kişi"}
              onChange={handleChange}
            />{" "}
            Kişi
          </label>
          <label className="inline">
            <input
              type="radio"
              name="gender"
              value="Qadın"
              checked={form.gender === "Qadın"}
              onChange={handleChange}
            />{" "}
            Qadın
          </label>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        <div className="field">
          <label>Maraq dairələri</label>
          {hobbyList.map((h) => (
            <label key={h} className="inline">
              <input
                type="checkbox"
                value={h}
                checked={form.hobbies.includes(h)}
                onChange={handleCheckbox}
              />{" "}
              {h}
            </label>
          ))}
          {errors.hobbies && <p className="error">{errors.hobbies}</p>}
        </div>

        <div className="field">
          <label>Şəhər</label>
          <select name="city" value={form.city} onChange={handleChange}>
            <option value="">Seçin</option>
            <option value="Bakı">Bakı</option>
            <option value="Gəncə">Gəncə</option>
            <option value="Sumqayıt">Sumqayıt</option>
            <option value="Lənkəran">Lənkəran</option>
          </select>
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        <div className="field">
          <label>Qeyd</label>
          <textarea name="note" value={form.note} onChange={handleChange}></textarea>
        </div>

        <button type="submit">Göndər</button>
      </form>

      {success && <h3 className="success">Form uğurla göndərildi!</h3>}
    </div>
  );
}

export default App;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/Slices/authSlice";

const RegisterClient = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    nom: "",
    genre: "",
    telephone: "",
    ville: "",
    photo: "null",
    email: "",
    password: "",
    role: "client",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div>
      <h2>Inscription</h2>
      {auth.error && <p style={{ color: "red" }}>{auth.error.message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-control">الاسم</label>
          <input
            className="form-control"
            type="text"
            name="nom"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="form-control">ألجنس</label>
          <select
            className="form-select"
            onChange={(e) =>
              setFormData({ ...formData, genre: e.target.value })
            }
          >
            <option value="homme">ذكر</option>
            <option value="femme">انثى</option>
          </select>
        </div>
        <div>
          <label className="form-control">الهاتف</label>
          <input
            className="form-control"
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={(e) =>
              setFormData({ ...formData, telephone: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="form-control">المدينة</label>
          <input
            className="form-control"
            type="text"
            name="ville"
            value={formData.ville}
            onChange={(e) =>
              setFormData({ ...formData, ville: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="form-control">الصورة</label>
          <input
            className="form-control"
            type="file"
            name="photo"
            // onChange={(e) =>
            //   setFormData({ ...formData, photo: e.target.files[0] })
            // }
            required
          />
        </div>
        <div>
          <label className="form-control">الايميل</label>
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="form-control">الرمز السري</label>
          <input
            className="form-control"
            type="password"
            name="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default RegisterClient;

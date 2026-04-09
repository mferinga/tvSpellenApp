import { useState } from 'react';
import { authService } from '../auth.service';
import { hasRestults } from '../../typeguard/ResponseGuard';
import { useNavigate, useNavigation } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    wachtwoord: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response = await authService.login(formData);
    if(hasRestults(response)){
      console.log("Ik ben hier");
      navigate('/spellen');
    }
    
  };

  return (
    <div className="row w-100 justify-content-center">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <div className="card shadow p-4">
          <h3 className="text-center mb-4">Login</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">wachtwoord</label>
              <input
                type="password"
                className="form-control"
                name="wachtwoord"
                placeholder="Enter wachtwoord"
                value={formData.wachtwoord}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

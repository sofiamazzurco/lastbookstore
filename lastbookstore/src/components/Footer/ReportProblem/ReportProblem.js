import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './ReportProblem.css';

const ReportProblem = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    problem: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar cualquier lógica adicional, como enviar los datos a un servidor, guardarlos en una base de datos, etc.
    // Por ahora, mostraremos una notificación con los datos ingresados en el formulario
    toast.success(JSON.stringify(formData));
    // Luego, puedes reiniciar el formulario
    setFormData({
      name: '',
      email: '',
      problem: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="report-problem-container">
      <h1>Reportar problema</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="problem">Descripción del problema</label>
          <textarea
            id="problem"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <Button type="submit">Enviar</Button>
        </div>
      </form>
    </div>
  );
};

export default ReportProblem;

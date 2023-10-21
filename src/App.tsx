import { useEffect, useState } from "react";
import "./App.scss";

interface FormModel {
  nombre_mascota: string;
  edad: string;
  genero: string;
  dia_cita: string;
  nombre_dueño: string;
}

function App() {
  const [registrations, setRegistrations] = useState(
    "registers" in localStorage
      ? JSON.parse(localStorage.getItem("registers")!)
      : []
  );
  const [form, setForm] = useState<FormModel>({
    nombre_mascota: "",
    edad: "",
    genero: "",
    dia_cita: '',
    nombre_dueño: "",
  });
  const [validacion, setValidacion] = useState({
    nombre_mascota: false,
    edad: false,
    genero: false,
    dia_cita: false,
    nombre_dueño: false,
  });
  const [formSend, setFormSend] = useState(false)
  useEffect(() => {
    if (registrations.length > 0) {
      localStorage.setItem("registers", JSON.stringify(registrations));
    }
  }, [registrations]);

  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value ? e.target.value : null });
    setValidacion({ ...validacion, [e.target.name]: e.target.value ? true : false });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setFormSend(true);
    if (Object.values(validacion).every((key) => key === true)) {
      setRegistrations([...registrations, form]);
      setForm({
        nombre_mascota: "",
        edad: "",
        genero: "",
        dia_cita: "",
        nombre_dueño: "",
      });
      setValidacion({
        nombre_mascota: false,
        edad: false,
        genero: false,
        dia_cita: false,
        nombre_dueño: false,
      });
      setFormSend(false);
    } else {
      return;
    }
  };
  const deleteDate = (id: number) => {
    let toDeleteDate = [...registrations]
    toDeleteDate.splice(id, 1)
    setRegistrations(toDeleteDate)
    // localStorage.setItem("registers", JSON.stringify(toDeleteDate))
  }
  return (
    <div className="app">
      <form className="form-card" onSubmit={handleFormSubmit}>
        <h1>Agende su cita</h1>
        <div className="input-field">
          <label>
            Nombre de la mascota:
            <input
              type="text"
              name="nombre_mascota"
              placeholder="Pancho"
              value={form.nombre_mascota}
              onChange={handleInputChange}
            />
          </label>
          {(!validacion.nombre_mascota && formSend) && (
            <span className="error-label">
              Por favor ingresar nombre de la mascota
            </span>
          )}
        </div>

        <div className="input-field">
          <label>
            Edad:
            <input
              type="number"
              name="edad"
              placeholder="5"
              value={form.edad}
              onChange={handleInputChange}
            />
          </label>
          {(!validacion.edad && formSend) && (
            <span className="error-label">
              Por favor ingrese la edad de la mascota
            </span>
          )}
        </div>

        <div className="input-field">
          <label>
            Género:
            <input
              type="text"
              name="genero"
              placeholder="Macho, Hembra"
              value={form.genero}
              onChange={handleInputChange}
            />
          </label>
          {(!validacion.genero && formSend) && (
            <span className="error-label">
              Por favor ingrese el genero de la mascota
            </span>
          )}
        </div>

        <div className="input-field">
          <label>
            Fecha cita:
            <input
              type="date"
              name="dia_cita"
              value={form.dia_cita}
              onChange={handleInputChange}
            />
          </label>
          {(!validacion.dia_cita && formSend) && (
            <span className="error-label">
              Por favor ingrese el dia de la cita
            </span>
          )}
        </div>

        <div className="input-field">
          <label>
            Nombre dueño:
            <input
              type="text"
              name="nombre_dueño"
              placeholder="Jhon"
              value={form.nombre_dueño}
              onChange={handleInputChange}
            />
          </label>
          {(!validacion.nombre_dueño && formSend) && (
            <span className="error-label">
              Por favor ingrese el nombre del dueño
            </span>
          )}
        </div>

        <button type="submit">Registrar</button>
      </form>
      <h1 className="registrations-label">Citas actuales:</h1>
      {(registrations && registrations.length > 0) ? (
        <div className="registrations">
          {registrations.map((registration: any, i: number) => (
            <div className="registration-card" key={i}>
              <p onClick={() => {
                deleteDate(i);
              }} className="close">X</p>
              <h2>{registration.nombre_mascota}</h2>
              <p>
                <strong>Edad:⠀</strong>
                {registration.edad}
              </p>
              <p>
                <strong>Género:⠀</strong>
                {registration.genero}
              </p>
              <p>
                <strong>Fecha Cita:⠀</strong>
                {registration.dia_cita}
              </p>
              <p>
                <strong>Dueño:⠀</strong>
                {registration.nombre_dueño}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-registrations">
          <h2>No se han registrado citas</h2>
        </div>
      )}
    </div>
  );
}

export default App;

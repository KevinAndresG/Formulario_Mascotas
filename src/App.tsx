import { useEffect, useState } from "react";
import "./App.scss";

// interface FormModel {
//   nombre_mascota: string;
//   edad: string;
//   genero: string;
//   dia_cita: string;
//   nombre_dueno: string;
// }

function App() {
  const [registrations, setRegistrations] = useState(
    "registers" in localStorage
      ? JSON.parse(localStorage.getItem("registers")!)
      : []
  );
  const [form, setForm] = useState<any>({
    nombre_mascota: "",
    edad: "",
    genero: "",
    dia_cita: new Date().toISOString().substring(0, 10),
    nombre_dueno: "",
  });
  const [validacion, setValidacion] = useState({
    nombre_mascota: true,
    edad: true,
    genero: true,
    dia_cita: true,
    nombre_dueno: true,
  });
  useEffect(() => {
    if (registrations.length > 0) {
      // registrations.forEach((cita: any) => {
      //   if (Number(cita.edad.split(' ')[0])) {
      //     cita.edad = Number(cita.edad.split(' ')[0]);
      //   }
      //   setRegistrations([...registrations, cita]);
      // });
      localStorage.setItem("registers", JSON.stringify(registrations));
    }
  }, [registrations]);
  useEffect(() => {
    // console.log("This is - validaciones = ", validacion);
  }, [validacion]);

  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    let newObj: any = { ...validacion };
    for (let inp in form) {
      let string: string = inp;
      if (form[string] === "") {
        newObj[inp] = false;
        setValidacion(newObj);
        validateInputs(newObj);
      } else {
        newObj[inp] = true;
        setValidacion(newObj);
        validateInputs(newObj);
      }
      // setValidacion({ ...validacion, [inp]: inp.value !== '' });
    }
    // form.edad += ' Años'
    // console.log("This is - form = ", form);
    // console.log("This is - form.edad = ", form.edad);
  };
  const validateInputs = (obj: any) => {
    if (Object.values(obj).every((key) => key === true)) {
      setRegistrations([...registrations, form]);
      setForm({
        nombre_mascota: "",
        edad: "",
        genero: "",
        dia_cita: new Date().toISOString().substring(0, 10),
        nombre_dueno: "",
      });
      setValidacion({
        nombre_mascota: true,
        edad: true,
        genero: true,
        dia_cita: true,
        nombre_dueno: true,
      });
    } else {
      return;
    }
  };
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
          {!validacion.nombre_mascota && (
            <div className="error-label">
              Por favor ingresar nombre de la mascota
            </div>
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
          {!validacion.edad && (
            <div className="error-label">
              Por favor ingrese la edad de la mascota
            </div>
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
          {!validacion.genero && (
            <div className="error-label">
              Por favor ingrese el genero de la mascota
            </div>
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
          {!validacion.dia_cita && (
            <div className="error-label">
              Por favor ingrese el dia de la cita
            </div>
          )}
        </div>

        <div className="input-field">
          <label>
            Nombre dueño:
            <input
              type="text"
              name="nombre_dueno"
              placeholder="Jhon"
              value={form.nombre_dueno}
              onChange={handleInputChange}
            />
          </label>
          {!validacion.nombre_dueno && (
            <div className="error-label">
              Por favor ingrese el nombre del dueño
            </div>
          )}
        </div>

        <button type="submit">Registrar</button>
      </form>
      <h1 className="registrations-label">Citas actuales:</h1>
      <div className="registrations">
        {registrations.map((registration: any, i: number) => (
          <div className="registration-card" key={i}>
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
              {registration.nombre_dueno}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import './App.scss'

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
    dia_cita: "",
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
    let newObj: any = { ...validacion }
    for (let inp in form) {
      let string: string = inp
      if (form[string] === '') {
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
        dia_cita: "",
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
      return
    }
  }
  return (
    <div className="app">
      <form className="form-card" onSubmit={handleFormSubmit}>
        <label></label>
        <input
          type="text"
          name="nombre_mascota"
          placeholder="Nombre de la Mascota"
          value={form.nombre_mascota}
          onChange={handleInputChange}
        />
        {!validacion.nombre_mascota && (
          <div className="error-label">Por favor ingresar nombre de la mascota</div>
        )}

        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={form.edad}
          onChange={handleInputChange}
        />
        {!validacion.edad && (
          <div className="error-label">Por favor ingrese la edad de la mascota</div>
        )}

        <input
          type="text"
          name="genero"
          placeholder="Genero"
          value={form.genero}
          onChange={handleInputChange}
        />
        {!validacion.genero && (
          <div className="error-label">Por favor ingrese el genero de la mascota</div>
        )}

        <input
          type="date"
          name="dia_cita"
          placeholder="Dia de la Cita"
          value={form.dia_cita}
          onChange={handleInputChange}
        />
        {!validacion.dia_cita && (
          <div className="error-label">Por favor ingrese el dia de la cita</div>
        )}

        <input
          type="text"
          name="nombre_dueno"
          placeholder="Dueño de la Mascota"
          value={form.nombre_dueno}
          onChange={handleInputChange}
        />
        {!validacion.nombre_dueno && (
          <div className="error-label">Por favor ingrese el nombre del dueño</div>
        )}

        <button type="submit">Registrar</button>
      </form>
      {registrations.map((registration: any, i: number) => (
        <div className="registration-card" key={i}>
          <h2>{registration.nombre_mascota}</h2>
          <h4>{registration.edad}</h4>
          <p>{registration.genero}</p>
          <h3>{registration.dia_cita}</h3>
          <h4>{registration.nombre_dueno}</h4>
        </div>
      ))}
    </div>
  )
}

export default App

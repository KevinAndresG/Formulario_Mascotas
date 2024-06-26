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
  const [sortedRegistrations, setsortedRegistrations] = useState([]);
  const [form, setForm] = useState<FormModel>({
    nombre_mascota: "",
    edad: "",
    genero: "Macho",
    dia_cita: "",
    nombre_dueño: "",
  });
  const [validacion, setValidacion] = useState({
    nombre_mascota: false,
    edad: false,
    genero: true,
    dia_cita: false,
    nombre_dueño: false,
  });
  const [formSend, setFormSend] = useState(false);
  const compararFechas = (citaA: any, citaB: any) => {
    const fechaA: any = new Date(citaA.dia_cita);
    const fechaB: any = new Date(citaB.dia_cita);
    return fechaA - fechaB;
  };
  useEffect(() => {
    if (registrations.length >= 0) {
      localStorage.setItem("registers", JSON.stringify(registrations));
      let regs = [...registrations];
      const sortedRegs: any = regs.sort(compararFechas);
      setsortedRegistrations(sortedRegs);
    }
  }, [registrations]);

  const handleInputChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value ? e.target.value : null,
    });
    setValidacion({
      ...validacion,
      [e.target.name]: e.target.value ? true : false,
    });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setFormSend(true);
    if (Object.values(validacion).every((key) => key === true)) {
      setRegistrations([...registrations, form]);
      setForm({
        nombre_mascota: "",
        edad: "",
        genero: form.genero,
        dia_cita: "",
        nombre_dueño: "",
      });
      setValidacion({
        nombre_mascota: false,
        edad: false,
        genero: true,
        dia_cita: false,
        nombre_dueño: false,
      });
      setFormSend(false);
    } else {
      return;
    }
  };
  const deleteDate = (id: number) => {
    let toDeleteDate: any = [...sortedRegistrations];
    toDeleteDate.splice(id, 1);
    setRegistrations(toDeleteDate);
    setsortedRegistrations(toDeleteDate);
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
          {!validacion.nombre_mascota && formSend && (
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
          {!validacion.edad && formSend && (
            <span className="error-label">
              Por favor ingrese la edad de la mascota
            </span>
          )}
        </div>

        <div className="input-field">
          <label>
            Género:
            <label className="radioLabel" htmlFor="Macho">
              <input
                className="radio"
                type="radio"
                defaultChecked
                id="Macho"
                name="genero"
                value="Macho"
                onChange={handleInputChange}
              />
              Macho
            </label>
            <label className="radioLabel" htmlFor="Hembra">
              <input
                className="radio"
                type="radio"
                id="Hembra"
                name="genero"
                value="Hembra"
                onChange={handleInputChange}
              />
              Hembra
            </label>
          </label>
          {!validacion.genero && formSend && (
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
          {!validacion.dia_cita && formSend && (
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
          {!validacion.nombre_dueño && formSend && (
            <span className="error-label">
              Por favor ingrese el nombre del dueño
            </span>
          )}
        </div>

        <button type="submit">Registrar</button>
      </form>
      <h1 className="registrations-label">
        <p>Citas actuales</p>
        <p className="inner-text">
          se ordenan por la fecha más cercana a la mas lejana.
        </p>
      </h1>
      {sortedRegistrations && sortedRegistrations.length > 0 ? (
        <div className="registrations">
          {sortedRegistrations
            .sort((a: any, b: any) => a.dia_cita - b.dia_cita)
            .map((registration: any, i: number) => (
              <div className="registration-card" key={i}>
                <p
                  onClick={() => {
                    deleteDate(i);
                  }}
                  className="close"
                >
                  X
                </p>
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

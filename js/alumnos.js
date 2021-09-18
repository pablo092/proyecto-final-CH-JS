// Clase 15 y 16

// CLASE ALUMNO
class Alumno {
  //CONSTRUCTOR DE CLASE ALUMNO
  constructor(data) {
    this.id = data.id;
    this.nombre = data.nombre.toUpperCase();
    this.apellido = data.apellido.toUpperCase();
    this.notas = data.notas;
    this.aprobado = false;
    this.notaFinal = 0.0;
    this.promedio();
  }
  //MÉTODO PARA CALCULAR PROMEDIO
  promedio() {
    const sum = this.notas.reduce((a, b) => a + b, 0);
    const promedio = sum / this.notas.length || 0;

    if (promedio >= 7) {
      this.aprobado = true;
    }
    this.notaFinal = promedio;
    return promedio;
  }
}

// MODELO ALUMNO
class AlumnoModel {
  //CONSTRUCTOR DEL MODELO ALUMNO
  constructor() {
    //OBTENEMOS EL ARRAY DE ALUMNOS PARSEANDO DESDE EL JSON SI EXISTE
    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    //USAMOS MAP PARA CREAR UN NUEVO ARRAY DE OBJETOS DE TIPO ALUMNO
    this.alumnos = alumnos.map((alumno) => new Alumno(alumno));
  }
  //MÈTODO PARA GUARDAR EL ARRAY DE ALUMNOS EN STORAGE
  guardarAlumnos() {
    localStorage.setItem("alumnos", JSON.stringify(this.alumnos));
  }
  //MÊTODO PARA AGREGAR UN ALUMNO AL ARRAY DE ALUMNOS
  agregarAlumno(alumno) {
    this.alumnos.push(new Alumno(alumno));
    this.guardarAlumnos();
  }
  //MÊTODO PARA ELIMINAR UN ALUMNO DEL ARRAY DE ALUMNOS
  eliminarAlumno(id) {
    this.alumnos = this.alumnos.filter((alumno) => alumno.id !== id);
    this.guardarAlumnos();
  }
  //MÊTODO PARA BUSCAR UN ALUMNO DEL ARRAY DE ALUMNOS
  buscarAlumno(id) {
    return this.alumnos.find((alumno) => alumno.id === id);
  }
}

// VIEW ALUMNO
class AlumnoView {
  //MÊTODO PARA CREAR LA VISTA DE AGREGAR ALUMNO
  agregarAlumno(padre, callback) {
    $(padre).html(`
            <section>
                <div class="col-sm-6 col-sm-offset-3">
                    <h1>Formulario de Alumnos</h1>
                    
                    <input
                        class="form-control"
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Fernando"
                        required="required"
                        />
                    
                    <input
                        class="form-control"
                        type="text"
                        id="apellido"
                        name="apellido"
                        placeholder="Espinoza"
                        required="required"
                        />
                <!-- Notas -->
                    <input
                        class="form-control"
                        type="number"
                        min="0"
                        max="10"
                        id="trimestre1"
                        name="trimestre1"
                        required="required"
                        />
                    <input
                        class="form-control"
                        type="number"
                        min="0"
                        max="10"
                        id="trimestre2"
                        name="trimestre2"
                        required="required"
                        />
                    
                    <input
                        class="form-control"
                        type="number"
                        min="0"
                        max="10"
                        id="trimestre3"
                        name="trimestre3"
                        required="required"
                        />
                    <button class="btn btn-success" id="btnAgregarAlumno">AGREGAR</button>
                </div>
            </section>
        `);
    $("#btnAgregarAlumno").click(callback);
  }
  //MÊTODO PARA CREAR LA VISTA DE LISTADO DE ALUMNOS
  listarAlumnos(padre, data) {
    
    let html = `<button class="btn btn-success" id="clear">Borrar Lista</button>
                <div class="col-sm-6 col-sm-offset-3">
                    <div class="col-12">
                        <h1 class="text-center">LISTADO DE ALUMNOS</h1>
                        <table id="table">
                            <tr>
                            <td class="col-1">#</td>
                            <th class="col-2">Nombre</th>
                            <th class="col-2">Apellido</th>
                            <th class="col-2">Nota final</th>
                            </tr>`;
    for (const alumno of data) {
      html += `<tr><td>${alumno.id}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.notaFinal}</td></tr>`;
    }
    html += `
            </table>
        </div>
    </div>`;
    $(padre).html(html);
  }
  //MÊTODO PARA CREAR LA VISTA DE BUSQUEDA DE ALUMNO
  buscarAlumno(padre, callback) {
    $(padre).html(
        `<div class="col-sm-6 col-sm-offset-3">
            <div class="col-12">
                <h1 class="text-center">BUSCAR ALUMNO</h1>
                <section>
                    <input type ="number">
                    <button class="btn btn-success" id="btnBuscarAlumno">Buscar</button>
                </section>
            </div>
        </div>`);
    $("#btnBuscarAlumno").click(callback);
  }
}
// CONTROLLER ALUMNO
class AlumnoController {
  //CONSTRUCTOR DEL CONTROLADOR ASOCIANDO UN MODELO Y VISTA
  constructor(alumnoModel, alumnoView) {
    this.alumnoModel = alumnoModel;
    this.alumnoView = alumnoView;
  }
  //MÊTODO PARA GENERAR CONSTROLAR LA VISTA, EL MODELO Y EL EVENTO AL AGREGAR UN ALUMNO
  agregar(app) {
    this.alumnoView.agregarAlumno(app, (event) => {
      let hijos = $(event.target).parent().children();
      this.alumnoModel.agregarAlumno({
        id: this.alumnoModel.alumnos.length + 1,
        nombre: String(hijos[1].value),
        apellido: String(hijos[2].value),
        notas: [Number(hijos[3].value), Number(hijos[4].value), Number(hijos[5].value)],
      });
    });
  }
  //MÊTODO PARA GENERAR CONSTROLAR LA VISTA, EL MODELO Y EL EVENTO AL LISTAR ALUMNOS
  listar(app) {
    this.alumnoView.listarAlumnos(app, this.alumnoModel.alumnos);
  }
  //MÊTODO PARA GENERAR CONSTROLAR LA VISTA, EL MODELO Y EL EVENTO AL BUSCAR UN ALUMNO
  buscar(app) {
    this.alumnoView.buscarAlumno(app, (event) => {
      let hijos = $(event.target).parent().children();
      let id = parseInt(hijos[0].value);
      let encontrado = this.alumnoModel.buscarAlumno(id);
      console.log(encontrado);
    });
  }
}
//COMPONENTE A EMPLEAR CUANDO NO SE ENCUENTRA LA PAGINA SOLICITADA
const ErrorComponent = (padre) => {
  $(padre).html("<h2>Error 404</h2>");
};

$(document).ready(function () {
    $("#clear").click(function () {
        localStorage.clear()
        location.reload()
    });
});
import { Component, OnInit } from '@angular/core';

interface Proyecto {
  name: string;
  description: string;
  id: number;
  spaces: { spaceName: string }[]
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  proyectos: Proyecto[] = [];
  modalVisible: boolean = false;
  projectEditing: Proyecto = {
    name: '',
    description: '',
    id: 0,
    spaces: [{
      spaceName: '',
    }]
  };

  ngOnInit() {
    this.obtenerProyectos();
  }

  obtenerProyectos() { //Simulo el listado de proyecto que me devuelve
    this.proyectos = [
      { name: 'Proyecto 1', description: 'Descripción del proyecto 1', id: 0, spaces: [{ spaceName: 'Espacio 1' }] }
    ];
  }
  openModal(proyecto: Proyecto) {
    this.projectEditing = proyecto;
    this.modalVisible = true;
  }
  closeModal() {
    this.modalVisible = false;
    this.modalNewProjectVisible = false;
  }
  editandoTexto: boolean = false;
  activarEdicion() {
    this.editandoTexto = true;
  }
  guardarTexto() {
    this.editandoTexto = false;
  }
  //Funciones para el Modal de crear un nuevo proyecto
  modalNewProjectVisible: boolean = false;
  textoTituloEditable: string = 'Nuevo Proyecto';
  textoDescripcionEditable: string = 'Descripcion de este proyecto';
  textoNombreNuevoEspacio: string = 'Espacio';

  openModalCreateProject() {
    if (this.proyectos.length < 3) {
      this.modalNewProjectVisible = true;
    }
  }

  crearProyecto() {
    const nuevoProyecto: Proyecto = {
      name: this.textoTituloEditable,
      description: this.textoDescripcionEditable,
      id: this.proyectos.length,
      spaces: [{ spaceName: this.textoNombreNuevoEspacio }]
    };
    this.proyectos.push(nuevoProyecto);
    this.editandoTexto = false;

    this.textoTituloEditable = 'Nuevo Proyecto' //Reset de los valores para cuando se cree otro proyecto
    this.textoDescripcionEditable = 'Descripcion de este proyecto';
    this.closeModal();
  }
  //Funciones para editar proyecto ya creado.
  borrarProyecto(id: number) {
    const index = this.proyectos.findIndex(proyecto => proyecto.id === id);
    if (index !== -1) {
      this.proyectos.splice(index, 1);
    }
    this.closeModal();
  }
  guardarProyecto() {
    const index = this.proyectos.findIndex(proyecto => proyecto.id === this.projectEditing.id);
    if (index !== -1) {
      this.proyectos[index] = this.projectEditing;
    }
    this.closeModal();
  }
}

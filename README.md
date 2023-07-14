<style>
    #ok{
        color: rgb(0, 255, 0);
    }
</style>


# api-ninja-projects

## Workspace endpoints

### Listar proyectos:
### URL: {api.url}/workspace 
#### Request: GET

Este endpoint lista todos los projectos. La respuesta devuelta es una lista de objetos con <strong>status_code: <span id="ok">200</span></strong>

Respuesta:
```json
[
    {
        "id": 1,
        "nameWorkspace": "test project",
        "description": "test",
        "userSet": [
            {
                "id": 1,
                "email": "pablo@pablo.com",
                "name": "pablo",
                "password": "1234",
                "subscription": {
                    "id": 1,
                    "nameSubscription": "basic"
                }
            }
        ],
        "spaceSet": [
            {
                "id": 1,
                "nameSpace": "banckend",
                "description": "test",
                "workspace": {
                    "id": 1,
                    "nameWorkspace": "test project",
                    "description": "test"
                }
            },
            {
                "id": 2,
                "nameSpace": "frontend",
                "description": "test",
                "workspace": {
                    "id": 1,
                    "nameWorkspace": "test project",
                    "description": "test"
                }
            },
            {
                "id": 3,
                "nameSpace": "ux/ui",
                "description": "Descripción del espacio",
                "workspace": {
                    "id": 1,
                    "nameWorkspace": "test project",
                    "description": "test"
                }
            }
        ]
    },
    {
        "id": 3,
        "nameWorkspace": "test-created",
        "description": "description test 3",
        "userSet": [
            {
                "id": 1,
                "email": "pablo@pablo.com",
                "name": "pablo",
                "password": "1234",
                "subscription": {
                    "id": 1,
                    "nameSubscription": "basic"
                }
            }
        ],
        "spaceSet": []
    }
]
```

Se puede observar que en `userSet` nos devuelve una lista de los usuarios que comparten el proyecto y a su vez una lista con todos los espacios contenidos dentro de `spaceSet`.

### Crear proyecto:
### URL: {api.url}/workspace 
#### Request: POST

Este endpoint nos permite la creacion de un projecto vacío, el mismo debe recibir la petición post acompañada del siguiente objeto:

Body:
```json
{
    "nameWorkspace": "test-created",
    "description": "description test 3"
}
```

el mismo al ser creado devolvera <strong>status_code: <span id="ok">201</span></strong> con el siguiente json.

Respuesta:
```json
{
    "id": 4,
    "nameWorkspace": "test-created",
    "description": "description test 3",
    "userSet": [],
    "spaceSet": null
}
```

### Actualizar proyecto:
### URL: {api.url}/workspace/{id_workspace} 
#### Request: PUT

Para actualizar projecto se debe enviar la peticion identificando el mismo con su respectivo id pasado como parametro en `{id_workspace}` enviando el mismo json para crear:

Body:
```json
{
    "nameWorkspace": "nuevo nombre",
    "description": "nueva descripcion"
}
```
Al confirmar que fue actualizado retornara el <strong>status_code: <span id="ok">200</span></strong> con un objeto json del proyecto modificado.

Respuesta:

```json
{
    "id": 3,
    "nameWorkspace": "nuevo nombre",
    "description": "nueva description",
    "userSet": [],
    "spaceSet": []
}

```

### Eliminar proyecto:
### URL: {api.url}/workspace/{id_workspace} 
#### Request: DELETE

Al momento de querer eliminar un proyecto se debe enviar la peticion identificando el mismo con su respectivo id pasado como parametro en `{id_workspace}` devolviendo como respuesta el <strong>status_code: <span id="ok">204</span></strong>.

### Agregar usuario al proyecto:
### URL: {api.url}/workspace/{id_workspace}/users/{id_user} 
#### Request: POST

Con este endpoint se agrega el usuario al proyecto, indicar en `{id_workspace}` el proyecto objetivo e indicar un usuario registrado en `{id_user}`, se recibira un mensaje de exito y el <strong>status_code: <span id="ok">200</span></strong>.

Respuesta:

```
User added to workspace successfully
```

### Eliminar usuario al proyecto:
### URL: {api.url}/workspace/{id_workspace}/users/{id_user} 
#### Request: POST

Con este endpoint se elimina el usuario en el proyecto, indicar en `{id_workspace}` el proyecto objetivo e indicar un usuario en `{id_user}`, se recibira un mensaje de exito y el <strong>status_code: <span id="ok">200</span></strong>.

Respuesta:

```
User removed from workspace successfully
```
<hr>

## Space endpoints

### Listar spaces:
### URL: {api.url}/space/workspace/{id_workspace} 
#### Request: GET

Este endpoint se encarga mostrar una lista de todos los espacios contenidos dentro de un proyecto indicado como parametro en `{id_workspace}`, se recibe como respuesta el <strong>status_code: <span id="ok">200</span></strong> y el json con la lista de todos los espacios.

respuesta:

```json
[
    {
        "id": 1,
        "nameSpace": "banckend",
        "description": "test",
        "workspace": {
            "id": 1,
            "nameWorkspace": "test project",
            "description": "test"
        },
        "tasks": [
            {
                "id": 1,
                "nameTask": "test task",
                "description": "test",
                "dueDate": null,
                "space": {
                    "id": 1,
                    "nameSpace": "banckend",
                    "description": "test",
                    "workspace": {
                        "id": 1,
                        "nameWorkspace": "test project",
                        "description": "test"
                    }
                },
                "priorityTask": {
                    "id": 1,
                    "namePriority": "normal"
                }
            },
            {
                "id": 2,
                "nameTask": "test task 2",
                "description": "test",
                "dueDate": null,
                "space": {
                    "id": 1,
                    "nameSpace": "banckend",
                    "description": "test",
                    "workspace": {
                        "id": 1,
                        "nameWorkspace": "test project",
                        "description": "test"
                    }
                },
                "priorityTask": {
                    "id": 1,
                    "namePriority": "normal"
                }
            },
        ]
    },
    {
        "id": 2,
        "nameSpace": "frontend",
        "description": "test",
        "workspace": {
            "id": 1,
            "nameWorkspace": "test project",
            "description": "test"
        },
        "tasks": []
    },
    {
        "id": 3,
        "nameSpace": "ux/ui",
        "description": "Descripción del espacio",
        "workspace": {
            "id": 1,
            "nameWorkspace": "test project",
            "description": "test"
        },
        "tasks": []
    }
]
```
Se puede observar que en `tasks` nos devuelve una lista de las tareas que comparten el espacio.


### Crear spaces:
### URL: {api.url}/space 
#### Request: POST

Este endpoint nos permite la creacion de un espacio vacío, el mismo debe recibir la petición post acompañada del siguiente objeto:

Body:
```json
{
  "nameSpace": "ux/ui",
  "description": "Descripción del espacio",
  "workspace": {
    "id": 1
  }
}
```
se debe indicar dentro de workspace el `{id}` del mismo para asociar el espacio correctamente, al ser creado devolvera <strong>status_code: <span id="ok">201</span></strong> con el siguiente json.

Respuesta:
```json
{
    "id": 3,
    "nameSpace": "ux/ui",
    "description": "Descripción del espacio",
    "workspace": {
        "id": 1,
        "nameWorkspace": "test project",
        "description": "test"
    },
    "tasks": []
}
```

### Actualizar space:
### URL: {api.url}/space/{id_space} 
#### Request: PUT

Para actualizar un espacio se debe enviar la peticion identificando el mismo con su respectivo id pasado como parametro en `{id_space}` enviando el json siguiente:

Body:
```json
{
    "nameSpace": "Nuevo nombre",
    "description": "Nueva descripción del espacio"
}
```
Al confirmar que fue actualizado retornara el <strong>status_code: <span id="ok">200</span></strong> con un objeto json del espacio modificado.

```json
{
    "id": 1,
    "nameSpace": "Nuevo nombre",
    "description": "Nueva descripción del espacio",
    "workspace": {
        "id": 1,
        "nameWorkspace": "test project",
        "description": "test"
    },
    "tasks": []
}
```

### Eliminar space:
### URL: {api.url}/space/{id_space} 
#### Request: DELETE

Al momento de querer eliminar un espacio se debe enviar la peticion identificando el mismo con su respectivo id pasado como parametro en `{id_space}`, se devolverá como respuesta el <strong>status_code: <span id="ok">200</span></strong> y el mensaje de exito.

```
Space deleted successfully
```
<hr>

## Task endpoints

### Listar tasks:
### URL: {api.url}/task/space/{id_space} 
#### Request: GET

Este endpoint se encarga mostrar una lista de todas las tareas dentro de un espacio indicado como parametro en `{id_space}`, se recibe como respuesta el <strong>status_code: <span id="ok">200</span></strong> y el json con la lista de todas las tareas.

```json
{
    "content": [
        {
            "id": 4,
            "nameTask": "Nombre de la tarea frontend",
            "description": null,
            "dueDate": null,
            "priorityTask": null,
            "space": {
                "id": 2,
                "nameSpace": "frontend",
                "description": "test",
                "workspace": {
                    "id": 1,
                    "nameWorkspace": "test project",
                    "description": "test"
                }
            },
            "userSet": []
        },
        {
            "id": 5,
            "nameTask": "Nombre de otra tarea frontend",
            "description": null,
            "dueDate": null,
            "priorityTask": null,
            "space": {
                "id": 2,
                "nameSpace": "frontend",
                "description": "test",
                "workspace": {
                    "id": 1,
                    "nameWorkspace": "test project",
                    "description": "test"
                }
            },
            "userSet": []
        },
        {
            "id": 6,
            "nameTask": "Nombre de otra tarea frontend test",
            "description": null,
            "dueDate": null,
            "priorityTask": null,
            "space": {
                "id": 2,
                "nameSpace": "frontend",
                "description": "test",
                "workspace": {
                    "id": 1,
                    "nameWorkspace": "test project",
                    "description": "test"
                }
            },
            "userSet": []
        }
    ],
    "pageable": {
        "sort": {
            "empty": true,
            "sorted": false,
            "unsorted": true
        },
        "offset": 0,
        "pageNumber": 0,
        "pageSize": 20,
        "paged": true,
        "unpaged": false
    },
    "totalPages": 1,
    "totalElements": 3,
    "last": true,
    "size": 20,
    "number": 0,
    "sort": {
        "empty": true,
        "sorted": false,
        "unsorted": true
    },
    "first": true,
    "numberOfElements": 3,
    "empty": false
}
```

La lista que se recibe es de tipo `PAGE` esto quiere decir que se pueden adicionar mas parametros a la url de la petición logrando filtrar mejor las tareas ya que las mismas pueden ser muchas, por defecto se muestran 20 tareas y no tiene un orden ademas de otras caracteristicas por defecto.

Incluyo esta lista de parametros adicionales que recibe este endpoint:
```js
"sort": Este campo indica información sobre el ordenamiento de los elementos en la página. Puede contener propiedades como "empty" (indica si se proporcionó algún criterio de ordenamiento), "sorted" (indica si los elementos están ordenados), "unsorted" (indica si los elementos no están ordenados).

"offset": Este campo indica el desplazamiento (offset) de los elementos actuales en relación con todos los elementos disponibles. Puede ser útil si hay varias páginas de resultados y necesitas realizar una solicitud para obtener la siguiente página.

"pageNumber": Este campo indica el número de página actual. Las páginas suelen comenzar desde 0 o 1, dependiendo de la convención utilizada.

"pageSize": Este campo indica el número máximo de elementos que se mostrarán en cada página.

"paged": Este campo indica si los resultados están paginados.

"unpaged": Este campo indica si los resultados no están paginados.

"totalPages": Este campo indica el número total de páginas disponibles.

"totalElements": Este campo indica el número total de elementos en todos los resultados.

"last": Este campo indica si la página actual es la última página.

"size": Este campo indica el tamaño de la página actual.

"number": Este campo indica el número de la página actual.

"first": Este campo indica si la página actual es la primera página.

"numberOfElements": Este campo indica el número de elementos en la página actual.

"empty": Este campo indica si la página actual está vacía.
```

Aca dejo como ejemplo de como usar estos parametros:

Obtener la primera página con un tamaño de página de 10: <br>
`{api_url}/task/space/2?page=0&size=10`

Obtener la segunda página con un tamaño de página de 20: <br>
`{api_url}/task/space/2?page=1&size=20`

Ordenar los elementos por nombre de tarea en orden ascendente: <br>
`{api_url}/task/space/2?sort=nameTask,asc`

Obtener la tercera página con un tamaño de página de 15 y ordenar por fecha de vencimiento en orden descendente: <br>
`{api_url}/task/space/2?page=2&size=15&sort=dueDate,desc`


### Crear spaces:
### URL: {api.url}/task 
#### Request: POST

Este endpoint nos permite la creacion de una tarea, el mismo debe recibir la petición post acompañada del siguiente objeto:

Body:
```json
{
  "nameTask": "Nombre de tarea",
  "space": {
    "id": 2
  }
}
```
se debe indicar dentro de space el `{id}` del mismo para asociar la tarea correctamente, al ser creado devolvera <strong>status_code: <span id="ok">201</span></strong> con el siguiente json.

Respuesta:

```json
{
    "id": 6,
    "nameTask": "Nombre de tarea",
    "description": null,
    "dueDate": null,
    "priorityTask": null,
    "space": {
        "id": 2,
        "nameSpace": "frontend",
        "description": "test",
        "workspace": {
            "id": 1,
            "nameWorkspace": "test project",
            "description": "test"
        }
    },
    "userSet": []
}
```

### Actualizar tarea:
### URL: {api.url}/space/{id_task} 
#### Request: PUT

Para actualizar una tarea se debe enviar la peticion identificando la mismo con su respectivo id pasado como parametro en `{id_task}` enviando el json siguiente:

Body:
```json
{
    "nameTask": "Nuevo nombre",
    "description": "Nueva descripcion",
    "dueDate": "dd/mm/yyyy",
    "priorityTask": 1
}
```
Al confirmar que fue actualizado retornara el <strong>status_code: <span id="ok">200</span></strong> con un objeto json de la tarea modificada.

### Eliminar task:
### URL: {api.url}/task/{id_task} 
#### Request: DELETE

Al momento de querer eliminar una tarea se debe enviar la peticion identificando la misma con su respectivo `id` pasado como parametro en `{id_task}`, se devolverá como respuesta el <strong>status_code: <span id="ok">200</span></strong> y el mensaje de exito.

```
Task deleted successfully
```

### Agregar usuario a una tarea:
### URL: {api.url}/task/{id_task}/users/{id_user} 
#### Request: POST

Con este endpoint se agrega el usuario a la tarea, indicar en `{id_task}` la tarea objetivo e indicar un usuario registrado en `{id_user}`, se recibira un mensaje de exito y el <strong>status_code: <span id="ok">200</span></strong>.

Respuesta:

```
User added to task successfully
```

### Eliminar usuario de task:
### URL: {api.url}/task/{id_task}/users/{id_user} 
#### Request: POST

Con este endpoint se elimina el usuario en la tarea, indicar en `{id_task}` la tarea objetivo e indicar un usuario en `{id_user}`, se recibira un mensaje de exito y el <strong>status_code: <span id="ok">200</span></strong>.

Respuesta:

```
User removed from task successfully
```
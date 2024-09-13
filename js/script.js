// Función principal para manejar los clics en el nivel 0
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('#nivel0 .box').forEach(function(element) {
        element.addEventListener('click', function() {
            const group = element.dataset.group; // Obtener el grupo (estrategico, operacional, soporte)
            console.log(`Cargando nivel 1 para el grupo: ${group}`);
            loadLevel(group, 'nivel1', `html/nivel1/${group}-nivel1.html`); // Cargar el nivel 1 del grupo seleccionado
        });
    });
});

// Función para manejar los clics en el nivel 2 y cargar el nivel 3 solo si el archivo existe
function handleLevel2Click(group) {
    document.querySelectorAll('.sub-level .box').forEach(function(element) {
        element.addEventListener('click', function() {
            const subProcess = element.dataset.subprocess; // Obtener el subproceso completo
            console.log(`Clic en box de nivel 2 del grupo ${group} con subproceso: ${subProcess}`);
            
            // Construir la ruta completa del archivo de nivel 3
            const level3File = `html/nivel3/${group}/${group}-nivel3-${subProcess}.html`;
            console.log(`Intentando cargar archivo de nivel 3: ${level3File}`);
    
            // Verificar si el archivo de nivel 3 existe
            fetch(level3File, { method: 'HEAD' }) // Usamos HEAD para verificar si el archivo existe
                .then(response => {
                    if (response.ok) {
                        console.log(`Archivo de nivel 3 encontrado: ${level3File}`);
                        loadLevel(group, 'nivel3', level3File); // Cargar el nivel 3 con la ruta completa
                    } else {
                        console.log(`Archivo de nivel 3 no encontrado. Verifica la ruta o si está creado.`);
                    }
                })
                .catch(error => {
                    console.error(`Error al verificar el archivo de nivel 3: ${level3File}`, error);
                });
        });
    });
}

// Función para cargar HTMLs de niveles
function loadLevel(group, level, filePath) {
    if (!filePath) {
        throw new Error('Ruta del archivo no válida');
    }

    // Mostrar la ruta generada en la consola para depuración
    console.log(`Intentando cargar archivo: ${filePath}`);

    // Ocultar el nivel 0 si se está cargando un nuevo nivel
    if (level === 'nivel1') {
        document.getElementById('nivel0').style.display = 'none'; // Ocultar el nivel 0
    }

    // Usar fetch para cargar el archivo HTML dentro del contenedor level-container
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Archivo no encontrado: ' + filePath);
            }
            return response.text();
        })
        .then(data => {
            // Cargar el contenido en el contenedor
            document.getElementById('level-container').innerHTML = data;

            // Asignar eventos dependiendo del nivel cargado
            if (level === 'nivel1') {
                handleLevel1Click(group); // Asignar los eventos a los boxes de nivel 1
            } else if (level === 'nivel2') {
                handleLevel2Click(group); // Asignar los eventos a los boxes de nivel 2
            }
        })
        .catch(error => console.error('Error cargando el nivel:', error));
}

// Función para manejar los clics en el nivel 1
function handleLevel1Click(group) {
    document.querySelectorAll('.sub-level .box').forEach(function(element) {
        element.addEventListener('click', function() {
            const subProcess = element.dataset.subprocess; // Obtener el subproceso completo
            console.log(`Clic en box de nivel 1 del grupo ${group} con subproceso: ${subProcess}`);
            
            const filePath = `html/nivel2/${group}/${group}-nivel2-${subProcess}.html`;
            console.log(`Intentando cargar archivo de nivel 2: ${filePath}`);
            loadLevel(group, 'nivel2', filePath); // Cargar el nivel 2 basado en el subproceso completo
        });
    });
}

// Función para regresar al nivel 0
function goBackToLevel0() {
    document.getElementById('level-container').innerHTML = ''; // Limpiar el contenedor
    document.getElementById('nivel0').style.display = 'flex'; // Mostrar el nivel 0 nuevamente
}

// Función para regresar al nivel 1, dependiendo del grupo (estratégico, operacional, soporte)
function goBackToLevel1() {
    const currentLevel = document.querySelector('.sub-level').id;
    let group = '';
    if (currentLevel.includes('estrategico')) {
        group = 'estrategico';
    } else if (currentLevel.includes('operacional')) {
        group = 'operacional';
    } else if (currentLevel.includes('soporte')) {
        group = 'soporte';
    }

    loadLevel(group, 'nivel1', `html/nivel1/${group}-nivel1.html`); // Cargar el nivel 1 del grupo correspondiente
}

// Mapa de relaciones entre los subprocesos del nivel 3 y sus archivos de nivel 2 correspondientes
const subProcessToLevel2FileMapping = {

//Estratégico

    //difusion participacion
    'gestion-participacion': 'difusion-participacion',
    'solicitudes-ciudadanas': 'difusion-participacion',
    'formacion-ciudadana': 'difusion-participacion',
    //innovacion sustentabilidad
    'cambio-climatico': 'innovacion-sustentabilidad',
    'innovacion-tecnologias': 'innovacion-sustentabilidad',
    'cambio-climatico': 'innovacion-sustentabilidad',
    'gestion-desastres': 'innovacion-sustentabilidad',
    'construccion-sustentable': 'innovacion-sustentabilidad',
    //modernizacion de la gestion
    'gestion-modernizacion': 'modernizacion-gestion',
    //gestion estratégica
    'planificacion-estrategica': 'gestion-estrategica',
    'formulacion-presupuestaria': 'gestion-estrategica',
    'enfoque-derechos': 'gestion-estrategica',
    'control-gestion': 'gestion-estrategica',
    //coordinacion con otros organismos
    'gestion-intersectorial': 'coordinacion-organismos',
    //supervision interna
    'procedimientos-administrativos': 'supervision-interna',
    'auditorias-internas': 'supervision-interna',

//Operacional 

    //administracion bienes
    'administracion-vivienda': 'administracion-bienes',
    //aseguramiento calidad
    'supervisacion-tecnica': 'aseguramiento-calidad',
    //gestion instrumentos
    'gestion-iniciativas': 'gestion-instrumentos',
    'postulacion':'gestion-instrumentos',
    'seleccion': 'gestion-instrumentos',
    'adquisiciones':'gestion-instrumentos',
    'gestion-ejecucion':'gestion-instrumentos',
    'post-entrega':'gestion-instrumentos',
    //planificacion gestion
    'planificacion-proyectos':'planificacion-gestion',
    'gestion-suelos':'planificacion-gestion',
    //planificacion operativa
    'informacion-territorial':'planificacion-operativa',

//soporte

    //gestion de la comunicación
    'medios-comunicacion': 'gestion-comunicacion',
    'comunicaciones-internas': 'gestion-comunicacion',
    //gestion juridica
    'actos-administrativos': 'gestion-juridica',
    'asesoria-actos': 'gestion-juridica',
    'gestion-judicial': 'gestion-juridica',
    'gestion-sumarios': 'gestion-juridica',
    //gestion personas
    'gestion-desarrollo': 'gestion-personas',
    'gestion-bienestar': 'gestion-personas',
    'gestion-bienes': 'gestion-personas',
    //gestion presupuestaria
    'gestion-presupuestaria':'gestion-presupuestaria',
    'gestion-pagos':'gestion-presupuestaria',
    'gestion-contable':'gestion-presupuestaria',
    //gestion tic
    'soluciones-ti':'gestion-tic',
    'soporte-ti':'gestion-tic',
    
};

function goBackToLevel2() {
    const currentLevel = document.querySelector('.sub-level').id;
    let group = '';
    let subProcess = '';

    // Detectar el grupo y subproceso basado en el nivel actual
    if (currentLevel.includes('estrategico')) {
        group = 'estrategico';
        subProcess = currentLevel.split('-nivel3-')[1];
    } else if (currentLevel.includes('operacional')) {
        group = 'operacional';
        subProcess = currentLevel.split('-nivel3-')[1];
    } else if (currentLevel.includes('soporte')) {
        group = 'soporte';
        subProcess = currentLevel.split('-nivel3-')[1];
    }

    // Verificar que se detectó el subproceso correcto
    console.log(`Volviendo al nivel 2 del grupo: ${group}, subproceso: ${subProcess}`);

    // Verificar si el subproceso tiene un mapeo correspondiente
    const mappedSubProcess = subProcessToLevel2FileMapping[subProcess];
    
    if (!mappedSubProcess) {
        console.error(`Error: No se encontró mapeo para el subproceso: ${subProcess}`);
        return; // Salir de la función si no hay mapeo
    }

    const filePath = `html/nivel2/${group}/${group}-nivel2-${mappedSubProcess}.html`;
    console.log(`Cargando archivo de nivel 2 desde la ruta: ${filePath}`);

    // Cargar el nivel 2 con la ruta correcta
    loadLevel(group, 'nivel2', filePath);
}

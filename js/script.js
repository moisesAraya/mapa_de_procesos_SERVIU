// Función principal para manejar los clics en el nivel 0
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('#nivel0 .box').forEach(function(element) {
        element.addEventListener('click', function() {
            const group = element.dataset.group; // Obtener el grupo (estrategico, operacional, soporte)
            console.log(`Cargando nivel 1 para el grupo: ${group}`);
            loadLevel(group, 'nivel1', `html/nivel1/${group}-nivel1.html`); // Cargar el nivel 1 del grupo seleccionado
            toggleNavigationIcons(true, group); // Mostrar los iconos de navegación (flecha y casa) y pasar el grupo
        });
    });

    // Asignar funcionalidad al ícono de inicio (home-button)
    document.getElementById('home-button').addEventListener('click', function() {
        goBackToLevel0(); // Ir al nivel 0 (inicio) cuando se haga clic en la casa
    });

    // Asignar funcionalidad al ícono de volver (back-button)
    document.getElementById('back-button').addEventListener('click', function() {
        handleBackButton(); // Llamamos a la función general que maneja el botón de volver
    });

    // Ocultar los íconos de navegación inicialmente (en nivel 0)
    toggleNavigationIcons(false);
});

function toggleTitle(show) {
    const titleElement = document.getElementById('nivel0-title');
    if (show) {
        titleElement.style.display = 'flex';  // Mostrar el título en el nivel 0
    } else {
        titleElement.style.display = 'none';  // Ocultar el título en otros niveles
    }
}


// Función general para manejar el botón de volver
function handleBackButton() {
    const currentLevelElement = document.querySelector('.sub-level');
    
    if (!currentLevelElement) {
        return;
    }

    const currentLevel = currentLevelElement.id;
    if (currentLevel.includes('nivel3')) {
        goBackToLevel2(); // Si estamos en el nivel 3, regresar al nivel 2
    } else if (currentLevel.includes('nivel2')) {
        goBackToLevel1(); // Si estamos en el nivel 2, regresar al nivel 1
    } else if (currentLevel.includes('nivel1')) {
        goBackToLevel0(); // Si estamos en el nivel 1, regresar al nivel 0
    }
}

// Función para manejar los clics en el nivel 2 y cargar el nivel 3 solo si el archivo existe
function handleLevel2Click(group) {
    document.querySelectorAll('.sub-level .box').forEach(function(element) {
        element.addEventListener('click', function() {
            const subProcess = element.dataset.subprocess; // Obtener el subproceso completo
            console.log(`Clic en box de nivel 2 del grupo ${group} con subproceso: ${subProcess}`);
            
            const level3File = `html/nivel3/${group}/${group}-nivel3-${subProcess}.html`;
            console.log(`Intentando cargar archivo de nivel 3: ${level3File}`);

            fetch(level3File, { method: 'HEAD' }) 
                .then(response => {
                    if (response.ok) {
                        console.log(`Archivo de nivel 3 encontrado: ${level3File}`);
                        loadLevel(group, 'nivel3', level3File); // Cargar el nivel 3 con la ruta completa
                    } else {
                        console.log(`Archivo de nivel 3 no encontrado.`);
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

    console.log(`Intentando cargar archivo: ${filePath}`);

    if (level === 'nivel1') {
        document.getElementById('nivel0').style.display = 'none'; // Ocultar el nivel 0
    }

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Archivo no encontrado: ' + filePath);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('level-container').innerHTML = data;

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
    const elements = document.querySelectorAll('.sub-level .box');
    elements.forEach(function(element) {
        element.addEventListener('click', function() {
            const subProcess = element.dataset.subprocess;
            const filePath = `html/nivel2/${group}/${group}-nivel2-${subProcess}.html`;
            console.log(`Intentando cargar archivo de nivel 2: ${filePath}`);
            loadLevel(group, 'nivel2', filePath);
        });
    });
}

// Función para regresar al nivel 0
function goBackToLevel0() {
    document.getElementById('level-container').innerHTML = ''; // Limpiar el contenedor
    document.getElementById('nivel0').style.display = 'flex'; // Mostrar el nivel 0 nuevamente
    toggleNavigationIcons(false); // Ocultar los íconos en el nivel 0
}

// Función para regresar al nivel 1 desde el nivel 2
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

    loadLevel(group, 'nivel1', `html/nivel1/${group}-nivel1.html`);
}

// Mapa de relaciones entre los subprocesos del nivel 3 y sus archivos de nivel 2 correspondientes
const subProcessToLevel2FileMapping = {
    //Estratégico
    'gestion-participacion': 'difusion-participacion',
    'solicitudes-ciudadanas': 'difusion-participacion',
    'formacion-ciudadana': 'difusion-participacion',
    'cambio-climatico': 'innovacion-sustentabilidad',
    'innovacion-tecnologias': 'innovacion-sustentabilidad',
    'gestion-desastres': 'innovacion-sustentabilidad',
    'construccion-sustentable': 'innovacion-sustentabilidad',
    'gestion-modernizacion': 'modernizacion-gestion',
    'planificacion-estrategica': 'gestion-estrategica',
    'formulacion-presupuestaria': 'gestion-estrategica',
    'enfoque-derechos': 'gestion-estrategica',
    'control-gestion': 'gestion-estrategica',
    'gestion-intersectorial': 'coordinacion-organismos',
    'procedimientos-administrativos': 'supervision-interna',
    'auditorias-internas': 'supervision-interna',
    // Operacional
    'administracion-vivienda': 'administracion-bienes',
    'supervisacion-tecnica': 'aseguramiento-calidad',
    'gestion-iniciativas': 'gestion-instrumentos',
    'postulacion': 'gestion-instrumentos',
    'seleccion': 'gestion-instrumentos',
    'adquisiciones': 'gestion-instrumentos',
    'gestion-ejecucion': 'gestion-instrumentos',
    'post-entrega': 'gestion-instrumentos',
    'planificacion-proyectos': 'planificacion-gestion',
    'gestion-suelos': 'planificacion-gestion',
    'informacion-territorial': 'planificacion-operativa',
    // Soporte
    'medios-comunicacion': 'gestion-comunicacion',
    'comunicaciones-internas': 'gestion-comunicacion',
    'actos-administrativos': 'gestion-juridica',
    'asesoria-asuntos': 'gestion-juridica',
    'gestion-judicial': 'gestion-juridica',
    'gestion-sumarios': 'gestion-juridica',
    'gestion-desarrollo': 'gestion-personas',
    'gestion-bienestar': 'gestion-personas',
    'gestion-bienes': 'gestion-personas',
    'gestion-presupuestaria': 'gestion-presupuestaria',
    'gestion-pagos': 'gestion-presupuestaria',
    'gestion-contable': 'gestion-presupuestaria',
    'soluciones-ti': 'gestion-tic',
    'soporte-ti': 'gestion-tic',
};

// Función para regresar al nivel 2 desde el nivel 3
function goBackToLevel2() {
    const currentLevel = document.querySelector('.sub-level').id;
    let group = '';
    let subProcess = '';

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

    const mappedSubProcess = subProcessToLevel2FileMapping[subProcess];
    if (!mappedSubProcess) {
        console.error(`Error: No se encontró mapeo para el subproceso: ${subProcess}`);
        return;
    }

    const filePath = `html/nivel2/${group}/${group}-nivel2-${mappedSubProcess}.html`;
    loadLevel(group, 'nivel2', filePath);
}

// Función para mostrar/ocultar los íconos de navegación y cambiar su color según el grupo
function toggleNavigationIcons(show, group = null) {
    const icons = document.getElementById('navigation-icons');
    
    if (show) {
        icons.style.display = 'flex'; // Mostrar los íconos

        // Aplicar el color según el grupo (estrategico, operacional, soporte)
        icons.classList.remove('estrategico-color', 'operacional-color', 'soporte-color');
        if (group === 'estrategico') {
            icons.classList.add('estrategico-color');
        } else if (group === 'operacional') {
            icons.classList.add('operacional-color');
        } else if (group === 'soporte') {
            icons.classList.add('soporte-color');
        }

    } else {
        icons.style.display = 'none'; // Ocultar los íconos
    }
}

const masasAtomicas = {
    'H': 1.008, 'He': 4.003, 'Li': 6.941, 'Be': 9.012, 'B': 10.811, 'C': 12.011, 'N': 14.007, 'O': 15.999,
    'F': 18.998, 'Ne': 20.180, 'Na': 22.990, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.086, 'P': 30.974,
    'S': 32.065, 'Cl': 35.453, 'Ar': 39.948, 'K': 39.098, 'Ca': 40.078, 'Sc': 44.956, 'Ti': 47.867,
    'V': 50.942, 'Cr': 51.996, 'Mn': 54.938, 'Fe': 55.845, 'Co': 58.933, 'Ni': 58.693, 'Cu': 63.546,
    'Zn': 65.39, 'Ga': 69.723, 'Ge': 72.64, 'As': 74.922, 'Se': 78.96, 'Br': 79.904, 'Kr': 83.8,
    'Rb': 85.468, 'Sr': 87.62, 'Y': 88.906, 'Zr': 91.224, 'Nb': 92.906, 'Mo': 95.94, 'Tc': 98,
    'Ru': 101.07, 'Rh': 102.906, 'Pd': 106.42, 'Ag': 107.868, 'Cd': 112.411, 'In': 114.818, 'Sn': 118.71,
    'Sb': 121.76, 'Te': 127.6, 'I': 126.905, 'Xe': 131.293, 'Cs': 132.906, 'Ba': 137.327, 'La': 138.906,
    'Ce': 140.116, 'Pr': 140.908, 'Nd': 144.24, 'Pm': 145, 'Sm': 150.36, 'Eu': 151.964, 'Gd': 157.25,
    'Tb': 158.925, 'Dy': 162.5, 'Ho': 164.93, 'Er': 167.259, 'Tm': 168.934, 'Yb': 173.04, 'Lu': 174.967,
    'Hf': 178.49, 'Ta': 180.948, 'W': 183.84, 'Re': 186.207, 'Os': 190.23, 'Ir': 192.217, 'Pt': 195.078,
    'Au': 196.967, 'Hg': 200.59, 'Tl': 204.383, 'Pb': 207.2, 'Bi': 208.98, 'Po': 209, 'At': 210,
    'Rn': 222, 'Fr': 223, 'Ra': 226, 'Ac': 227, 'Th': 232.038, 'Pa': 231.036, 'U': 238.029, 'Np': 237,
    'Pu': 244, 'Am': 243, 'Cm': 247, 'Bk': 247, 'Cf': 251, 'Es': 252, 'Fm': 257, 'Md': 258,
    'No': 259, 'Lr': 262, 'Rf': 267, 'Db': 268, 'Sg': 271, 'Bh': 272, 'Hs': 270, 'Mt': 276
};


function parseFormula(formula) {
    let parsedFormula = [];
    let i = 0;
    
    while (i < formula.length) {
        if (formula[i].match(/[A-Z]/)) {
            let element = formula[i];
            i++;
            
        
            if (i < formula.length && formula[i].match(/[a-z]/)) {
                element += formula[i];
                i++;
            }
            
            
            let count = '';
            while (i < formula.length && formula[i].match(/[0-9]/)) {
                count += formula[i];
                i++;
            }
            
            parsedFormula.push({
                element: element,
                count: count === '' ? 1 : parseInt(count)
            });
        } else {
            
            i++;
        }
    }
    
    return parsedFormula;
}

document.getElementById('calcularMasa').addEventListener('click', function() {
    const formula = document.getElementById('formula').value.trim();
    const resultadoDiv = document.getElementById('resultadoMasa');
    const loading = document.querySelector('#masaMolar .loading');
    
    if (!formula) {
        resultadoDiv.textContent = 'Por favor, ingrese una fórmula química.';
        resultadoDiv.classList.add('show');
        return;
    }
    
    // Mostrar indicador de carga
    loading.classList.add('show');
    resultadoDiv.classList.remove('show');
    
    // Simular un pequeño retraso para mostrar la carga (opcional)
    setTimeout(() => {
        const resultado = calcularMasaMolar(formula);
        
        if (resultado.error) {
            resultadoDiv.textContent = resultado.error;
            resultadoDiv.className = 'result show alert alert-error';
        } else {
            resultadoDiv.innerHTML = `La masa molar de <span class="formula">${formula}</span> es <strong>${resultado.masaMolar} g/mol</strong>`;
            resultadoDiv.className = 'result show alert alert-success';
        }
        
        loading.classList.remove('show');
        resultadoDiv.classList.add('highlighted');
        setTimeout(() => {
            resultadoDiv.classList.remove('highlighted');
        }, 1500);
    }, 500);
});
function calcularMasaMolar(formula) {
    const parsedFormula = parseFormula(formula);
    let masaMolar = 0;
    
    for (const part of parsedFormula) {
        if (!masasAtomicas[part.element]) {
            return { error: `Elemento desconocido: ${part.element}` };
        }
        masaMolar += masasAtomicas[part.element] * part.count;
    }
    
    return { masaMolar: masaMolar.toFixed(4) };
}


function convertirTemperatura(valor, desde, hasta) {
    let kelvin;
    
    
    switch (desde) {
        case 'celsius':
            kelvin = valor + 273.15;
            break;
        case 'fahrenheit':
            kelvin = (valor - 32) * 5/9 + 273.15;
            break;
        case 'kelvin':
            kelvin = valor;
            break;
        default:
            return { error: 'Unidad de origen desconocida' };
    }
    

    switch (hasta) {
        case 'celsius':
            return { resultado: (kelvin - 273.15).toFixed(2) + ' °C' };
        case 'fahrenheit':
            return { resultado: ((kelvin - 273.15) * 9/5 + 32).toFixed(2) + ' °F' };
        case 'kelvin':
            return { resultado: kelvin.toFixed(2) + ' K' };
        default:
            return { error: 'Unidad de destino desconocida' };
    }
}

function convertirPresion(valor, desde, hasta) {
    
    const aPA = {
        'atm': 101325,
        'pa': 1,
        'kpa': 1000,
        'mmHg': 133.322,
        'bar': 100000,
        'psi': 6894.76
    };
    
    
    const desdePa = {
        'atm': 1/101325,
        'pa': 1,
        'kpa': 1/1000,
        'mmHg': 1/133.322,
        'bar': 1/100000,
        'psi': 1/6894.76
    };
    
    
    const enPa = valor * aPA[desde];
    

    const resultado = enPa * desdePa[hasta];
    
    
    const unidades = {
        'atm': 'atm',
        'pa': 'Pa',
        'kpa': 'kPa',
        'mmHg': 'mmHg',
        'bar': 'bar',
        'psi': 'psi'
    };
    
    return { resultado: resultado.toFixed(4) + ' ' + unidades[hasta] };
}

function calcularConcentracion(tipoConcentracion, valorSoluto, unidadSoluto, cantidadSolvente, unidadSolvente, masaMolar) {
    
    let molesSoluto;
    let gramosSoluto;
    if (unidadSoluto === 'g') {
        gramosSoluto = valorSoluto;
        molesSoluto = valorSoluto / masaMolar;
    } else if (unidadSoluto === 'mg') {
        gramosSoluto = valorSoluto / 1000;
        molesSoluto = gramosSoluto / masaMolar;
    } else if (unidadSoluto === 'mol') {
        molesSoluto = valorSoluto;
        gramosSoluto = valorSoluto * masaMolar;
    }
    
    
    let litrosSolvente;
    let kgSolvente;
    
    if (unidadSolvente === 'L') {
        litrosSolvente = cantidadSolvente;
    } else if (unidadSolvente === 'mL') {
        litrosSolvente = cantidadSolvente / 1000;
    } else if (unidadSolvente === 'kg') {
        kgSolvente = cantidadSolvente;
        
        litrosSolvente = cantidadSolvente;
    }
    
    
    switch (tipoConcentracion) {
        case 'molaridad':
            return { resultado: (molesSoluto / litrosSolvente).toFixed(4) + ' mol/L (M)' };
        case 'molalidad':
            if (!kgSolvente) {
                return { error: 'Para molalidad, seleccione kg como unidad de solvente' };
            }
            return { resultado: (molesSoluto / kgSolvente).toFixed(4) + ' mol/kg (m)' };
        case 'ppm':
    
            const grTotales = gramosSoluto + (kgSolvente ? kgSolvente * 1000 : litrosSolvente * 1000);
            return { resultado: ((gramosSoluto / grTotales) * 1000000).toFixed(2) + ' ppm' };
        case 'porcentaje':
        
            const gramosTotal = gramosSoluto + (kgSolvente ? kgSolvente * 1000 : litrosSolvente * 1000);
            return { resultado: ((gramosSoluto / gramosTotal) * 100).toFixed(2) + ' %' };
        default:
            return { error: 'Tipo de concentración no reconocido' };
    }
}

function calcularDilucion(concentracionInicial, unidadConcentracion, volumenInicial, unidadVolumenInicial, concentracionFinal) {
    
    let volInicialL;
    if (unidadVolumenInicial === 'L') {
        volInicialL = volumenInicial;
    } else if (unidadVolumenInicial === 'mL') {
        volInicialL = volumenInicial / 1000;
    }
    
    
    const volFinal = (concentracionInicial * volInicialL) / concentracionFinal;
    
    
    if (volFinal < 0.001) {
        return { resultado: (volFinal * 1000000).toFixed(2) + ' µL' };
    } else if (volFinal < 1) {
        return { resultado: (volFinal * 1000).toFixed(2) + ' mL' };
    } else {
        return { resultado: volFinal.toFixed(4) + ' L' };
    }
}


function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    ripple.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Manejadores de eventos
document.addEventListener('DOMContentLoaded', function() {
    // Cambio de pestañas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            // Efecto de onda
            createRipple(e);
            
            // Cambiar pestaña activa
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar contenido correspondiente
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(this.getAttribute('data-tab')).classList.add('active');
        });
    });
    
    // Cálculo de masa molar
    document.getElementById('calcularMasa').addEventListener('click', function() {
        const formula = document.getElementById('formula').value.trim();
        const resultadoDiv = document.getElementById('resultadoMasa');
        
        if (!formula) {
            resultadoDiv.textContent = 'Por favor, ingrese una fórmula química.';
            resultadoDiv.classList.add('show');
            return;
        }
        
        const resultado = calcularMasaMolar(formula);
        
        if (resultado.error) {
            resultadoDiv.textContent = resultado.error;
        } else {
            resultadoDiv.innerHTML = `La masa molar de <span class="formula">${formula}</span> es <strong>${resultado.masaMolar} g/mol</strong>`;
        }
        
        resultadoDiv.classList.add('show');
        resultadoDiv.classList.add('highlighted');
        setTimeout(() => {
            resultadoDiv.classList.remove('highlighted');
        }, 1500);
    });
    
    // Cálculo de concentración
    document.getElementById('calcularConcentracion').addEventListener('click', function() {
        const tipoConcentracion = document.getElementById('tipoConcentracion').value;
        const valorSoluto = parseFloat(document.getElementById('valorSoluto').value);
        const unidadSoluto = document.getElementById('unidadSoluto').value;
        const cantidadSolvente = parseFloat(document.getElementById('cantidadSolvente').value);
        const unidadSolvente = document.getElementById('unidadSolvente').value;
        const masaMolar = parseFloat(document.getElementById('masaMolarSoluto').value);
        
        const resultadoDiv = document.getElementById('resultadoConcentracion');
        
        if (isNaN(valorSoluto) || isNaN(cantidadSolvente) || isNaN(masaMolar)) {
            resultadoDiv.textContent = 'Por favor, complete todos los campos numéricos.';
            resultadoDiv.classList.add('show');
            return;
        }
        
        const resultado = calcularConcentracion(tipoConcentracion, valorSoluto, unidadSoluto, cantidadSolvente, unidadSolvente, masaMolar);
        
        if (resultado.error) {
            resultadoDiv.textContent = resultado.error;
        } else {
            resultadoDiv.textContent = resultado.resultado;
        }
        
        resultadoDiv.classList.add('show');
        resultadoDiv.classList.add('highlighted');
        setTimeout(() => {
            resultadoDiv.classList.remove('highlighted');
        }, 1500);
    });
    
    // Cálculo de dilución
    document.getElementById('calcularDilucion').addEventListener('click', function() {
        const concentracionInicial = parseFloat(document.getElementById('concentracionInicial').value);
        const unidadConcentracion = document.getElementById('unidadConcentracion').value;
        const volumenInicial = parseFloat(document.getElementById('volumenInicial').value);
        const unidadVolumenInicial = document.getElementById('unidadVolumenInicial').value;
        const concentracionFinal = parseFloat(document.getElementById('concentracionFinal').value);
        
        const resultadoDiv = document.getElementById('resultadoDilucion');
        
        if (isNaN(concentracionInicial) || isNaN(volumenInicial) || isNaN(concentracionFinal)) {
            resultadoDiv.textContent = 'Por favor, complete todos los campos numéricos.';
            resultadoDiv.classList.add('show');
            return;
        }
        
        const resultado = calcularDilucion(concentracionInicial, unidadConcentracion, volumenInicial, unidadVolumenInicial, concentracionFinal);
        
        if (resultado.error) {
            resultadoDiv.textContent = resultado.error;
        } else {
            resultadoDiv.textContent = `Volumen final: ${resultado.resultado}`;
        }
        
        resultadoDiv.classList.add('show');
        resultadoDiv.classList.add('highlighted');
        setTimeout(() => {
            resultadoDiv.classList.remove('highlighted');
        }, 1500);
    });
    
    // Cálculo de temperatura
    document.getElementById('calcularTemperatura').addEventListener('click', function() {
        const valorTemperatura = parseFloat(document.getElementById('valorTemperatura').value);
        const unidadTemperaturaInicial = document.getElementById('unidadTemperaturaInicial').value;
        const unidadTemperaturaFinal = document.getElementById('unidadTemperaturaFinal').value;
        
        const resultadoDiv = document.getElementById('resultadoTemperatura');
        
        if (isNaN(valorTemperatura)) {
            resultadoDiv.textContent = 'Por favor, ingrese un valor numérico.';
            resultadoDiv.classList.add('show');
            return;
        }
        
        const resultado = convertirTemperatura(valorTemperatura, unidadTemperaturaInicial, unidadTemperaturaFinal);
        
        if (resultado.error) {
            resultadoDiv.textContent = resultado.error;
        } else {
            resultadoDiv.textContent = resultado.resultado;
        }
        
        resultadoDiv.classList.add('show');
        resultadoDiv.classList.add('highlighted');
        setTimeout(() => {
            resultadoDiv.classList.remove('highlighted');
        }, 1500);
    });
    
    // Cálculo de presión
    document.getElementById('calcularPresion').addEventListener('click', function() {
        const valorPresion = parseFloat(document.getElementById('valorPresion').value);
        const unidadPresionInicial = document.getElementById('unidadPresionInicial').value;
        const unidadPresionFinal = document.getElementById('unidadPresionFinal').value;
        
        const resultadoDiv = document.getElementById('resultadoPresion');
        
        if (isNaN(valorPresion)) {
            resultadoDiv.textContent = 'Por favor, ingrese un valor numérico.';
            resultadoDiv.classList.add('show');
            return;
        }
        
        const resultado = convertirPresion(valorPresion, unidadPresionInicial, unidadPresionFinal);
        
        if (resultado.error) {
            resultadoDiv.textContent = resultado.error;
        } else {
            resultadoDiv.textContent = resultado.resultado;
        }
        
        resultadoDiv.classList.add('show');
        resultadoDiv.classList.add('highlighted');
        setTimeout(() => {
            resultadoDiv.classList.remove('highlighted');
        }, 1500);
    });
    
 
    const toggleInfoButtons = document.querySelectorAll('.toggle-info');
    toggleInfoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const infoBoxId = this.id.replace('toggle', 'info');
            const infoBox = document.getElementById(infoBoxId);
            
            if (infoBox.classList.contains('hidden')) {
                infoBox.classList.remove('hidden');
                infoBox.classList.add('visible');
                this.textContent = 'Ocultar información';
            } else {
                infoBox.classList.remove('visible');
                infoBox.classList.add('hidden');
                this.textContent = 'Mostrar información';
            }
        });
    });
});
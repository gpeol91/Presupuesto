

var ingresos = [new Ingresos("Salario", 2200), new Ingresos("Venta Coche", 2500)]
var egresos = [new Egreso("Renta Departamento", 900), new Egreso("Ropa", 400)]

const totalEgresos = () => {
    var totalEgresos = 0;
    for (let element of egresos) {
        totalEgresos += element.valor
    }
    return totalEgresos;
}

const totalIngresos = () => {
    var totalIngresos = 0;
    for (let element of ingresos) {
        totalIngresos += element.valor
    }
    return totalIngresos;
}

const formatoMoneda = (valor) => {
    return Number(valor).toLocaleString('es-mx', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 })
}

const formatoPorcentaje = (valor) => {
    return Number(valor).toLocaleString('es-mx', { style: 'percent', minimumFractionDigits: 2 })
}

const cargarCabecero = () => {
    var presupuesto = totalIngresos() - totalEgresos();
    var porcentajeEgreso = totalEgresos() / totalIngresos();
    var divpresupuesto = document.getElementById("presupuesto");
    var divingresos = document.getElementById("ingresos");
    var divegresos = document.getElementById("egresos");
    var divporcentaje = document.getElementById("porcentaje");
    divpresupuesto.innerHTML = formatoMoneda(presupuesto);
    divporcentaje.innerHTML = formatoPorcentaje(isNaN(porcentajeEgreso)===true ? 0 : porcentajeEgreso);
    divegresos.innerHTML = formatoMoneda(totalEgresos());
    divingresos.innerHTML = formatoMoneda(totalIngresos());
}


const cargarIngresos = () => {
    var ingresosHTML = '';
    for (let element of ingresos) {
        ingresosHTML += crearIngresoHTML(element)
    }
    var div_lista_ingresos = document.getElementById('lista-ingresos')
    div_lista_ingresos.innerHTML = ingresosHTML;
}

const elimiarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(item => item.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}
const crearIngresoHTML = (ingreso) => {
    var ingresoHTML = `<div class="limpiarEstilos; elemento">
                <div>${ingreso.descripcion}
                    <div class="limpiarEstilos; derecha"> 
                        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                            <ion-icon name="close-circle-outline" onClick='elimiarIngreso(${ingreso.id})' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
    return ingresoHTML;
}

const cargarEgresos = () => {
    var egresosHTML = '';
    for (let element of egresos) {
        egresosHTML += crearEgresoHTML(element)
    }
    var div_lista_ingresos = document.getElementById('lista-egresos')
    div_lista_ingresos.innerHTML = egresosHTML;
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(item => item.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

const crearEgresoHTML = (egreso) => {
    var egresoHTML = `<div class="limpiarEstilos; elemento">
                            <div>${egreso.descripcion}
                                <div class="limpiarEstilos; derecha">
                                    <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                                    <div class="elemento_porcentaje">21%</div>
                                    <div class="elemento_eliminar">
                                        <button class="elemento_eliminar--btn">
                                            <ion-icon name="close-circle-outline" onClick='eliminarEgreso(${egreso.id})' ></ion-icon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    return egresoHTML;
}


const agregarDato = () => {
    const forma = document.getElementById('forma')
    const tiposelect = forma.querySelector('select').value;
    const descripcion = forma.querySelectorAll("input")[0].value;
    const valor = forma.querySelectorAll("input")[1].value;
    if (typeof descripcion === undefined || typeof descripcion === null || descripcion === '') {
        alert(`Favor de agregar la descripción del ${tiposelect}`)
        return;
    }
    if (typeof valor === undefined || typeof valor === null || Number(valor) <= 0) {
        alert(`Favor de agregar el valor del ${tiposelect}`)
        return;
    }

    if (tiposelect === 'ingreso') {
        ingresos.push(new Ingresos(descripcion, Number(valor)));
        cargarCabecero();
        cargarIngresos();
    } else {
        egresos.push(new Ingresos(descripcion, Number(valor)));
        cargarCabecero();
        cargarEgresos();
    }
    document.getElementById('descripcion').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('descripcion').focus();
}

const cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}



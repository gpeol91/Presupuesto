
class Ingresos extends Dato {
    static condadorIngresos=0;   
    _id;
    constructor(descripcion, valor) {
        super(descripcion, valor)
        Ingresos.condadorIngresos++;
        this._id = Ingresos.condadorIngresos;
    }
    
    get id() {
        return this._id;
    }
}
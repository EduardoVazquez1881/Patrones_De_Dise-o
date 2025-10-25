
class Central{

    private static _instancia: Central | null = null;
    private static readonly _bloqueo = Symbol("lock");

    private readonly _numero: number;
    
    private constructor(){
        this._numero = 911
    }

    public static get Obtener_Instancia(): Central{
        if(!Central._instancia)
        {
            Central._instancia = new Central();
        }
        return Central._instancia;
    }

    public Contectar_Llamada(): void{
        console.log(
            `LLAMADA ENTRANTE AL ${this._numero}\n- - - - - - - - - - - -`

        );
    }
}

interface IEmergencia{
    emergencia():void;
}

class Suicidio implements IEmergencia{
    emergencia():void{
        console.log("Equipo especializado para intentos de suicidos");
    }
}

class Incendio implements IEmergencia{
    emergencia():void{
        console.log("Equipo especializado para incendios");
    }
}

class Accidente implements IEmergencia{
    emergencia():void{
        console.log("Equipo especializado para accidentes");
    }
}

class Violeta implements IEmergencia{
    emergencia():void{
        console.log("Equipo especializado para abusos contra una mujer");
    }
}

class Pendiente implements IEmergencia{
    emergencia():void{
        console.log("Pendiente...");
    }
}

abstract class Reporte{
    protected reporte: IEmergencia;
    constructor(reporte:IEmergencia){
        this.reporte=reporte;
    }
    setReporte(reporte:IEmergencia):void{
        this.reporte = reporte;
    }
    abstract emergencia():void;
}


class Asignacion extends Reporte{
    emergencia():void{
        console.log("[Asignando emergencia]");
        this.reporte.emergencia();
    }
}

class Operador{
    private id:number = 0;
    private nombre:string ="";
    private disponible:boolean = false;

    constructor(id:number, nombre:string, disponible:boolean){
        this.id = id;
        this.nombre = nombre;
        this.disponible = disponible;

    }

    public CambiarEstatus(disponible:boolean):void{
        this.disponible = disponible;
    }

    Atiende_Llamada(){
        const llamada = Central.Obtener_Instancia; // aqui esta el 
        ValidarInstancia(llamada);
        llamada.Contectar_Llamada();
        console.log(`Llamada atendida por el operador con el id ${this.id} y nombre ${this.nombre}`)
        Menu();
    }
}

function ValidarInstancia(dato:Central){
    let lista = [];
    lista.push(dato);
    for(let i = 0; i < lista.length; i++){
        if(lista[i] === lista[i+1]){
            let validar:boolean;
            validar = lista[i] === lista[i+1];
            console.log(validar);
        }
    }
}

function Menu(){
    const emergenciasMap: { [key: string]: IEmergencia } = {
        "suicidio": new Suicidio(),
        "incendio": new Incendio(),
        "accidente": new Accidente(),
        "violeta": new Violeta()
    };

    const lista = Object.keys(emergenciasMap);
    const tipoEmergencia = lista[Math.floor(Math.random() * lista.length)];
    
    const reporte = new Asignacion(emergenciasMap[tipoEmergencia]);
    reporte.emergencia();
}

let lista = [
    {id: 1, nombre: "Eduardo", disponible: true},
    {id: 2, nombre: "Daniel", disponible: false},
    {id: 3, nombre: "Anahi", disponible: true},
    {id: 4, nombre: "Yeritza", disponible: true},
    {id: 5, nombre: "Maya", disponible: false}
]

for (let i = 0; i < lista.length; i++){

    if(lista[i].disponible == true){
        console.log("----------------------------------------------------------")
        lista[i].disponible = false;
        const operador = new Operador(lista[i].id, lista[i].nombre, lista[i].disponible);
        console.log("Comprobacion de referencias");
        operador.Atiende_Llamada();
    }
    else
    {
        console.log("----------------------------------------------------------")
        console.log(`El operador ${lista[i].nombre} se encuentra en una llamada`);
    }
}


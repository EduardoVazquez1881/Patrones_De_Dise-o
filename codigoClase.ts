import promptSync from 'prompt-sync';
const texto = promptSync();

interface IReporte{
    Exportar(): string;
}

class Generador_pdf implements IReporte{
    Exportar(): string {
        return "Reporte generado en PDF";
    }
}

class Generador_excel implements IReporte{
    Exportar(): string {
        return "Reporte generado en EXCEL";
    }
}

class Generador_XML implements IReporte{
    Exportar(): string {
        return "Reporte generado en XML";
    }
}

class Generador_DOCS implements IReporte{
    Exportar(): string {
        return "Reporte generado en DOCS";
    }
}

class Generador_JSON implements IReporte{
    Exportar(): string {
        return "Reporte generado en JSON";
    }
}

class Vacio implements IReporte{
    Exportar(): string {
        return "";
    }
}

abstract class Generador_Reporte{
    protected reporte: IReporte;

    constructor(reporte: IReporte) {
        this.reporte = reporte;
    }
    
    setReporte(reporte: IReporte): void {
        this.reporte = reporte;
    }
    
    abstract exportar(): void;
}

class ReporteVentas extends Generador_Reporte{
    exportar(): void {
        console.log("\nReporte de ventas generado");
        console.log(this.reporte.Exportar());
    }
}

class ReporteInventario extends Generador_Reporte{
    exportar(): void {
        console.log("\nReporte de inventario generado");
        console.log(this.reporte.Exportar());
    }
}

console.log("-- GENERADOR DE REPORTES -- \n");

let tipoReporte: string;
let reporte: Generador_Reporte | undefined;

while (!reporte) {
    console.log("Que reporte quieres hacer:");
    console.log("1. Ventas");
    console.log("2. Inventario");
    tipoReporte = texto("Ingresa la opcion: ");

    switch(tipoReporte){
        case '1':
            reporte = new ReporteVentas(new Vacio());
            break;
        case '2':
            reporte = new ReporteInventario(new Vacio());
            break;
        default:
            console.log("Tipo de reporte no válido");
    }
}

let extensionValida = false;

while (!extensionValida) {
    console.log("Que extension de archivo quieres imprimir:");
    console.log("1. PDF");
    console.log("2. Excel");
    console.log("3. XML");
    console.log("4. DOCS");
    console.log("5. JSON");
    const extension = texto("Ingresa la opcion: ");

    switch(extension){
        case '1':
            reporte.setReporte(new Generador_pdf());
            extensionValida = true;
            break;
        case '2':
            reporte.setReporte(new Generador_excel());
            extensionValida = true;
            break;
        case '3':
            reporte.setReporte(new Generador_XML());
            extensionValida = true;
            break;
        case '4':
            reporte.setReporte(new Generador_DOCS());
            extensionValida = true;
            break;
        case '5':
            reporte.setReporte(new Generador_JSON());
            extensionValida = true;
            break;
        default:
            console.log("Extension no valida. Intenta de nuevo.");
    }
}

reporte.exportar();

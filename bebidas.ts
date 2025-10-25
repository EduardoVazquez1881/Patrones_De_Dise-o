import promptSync from 'prompt-sync';
const write = promptSync();

interface Ibebida{
    servir():void;
    getNombre(): string;
}

class Naranjada implements Ibebida{
    servir(): void {
        console.log("Generador juego de naranja fresco");
    }
    getNombre():string{
        return "juego de naranja";
    }
}

class Limonada implements Ibebida{
    servir():void{
        console.log("Generador juego de limonada fresco");
    }
    getNombre(): string {
        return "jugo de limon";
    }
}

class AguaMineral implements Ibebida{
    servir():void{
        console.log("Generador de agua mineral");
    }
    getNombre(): string {
        return "Agua Mineral";
    }
}

class AguaNatural implements Ibebida{
    servir():void{
        console.log("Generador de agua natural");
    }
    getNombre(): string {
        return "Agua natural";
    }
}

class Mezclar implements Ibebida{
    private bebidaPrincipal: Ibebida;
    private bebidaSecundaria: Ibebida;
    constructor(bebidaPrincipal: Ibebida, bebidaSecundaria: Ibebida){
        this.bebidaPrincipal = bebidaPrincipal;
        this.bebidaSecundaria = bebidaSecundaria;
    }

    servir(): void {
        console.log(`Mezclando ${this.bebidaPrincipal.getNombre()} con ${this.bebidaSecundaria.getNombre()}`);
        this.bebidaPrincipal.servir();
        this.bebidaSecundaria.servir();
        console.log(`Tu ${this.bebidaPrincipal.getNombre()} con ${this.bebidaSecundaria.getNombre()} se encuentra lista uwu`);
        
    }
    getNombre(): string {
        return `Bebidas mezcladas`
    }
}

abstract class Expendedora{
    abstract CrearBebida(): Ibebida;
    
    EntregarBebida(): void{
        const bebida: Ibebida = this.CrearBebida();
        bebida.servir();
    }

    MezclarBebida(otraBebida: Ibebida):void{
        const bebidaPrincipal = this.CrearBebida();
        const mezcla = new Mezclar(bebidaPrincipal, otraBebida);
        mezcla.servir();
    }
}

class ExpendoraNaranjada extends Expendedora{
     CrearBebida(): Ibebida {
         return new Naranjada()
     }
}

class ExpendedoraLimonada extends Expendedora{
     CrearBebida(): Ibebida {
     return new Limonada()
    }
}

class ExpendedoraAguaNatural extends Expendedora{
    CrearBebida(): Ibebida {
        return new AguaNatural();
    }
}

class ExpendedoraAguaMineral extends Expendedora{
    CrearBebida(): Ibebida {
       return new AguaMineral();
    }
}

try{
    console.log("-- BIENVENIDO A LA FUENTE DE BEBIDAS! --");
    console.log("- - - - - - - - - - - - - - - - - - - - - \n")
    console.log("Selecciona una bebida: \n1. Agua Natural \n2. Agua Mineral \n3. Naranjada \n4. Limonada\n");
    const opc = write("Opcion:");

    let dato;
    if(opc == "3" || opc == "4"){
        console.log("- - - - - - - - - - - - - - - - - - - ")
        console.log("\nSelecciona que complemento deseas: \n1. Mineral \n2. Agua");
        dato = write("Opcion: ");
        
    }
    let expendedora: Expendedora;

    if(opc == "1"){
        expendedora = new ExpendedoraAguaNatural();
        expendedora.EntregarBebida();
    }
    if(opc == "2"){
        expendedora = new ExpendedoraAguaMineral();
        expendedora.EntregarBebida();
    }
    if(opc == "3"){
        expendedora = new ExpendoraNaranjada();
        if(dato == "2"){
            let aguaNatural = new AguaNatural(); 
            expendedora.MezclarBebida(aguaNatural);
        }
        if(dato == "1"){
            let aguaMineral = new AguaMineral();
            expendedora.MezclarBebida(aguaMineral);
        }
    }
    if(opc == "4"){
        expendedora = new ExpendedoraLimonada();
        if(dato == "2"){
            let aguaNatural = new AguaNatural(); 
            expendedora.MezclarBebida(aguaNatural);
        }
        if(dato == "1"){
            let aguaMineral = new AguaMineral();
            expendedora.MezclarBebida(aguaMineral);
        }
    }
}catch(error)
{
    console.log(error);
}

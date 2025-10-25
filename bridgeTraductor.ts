interface Idioma{
    traducir():string;
}

abstract class Cafe{

    protected idioma: Idioma;

    constructor(idioma:Idioma){
        this.idioma = idioma;
    }

    abstract pedirCafe(): void;
}

class adaptadorIngles {
    pedirCafe(): void {
        console.log("Coffe please");
    }
}

class adaptadorEspanol extends Cafe{
    pedirCafe(): void {
        console.log("Un café, por favor");
    }
}

class adaptadorChino extends Cafe{
    pedirCafe(): void {
        console.log("yì bēi kāfēi,qǐng");
    }
}

class adaptadorHindi extends Cafe{
    pedirCafe(): void {
        console.log("ek kofi, kripya)");
    }
}

class adaptadorFrances extends Cafe{
    pedirCafe(): void {
        console.log("Un café, s’il vous plaît");
    }
}

class Maquina extends Cafe{
    pedirCafe(): void {
        console.log("El usuario pidio el cafe en "+ this.idioma.traducir());
    }
}

const pedido = new Maquina(new adaptadorChino());
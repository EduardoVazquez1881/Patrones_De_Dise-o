interface IPrototype {
    clonar(): IPrototype;
    verCasa(): string;
}

class Casa implements IPrototype {
    private tipo: string = "";
    private habitacion: number = 0;
    private banos: number = 0;
    private color: string = "";

    setTipo(tipo: string): void { this.tipo = tipo; }
    setHabitacion(habitacion: number): void { this.habitacion = habitacion; }
    setBanos(banos: number): void { this.banos = banos; }
    setColor(color: string): void { this.color = color; }

    clonar(): IPrototype {
        const clon = new Casa();
        clon.setTipo(this.tipo);
        clon.setHabitacion(this.habitacion);
        clon.setBanos(this.banos);
        clon.setColor(this.color);
        return clon;
    }

    verCasa(): string {
        return `Casa: ${this.tipo} Habitaciones: ${this.habitacion} Baños: ${this.banos} Color: ${this.color}`;
    }
}

// Prototipo base: moderna, 3 habitaciones, 2 baños, color blanco
const base = new Casa();
base.setTipo("moderna");
base.setHabitacion(3);
base.setBanos(2);
base.setColor("blanco");

// Crear cada casa manualmente y aplicar cambios
const casa1 = base.clonar() as Casa; // igual al prototipo
console.log(`Casa1: ${casa1.verCasa()}`);

const casa2 = base.clonar() as Casa; // igual al prototipo
casa2.setColor("rojo"); // cambia color
console.log(`Casa2: ${casa2.verCasa()}`);

const casa3 = base.clonar() as Casa;
casa3.setColor("azul");
console.log(`Casa3: ${casa3.verCasa()}`);

const casa4 = base.clonar() as Casa;
casa4.setColor("gris");
casa4.setHabitacion(4);
console.log(`Casa4: ${casa4.verCasa()}`);

const casa5 = base.clonar() as Casa; // igual al prototipo
casa5.setColor("negro");
console.log(`Casa5: ${casa5.verCasa()}`);

const casa6 = base.clonar() as Casa;
casa6.setColor("verde");
console.log(`Casa6: ${casa6.verCasa()}`);

const casa7 = base.clonar() as Casa;
casa7.setColor("amarillo"); // cambia color
casa7.setBanos(1); 
console.log(`Casa7: ${casa7.verCasa()}`);

const casa8 = base.clonar() as Casa;
casa8.setColor("beige"); // cambia tipo y color
console.log(`Casa8: ${casa8.verCasa()}`);

const casa9 = base.clonar() as Casa;
casa9.setColor("marron"); 
casa9.setHabitacion(5); 
casa9.setBanos(3);
console.log(`Casa9: ${casa9.verCasa()}`);

const casa10 = base.clonar() as Casa;
casa10.setColor("celeste"); // cambia color
console.log(`Casa10: ${casa10.verCasa()}`);

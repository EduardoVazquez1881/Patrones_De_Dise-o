enum EstadoHabitacion {
    DISPONIBLE = "Habitacion disponible",
    OCUPADA = "Habitacion Ocupada",
    SUCIA = "Habitacion sucia"
}

class Habitacion {
    public estado: EstadoHabitacion;

    constructor(public readonly numero: number) {
        this.estado = EstadoHabitacion.DISPONIBLE;
    }

    Mensaje(): string {
        return `Habitacion No. ${this.numero} se encuentra ${this.estado}`;
    }
}

class Reserva {
    constructor(public usuario: string, public habitacion: Habitacion) {}
}

class PiscinaHotel {
    private habitacionDisponible: Habitacion[] = [];
    private habitacionUsada: Habitacion[] = [];
    private habitacionSucia: Habitacion[] = [];
    private reservas: Reserva[] = [];

    constructor(totalHabitaciones: number) {
        console.log(`Hotel con ${totalHabitaciones} habitaciones`);
        for (let i = 1; i <= totalHabitaciones; i++) {
            this.habitacionDisponible.push(new Habitacion(i));
        }
    }

    pedirhabitacion(usuario: string): Habitacion | null {
        if (this.habitacionDisponible.length === 0) {
            console.log(`No hay habitaciones disponibles en el hotel para el cliente ${usuario}`);
            return null;
        }

        const habitacion = this.habitacionDisponible.shift()!;
        habitacion.estado = EstadoHabitacion.OCUPADA;
        this.habitacionUsada.push(habitacion);
        const nuevaReserva = new Reserva(usuario, habitacion);
        this.reservas.push(nuevaReserva);

        console.log(`La habitacion numero ${habitacion.numero} se asigno a ${usuario}`);
        return habitacion;
    }

    desocuparHabitacion(usuario: string): Habitacion | null {
        const indiceReserva = this.reservas.findIndex(r => r.usuario === usuario);

        if (indiceReserva === -1) {
            console.log(`No hay reservas de ${usuario}`);
            return null;
        }

        const reservaTerminada = this.reservas.splice(indiceReserva, 1)[0];
        const habitacionLiberada = reservaTerminada.habitacion;

        const indiceUsada = this.habitacionUsada.findIndex(h => h.numero === habitacionLiberada.numero);
        if (indiceUsada > -1) {
            this.habitacionUsada.splice(indiceUsada, 1);
        }

        habitacionLiberada.estado = EstadoHabitacion.SUCIA;
        this.habitacionSucia.push(habitacionLiberada);
        
        console.log(`El usuario ${usuario} dejo la habitacion No. ${habitacionLiberada.numero}. Ahora está ${habitacionLiberada.estado}.`);
        return habitacionLiberada;
    }

    limpiarHabitacion(numeroHabitacion: number): void {
        const indiceSucia = this.habitacionSucia.findIndex(h => h.numero === numeroHabitacion);

        if (indiceSucia === -1) {
            console.log(`La habitacion No. ${numeroHabitacion} no necesita limpieza.`);
            return;
        }

        const habitacionLimpia = this.habitacionSucia.splice(indiceSucia, 1)[0];
        habitacionLimpia.estado = EstadoHabitacion.DISPONIBLE;
        this.habitacionDisponible.push(habitacionLimpia);
        
        console.log(`La habitacion No. ${habitacionLimpia.numero} ha sido limpiada y está disponible.`);
    }

    mostrarHabitaciones(): void {
        console.log("\n- - INFORMACION DEL HOTEL - -");
        console.log(`Habitaciones disponibles: ${this.habitacionDisponible.length}`);
        console.log(`Habitaciones ocupadas: ${this.habitacionUsada.length}`);
        console.log(`Pendientes de limpieza: ${this.habitacionSucia.length}`);
        
        console.log("\nDetalle de Reservas:");
        for (let reserva of this.reservas) {
            console.log(` -> Usuario: ${reserva.usuario}, Habitacion: No. ${reserva.habitacion.numero}`);
        }
        console.log("- - - - - - - - - - - - - -");
    }
}

const Hotel = new PiscinaHotel(5);

let clientes = ["Eduardo", "Ana", "Fernanda", "Maya", "Daniel", "Jorge"];

for (let i = 0; i < clientes.length; i++) {
    Hotel.pedirhabitacion(clientes[i]);
}
Hotel.mostrarHabitaciones();

const habitacionDesocupada = Hotel.desocuparHabitacion("Ana");
Hotel.mostrarHabitaciones();

if (habitacionDesocupada) {
    Hotel.limpiarHabitacion(habitacionDesocupada.numero);
}
Hotel.mostrarHabitaciones();
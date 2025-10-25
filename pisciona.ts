// Un objeto simple con un ID y un método para reiniciarse
class ObjetoReutilizable {
  public id: number;

  constructor() {
    this.id = Math.floor(Math.random() * 1000);
    console.log(`Objeto #${this.id} CREADO.`);
  }

  reiniciar() {
    console.log(`Objeto #${this.id} REINICIADO.`);
  }
}

// La Piscina de Objetos súper simplificada
class PiscinaDeObjetos {
  private disponibles: ObjetoReutilizable[] = [];

  constructor(private fabrica: () => ObjetoReutilizable, tamaño: number) {
    for (let i = 0; i < tamaño; i++) {
      this.disponibles.push(this.fabrica());
    }
  }

  // Presta un objeto: lo saca de la lista de disponibles o crea uno nuevo
  prestar(): ObjetoReutilizable {
    return this.disponibles.pop() ?? this.fabrica();
  }

  // Devuelve un objeto: lo reinicia y lo agrega a la lista de disponibles
  devolver(objeto: ObjetoReutilizable): void {
    objeto.reiniciar();
    this.disponibles.push(objeto);
  }
}

// --- USO ---

console.log("--- Creando piscina con 1 objeto ---");
const piscina = new PiscinaDeObjetos(() => new ObjetoReutilizable(), 1);

console.log("\n--- Pidiendo 2 objetos ---");
const objeto1 = piscina.prestar(); // Usa el objeto pre-cargado
const objeto2 = piscina.prestar(); // No hay más, crea uno nuevo

console.log("\n--- Devolviendo objeto1 ---");
piscina.devolver(objeto1);

console.log("\n--- Pidiendo un tercer objeto ---");
const objeto3 = piscina.prestar(); // ¡Reutiliza el objeto que era objeto1!

// Verificación final: objeto1 y objeto3 son la misma instancia
console.log(`\n¿objeto1 es el mismo que objeto3? ${objeto1 === objeto3}`); // true
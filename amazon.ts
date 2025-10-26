import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

abstract class Producto {
  abstract getID(): string;
  abstract getNombre(): string;
  abstract getPrecio(): number;
  abstract getDetalles(): string;
  abstract getGama(): string;
  abstract getCategoria(): string;
}

class ProductoSimple extends Producto {
  constructor(
    private id: string,
    private nombre: string,
    private precioBase: number,
    private detalles: string,
    private gama: string,
    private categoria: string
  ) {
    super();
  }

  getID(): string {
    return this.id;
  }
  getNombre(): string {
    return this.nombre;
  }
  getPrecio(): number {
    return this.precioBase;
  }
  getDetalles(): string {
    return this.detalles;
  }
  getGama(): string {
    return this.gama;
  }
  getCategoria(): string {
    return this.categoria;
  }
}

abstract class DecoradorProducto extends Producto {
  constructor(protected _producto: Producto) {
    super();
  }
  getID(): string {
    return this._producto.getID();
  }
  getDetalles(): string {
    return this._producto.getDetalles();
  }
  getGama(): string {
    return this._producto.getGama();
  }
  getCategoria(): string {
    return this._producto.getCategoria();
  }
}

class DescuentoPorcentual extends DecoradorProducto {
  constructor(producto: Producto, private porcentaje: number) {
    super(producto);
  }

  getNombre(): string {
    return `${this._producto.getNombre()} [${this.porcentaje}%`;
  }
  getPrecio(): number {
    return this._producto.getPrecio() * (1 - this.porcentaje / 100);
  }
}

class DescuentoPorGama extends DecoradorProducto {
  constructor(
    producto: Producto,
    private gamaAplicable: string,
    private porcentaje: number
  ) {
    super(producto);
  }

  private aplicaDescuento(): boolean {
    return this._producto.getGama() === this.gamaAplicable;
  }

  getNombre(): string {
    if (this.aplicaDescuento()) {
      return `${this._producto.getNombre()} [Promo ${this.gamaAplicable}: ${
        this.porcentaje
      }% OFF]`;
    }
    return this._producto.getNombre();
  }

  getPrecio(): number {
    const precioOriginal = this._producto.getPrecio();
    if (this.aplicaDescuento()) {
      const descuento = precioOriginal * (this.porcentaje / 100);
      return precioOriginal - descuento;
    }
    return precioOriginal;
  }
}

class CarritoDeCompras {
  private items: Producto[] = [];
  private costoEnvioEstandar: number = 15.0;
  private umbralEnvioGratis: number = 300.0;

  agregar(item: Producto): void {
    this.items.push(item);
    console.log(
      `\n[Carrito] "${item.getNombre()}" agregado (Precio: $${item
        .getPrecio()
        .toFixed(2)}).`
    );
  }

  quitarItem(indexUsuario: number): Producto | undefined {
    const indexArray = indexUsuario - 1; // Convertir a 0-based
    if (indexArray >= 0 && indexArray < this.items.length) {
      // splice devuelve un array de elementos eliminados
      const itemQuitado = this.items.splice(indexArray, 1);
      return itemQuitado[0];
    }
    return undefined; // Índice no válido
  }

  vaciar(): void {
    this.items = [];
  }

  getItems(): Producto[] {
    return this.items;
  }

  estaVacio(): boolean {
    return this.items.length === 0;
  }

  calcularSubtotal(): number {
    return this.items.reduce((total, item) => total + item.getPrecio(), 0);
  }

  calcularEnvio(subtotal: number): number {
    if (subtotal >= this.umbralEnvioGratis || subtotal === 0) {
      return 0.0;
    }
    return this.costoEnvioEstandar;
  }

  mostrarResumen(): void {
    console.log("\n======================================");
    console.log("       RESUMEN DEL CARRITO");
    console.log("======================================");

    if (this.estaVacio()) {
      console.log("El carrito está vacío.");
      console.log("======================================");
      return;
    }

    this.items.forEach((item, index) => {
      console.log(` ${index + 1}. ${item.getNombre()}`);
      console.log(`    Precio: $${item.getPrecio().toFixed(2)}`);
    });

    const subtotal = this.calcularSubtotal();
    const costoEnvio = this.calcularEnvio(subtotal);
    const totalFinal = subtotal + costoEnvio;

    console.log("--------------------------------------");
    console.log(`Subtotal:      $${subtotal.toFixed(2)}`);
    if (costoEnvio === 0 && subtotal > 0) {
      console.log("Envío:         $0.00 (¡Envío Gratis!)");
    } else {
      console.log(`Envío:         $${costoEnvio.toFixed(2)}`);
    }
    console.log("======================================");
    console.log(`TOTAL A PAGAR: $${totalFinal.toFixed(2)}`);
    console.log("======================================");
  }
}

const INVENTARIO: ProductoSimple[] = [
  new ProductoSimple(
    "t1",
    "Laptop 15 pulgadas",
    750.0,
    "Intel i5, 8GB RAM, 512GB SSD, Gris",
    "Genérica",
    "Tecnología"
  ),
  new ProductoSimple(
    "t2",
    "Audífonos Bluetooth",
    49.99,
    "Cancelación de ruido pasiva, 20h batería, Negro",
    "AudioTech",
    "Tecnología"
  ),

  new ProductoSimple(
    "h1",
    "Cafetera",
    39.99,
    "Jarra de vidrio para 12 tazas, Filtro permanente, Negro",
    "CasaBasic",
    "Hogar"
  ),
  new ProductoSimple(
    "h2",
    "Silla de Oficina Ergonómica",
    120.0,
    "Soporte lumbar, Brazos ajustables, Malla transpirable",
    "OficinaPro",
    "Hogar"
  ),

  new ProductoSimple(
    "r1",
    "Camiseta Básica de Algodón",
    15.0,
    "Manga corta, Cuello redondo, Blanca",
    "aaaa",
    "Ropa"
  ),
  new ProductoSimple(
    "r2",
    "Jeans",
    39.99,
    "Denim 100% algodón, Azul clásico",
    "aaaa",
    "Ropa"
  ),

  // Libros
  new ProductoSimple(
    "l1",
    "Libro: 'El Principito'",
    12.5,
    "Autor:",
    "Editorial ",
    "Libros"
  ),
  new ProductoSimple(
    "l2",
    "Libro: 'Cocina Facil'",
    22.99,
    "Autor: ",
    "Editorial ",
    "Libros"
  ),
];

const PROMOCIONES_ACTIVAS = [
  { tipo: "gama", gama: "Sony", porcentaje: 15 },
  { tipo: "id", id: "h2", porcentaje: 10 },
  { tipo: "gama", gama: "Samsung", porcentaje: 5 },
];

function mostrarCategoriasYProductos(
  inventario: ProductoSimple[]
): ProductoSimple[] {
  console.log("\n--- NUESTROS PRODUCTOS ---");
  const categorias = [...new Set(inventario.map((p) => p.getCategoria()))];
  let indexGlobal = 1;
  const productosMostrados: ProductoSimple[] = [];

  for (const categoria of categorias) {
    console.log(`\n-- ${categoria.toUpperCase()} --`);
    const productosEnCategoria = inventario.filter(
      (p) => p.getCategoria() === categoria
    );
    for (const producto of productosEnCategoria) {
      console.log(
        ` ${indexGlobal}. ${producto.getNombre()} - $${producto
          .getPrecio()
          .toFixed(2)}`
      );
      console.log(`    ${producto.getDetalles()}`);
      productosMostrados.push(producto);
      indexGlobal++;
    }
  }
  return productosMostrados;
}

function aplicarPromociones(productoBase: ProductoSimple): Producto {
  let productoParaAgregar: Producto = productoBase;

  for (const promo of PROMOCIONES_ACTIVAS) {
    if (promo.tipo === "gama" && productoBase.getGama() === promo.gama) {
      productoParaAgregar = new DescuentoPorGama(
        productoParaAgregar,
        promo.gama,
        promo.porcentaje
      );
    } else if (promo.tipo === "id" && productoBase.getID() === promo.id) {
      productoParaAgregar = new DescuentoPorcentual(
        productoParaAgregar,
        promo.porcentaje
      );
    }
  }
  return productoParaAgregar;
}

function iniciarTienda() {
  const carrito = new CarritoDeCompras();
  console.log("======================================");
  console.log("  ¡Bienvenido a la simulación de Amazon!");
  console.log("======================================");

  while (true) {
    console.log("\n--- MENÚ PRINCIPAL ---");
    console.log("1. Ver y agregar productos");
    console.log("2. Ver carrito"); // Modificado (ya no dice "y pagar")
    console.log("3. Salir");
    const opcion = prompt("Elige una opción (1-3): ");

    switch (opcion) {
      case "1":
        const productosMostrados = mostrarCategoriasYProductos(INVENTARIO);
        const eleccion = prompt(
          `Escribe el número del producto a agregar (1-${productosMostrados.length}) (o '0' para volver): `
        );
        const eleccionNum = parseInt(eleccion || "0");

        if (eleccionNum > 0 && eleccionNum <= productosMostrados.length) {
          const productoBase = productosMostrados[eleccionNum - 1];
          const productoConPromos = aplicarPromociones(productoBase);
          carrito.agregar(productoConPromos);
        } else if (eleccionNum !== 0) {
          console.log("Opción no válida.");
        }
        break; // --- MODIFICACIÓN COMPLETA DEL CASE 2 ---
      case "2":
        let enMenuCarrito = true; // Controla el sub-menú del carrito

        while (enMenuCarrito) {
          carrito.mostrarResumen();

          // Si el carrito está vacío, solo da la opción de volver.
          if (carrito.estaVacio()) {
            prompt("\nPresiona Enter para volver al menú...");
            enMenuCarrito = false; // Salir del sub-menú
            break; // Salir del while
          }

          // Si el carrito NO está vacío, muestra las nuevas opciones
          console.log("\n--- OPCIONES DEL CARRITO ---");
          console.log("1. Pagar (Simulación)");
          console.log("2. Quitar un producto");
          console.log("3. Volver al menú principal");
          const opcionCarrito = prompt("Elige una opción (1-3): ");

          switch (opcionCarrito) {
            case "1": // Pagar
              console.log("\nProcesando pago...");
              console.log(
                "¡Gracias por tu compra! Tu carrito ha sido vaciado."
              );
              carrito.vaciar(); // Vacía el carrito
              prompt("Presiona Enter para volver al menú principal...");
              enMenuCarrito = false; // Sale del sub-menú del carrito
              break;

            case "2": // Quitar producto
              const itemsEnCarrito = carrito.getItems().length;
              const eleccionQuitar = prompt(
                `Escribe el número del producto a quitar (1-${itemsEnCarrito}) (o '0' para cancelar): `
              );
              const eleccionQuitarNum = parseInt(eleccionQuitar || "0");

              if (
                eleccionQuitarNum > 0 &&
                eleccionQuitarNum <= itemsEnCarrito
              ) {
                const quitado = carrito.quitarItem(eleccionQuitarNum);
                if (quitado) {
                  console.log(
                    `\n[Carrito] "${quitado.getNombre()}" ha sido eliminado.`
                  );
                }
              } else if (eleccionQuitarNum === 0) {
                // No hace nada, solo vuelve a mostrar el carrito
              } else {
                console.log("Número de producto no válido.");
              }
              break;

            case "3": // Volver
              enMenuCarrito = false; // Sale del sub-menú del carrito
              break; // Vuelve al menú principal

            default:
              console.log("Opción no válida. Por favor, elige 1, 2 o 3.");
          }
        }
        break;
      case "3":
        console.log("\n¡Gracias por visitar! Vuelve pronto.");
        return;
      default:
        console.log("Opción no válida. Por favor, elige 1, 2 o 3.");
    }
  }
}

iniciarTienda();

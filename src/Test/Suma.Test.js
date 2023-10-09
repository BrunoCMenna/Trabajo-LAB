// Ejercicio 1: Función de suma
// Escribe una función llamada sum que tome dos números como argumentos y devuelva su suma. Luego, escribe pruebas unitarias para verificar que la función funcione correctamente para diferentes casos de entrada.
import { sum } from "../components/Suma";

describe("testeando solo la función suma por ahora", () => {
  describe("sum", () => {
    test("debe retornar 8", () => {
      expect(sum(4, 4)).toBe(8);
    });
  });
});

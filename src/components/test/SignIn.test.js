import { Validation } from "../SignIn/SignIn";

describe('Validation function', () => {
  it('should return a toast error when email is empty', () => {
    const values = { email: '', password: 'password123', firstName: 'Juan', lastName: 'Pérez' };
    expect(() => Validation(values)).toThrow('El email no puede ser vacío');
  });

  it('should return a toast error when email is invalid', () => {
    const values = { email: 'invalidEmail', password: 'password123', firstName: 'Juan', lastName: 'Pérez' };
    expect(() => Validation(values)).toThrow('Ingrese un email válido');
  });

  it('should return a toast error when password is empty', () => {
    const values = { email: 'juan.perez@example.com', password: '', firstName: 'Juan', lastName: 'Pérez' };
    expect(() => Validation(values)).toThrow('Contraseña es obligatoria');
  });

  it('should return a toast error when password is invalid', () => {
    const values = { email: 'juan.perez@example.com', password: 'password', firstName: 'Juan', lastName: 'Pérez' };
    expect(() => Validation(values)).toThrow('Mínimo de 8 caracteres con un número');
  });

  it('should return a toast error when firstName is empty', () => {
    const values = { email: 'juan.perez@example.com', password: 'password123', firstName: '', lastName: 'Pérez' };
    expect(() => Validation(values)).toThrow('Nombre no puede ser vacío');
  });

  it('should return a toast error when lastName is empty', () => {
    const values = { email: 'juan.perez@example.com', password: 'password123', firstName: 'Juan', lastName: '' };
    expect(() => Validation(values)).toThrow('Apellido no puede ser vacío');
  });

  it('should not return any errors when all fields are valid', () => {
    const values = { email: 'juan.perez@example.com', password: 'password123', firstName: 'Juan', lastName: 'Pérez' };
    expect(Validation(values)).toEqual({});
  });
});

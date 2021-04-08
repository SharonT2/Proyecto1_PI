import { Curso } from './Curso';

describe('Curso', () => {
  it('should create an instance', () => {
    expect(new Curso(0, 0,"",0)).toBeTruthy();
  });
});
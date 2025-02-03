export default class ValidadorDeSenha {
  static hasUpperCase(str: string) {
    return /[A-Z]/.test(str);
  }

  static hasLowerCase(str: string) {
    return /[a-z]/.test(str);
  }

  static hasNumber(str: string) {
    return /\d/.test(str);
  }

  static hasSpecialChar(str: string) {
    return /[!@#$%^&*(),.?":{}|<>]/.test(str);
  }
}

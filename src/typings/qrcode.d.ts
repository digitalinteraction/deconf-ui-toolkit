declare module 'qrcodejs' {
  export class Matrix {}

  export default class QrCode {
    static generate(input: string): Matrix;
    static render(mode: 'svg-uri', matrix: Matrix): string;
  }
}

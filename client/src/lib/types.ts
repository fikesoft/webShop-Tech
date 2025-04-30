/**
 * A map from field name (string) → array of error strings
 * e.g. { email: ['Invalid email'], password: ['Too short'] }
 */
export type ResponseError<K extends string = string> = {
  [key in K]?: string[]
}

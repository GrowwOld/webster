export type ResponseType = {
  data: string | null;
  error: string | null;
}

export type CipherOptionType = {
  iv?: CryptoJS.lib.WordArray;
  format?: any ;
  [key:string]:any;
}

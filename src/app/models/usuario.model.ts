

export class Usuario{


    constructor(
      public nombre:String,
      public email:String,
      public password:String,
      public img?:String,//? significa parametro opcional cuando se integra las demas propiedad deben ser opcional
      public role?:String,
      public google?:Boolean,
      public _id?:String,


    ){
    }

}
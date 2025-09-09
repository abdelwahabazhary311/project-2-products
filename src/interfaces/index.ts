export interface IProduct {
    id?: string | undefined;
    title:string;
    description:string;
    imageURL:string;
    price:string;
    colors:string[];
    categoury:{
        name:string;
        imageURL:string;
    }
}

export interface IFormInput{
    id:string;
    name:string;
    label:string;
    type:string
}
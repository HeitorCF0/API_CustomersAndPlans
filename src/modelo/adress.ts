export class Adress{
    private id: string;
    private clientId: string;
    private number: string;
    private street: string;
    private neighborhood: string;
    private city: string;
    private state: string;
    private complement: string|null;
    private cep: string;

    constructor(id: string = crypto.randomUUID().toString(), clientId: string, street: string, number: string, neighborhood: string, city: string, state: string, cep: string, complement: string|null = null) 
        {
        if(!clientId){
            throw new Error("Invalid client");
        }
        if(!street || !number || !city || !state || !cep){
            throw new Error("All fields are required, except complement");
        }
        this.id = id;
        this.clientId = clientId;
        this.number = number;
        this.street = street;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.cep = cep;
        this.complement = complement;
    }

    public static reconstruct(id: string, clientId: string, street: string, number: string, neighborhood: string, city: string, state: string, cep: string, complement: string|null = null){
        return new Adress(id, clientId, street, number, neighborhood, city, state, cep, complement);
    }

    public getId(){
        return this.id;
    }

    public getClientId(){
        return this.clientId;
    }

    public getNumber(){
        return this.number;
    }

    public getStreet(){
        return this.street;
    }

    public getNeighborhood(){
        return this.neighborhood;
    }

    public getCity(){
        return this.city;
    }

    public getState(){
        return this.state;
    }

    public getCep(){
        return this.cep;
    }

    public getComplement(){
        return this.complement;
    }
}
export class Email{
    private id: string;
    private clientId: string;
    private email: string;

    constructor(id: string = crypto.randomUUID().toString(), clientId: string, email: string) 
        {
        if(!clientId){
            throw new Error("Invalid client");
        }
        if(!email){
            throw new Error("Invalid email");
        }
        this.id = id;
        this.clientId = clientId;
        this.email = email;
    }

    public static reconstruct(id: string, clientId: string, email: string){
        return new Email(id, clientId, email);
    }

    public getId(){
        return this.id;
    }

    public getClientId(){
        return this.clientId;
    }

    public getEmail(){
        return this.email;
    }
}
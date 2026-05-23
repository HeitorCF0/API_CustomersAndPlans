export class Phone{
    private id: string;
    private clientId: string;
    private phone: string;

    constructor(id: string = crypto.randomUUID().toString(), clientId: string, phone: string) 
        {
        if(!clientId){
            throw new Error("Invalid client");
        }
        if(!phone){
            throw new Error("Invalid phone");
        }
        this.id = id;
        this.clientId = clientId;
        this.phone = phone;
    }

    public static reconstruct(id: string, clientId: string, phone: string){
        return new Phone(id, clientId, phone);
    }

    public getId(){
        return this.id;
    }

    public getClientId(){
        return this.clientId;
    }

    public getPhone(){
        return this.phone;
    }
}
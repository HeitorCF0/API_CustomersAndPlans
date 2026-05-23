export enum UserRole {
    Admin = 'ADMIN',
    Worker = 'WORKER'
}

export type propsUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
}

export class User {
    constructor(private props: propsUser) {}

    public static construct(name: string, email: string, password: string, role: UserRole) {
        if (!name || !email || !password || !role) {
            throw new Error("All fields are required");
        }
        const props: propsUser = {
            id: crypto.randomUUID().toString(),
            name,
            email,
            password,
            role,
            createdAt: new Date()
        }
        return new User(props);
    }

    public static reconstruct(props: propsUser) {
        return new User(props);
    }

    public get id(){
        return this.props.id;
    }

    public get name(){
        return this.props.name;
    }

    public get email(){
        return this.props.email;
    }

    public get password(){
        return this.props.password;
    }

    public get role(){
        return this.props.role;
    }

    public get createdAt(){
        return this.props.createdAt;
    }
}
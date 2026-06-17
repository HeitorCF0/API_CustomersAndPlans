import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UserRole } from './src/model/user'


interface AuthRequest extends Request {
    user?: any;
}

export function authToken(req: AuthRequest, res: Response, next: NextFunction): void {
    try {
        const authHeader = req.headers['authorization'];

        // Validar se o header de autorização existe
        if (!authHeader) {
            res.status(401).json({ error: 'Authorization header is missing' });
            return;
        }

        // Extrair o token (formato: "Bearer <token>")
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            res.status(401).json({ error: 'Invalid authorization format. Use: Bearer <token>' });
            return;
        }

        const token = parts[1];

        if (!token) {
            res.status(401).json({ error: 'Token is missing' });
            return;
        }

        // Verificar o token JWT
        jwt.verify(token, process.env.JWT_SECRET, (err: jwt.VerifyErrors | null, user: any) => {
            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    res.status(401).json({ error: 'Token has expired' });
                    return;
                }
                if (err instanceof jwt.JsonWebTokenError) {
                    res.status(401).json({ error: 'Invalid token' });
                    return;
                }
                    res.status(401).json({ error: 'Token verification failed' });
                    return;
            }

            req.user = user;
            next();
        });
    } catch (error) {
    res.status(500).json({ error: 'Internal server error during authentication' });
    }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
    try {
        if (req.user == undefined) {
            res.status(401).json({ error: 'User is not authenticated' });
            return;
        }

        if (req.user.role !== UserRole.Admin) {
            res.status(403).json({ error: 'Access denied. Admin role required' });
            return;
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error during authorization' });
    }
}

export default authToken;
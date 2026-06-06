import { Request, Response } from 'express';
import { SubscriptionService } from "../service/subscription.service";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { SubscriptionCreateDTO, subscriptionStateUpdateDTO } from "../dto/subscription.dto";

export class SubscriptionControle {
    private subscriptionService: SubscriptionService

    constructor(subscriptionService: SubscriptionService) {
        this.subscriptionService = subscriptionService
    }

    public async create(req: Request, res: Response) {
        try {
            const subscriptionCreateDTO = plainToInstance(SubscriptionCreateDTO, req.body);
            const errors = await validate(subscriptionCreateDTO);

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            await this.subscriptionService.create(subscriptionCreateDTO);
            res.status(201).json({ message: "Subscription created successfully" });
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error creating subscription' });
        }
    }

    public async searchAll(req: Request, res: Response) {
        try {
            const subscriptionDTO = await this.subscriptionService.searchAll();
            res.status(200).json(subscriptionDTO);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error searching subscriptions' });
        }
    }

    public async searchById(req: Request, res: Response) {
        try {
            const id = Array.isArray(req.params.id)? req.params.id[0] : req.params.id;
            const subscription = await this.subscriptionService.searchById(id);
            if (!subscription) {
                return res.status(404).json({ message: "Subscription not found" });
            }
            res.status(200).json(subscription);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error searching subscription' });
        }
    }

    public async updateState(req: Request, res: Response) {
        try {            
            const id = Array.isArray(req.params.id)? req.params.id[0] : req.params.id;
            const newState = plainToInstance(subscriptionStateUpdateDTO, req.body);
            const errors = await validate(newState);

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            await this.subscriptionService.updateState(id, newState.state);
            res.status(200).json({ message: "Subscription state updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error updating subscription' });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const id = Array.isArray(req.params.id)? req.params.id[0] : req.params.id;
            await this.subscriptionService.delete(id);
            res.status(200).json({ message: "Subscription deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error deleting subscription' });
        }
    }
}
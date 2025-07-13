import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { items } = req.body;
      const userId = req.user!.userId;
      const order = await this.orderService.createOrder(userId, items);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const order = await this.orderService.getOrderById(Number(req.params.id));
      if (!order) {
        res.status(404).json({ message: 'Orden no encontrada' });
        return;
      }
      res.json(order);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserOrders(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || typeof req.user.userId !== 'number') {
        console.error('No se encontró userId en req.user:', req.user);
        res.status(401).json({ message: 'No autorizado: userId no encontrado en el token' });
        return;
      }
      const userId = req.user.userId;
      console.log('userId extraído del token:', userId);
      const orders = await this.orderService.getUserOrders(userId);
      res.json(orders);
    } catch (error: any) {
      console.error('Error en getUserOrders:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.body;
      const order = await this.orderService.updateOrderStatus(Number(req.params.id), status);
      res.json(order);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

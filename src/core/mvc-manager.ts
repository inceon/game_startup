import { Application } from 'pixi.js';
import AbstractController from '../scenes/abstract/abstract.controller';

export default class MVCManager {
    protected controllers: Map<string, AbstractController> = new Map();
    protected app: Application;
    private static instance: MVCManager;

    private constructor() {}

    /**
     * Get controllers service instance
     */
    public static getInstance(): MVCManager {
        if (!MVCManager.instance) {
            MVCManager.instance = new MVCManager();
        }
        return MVCManager.instance;
    }

    public setApplication(app: Application): void {
        this.app = app;
    }

    /**
     * Add MVC to controllers list
     * @param name - name of the scene
     * @param controller {AbstractController} - controller of the scene
     * @param view {AbstractView} - view of the scene
     * @param model {AbstractModel} - model of the scene
     */
    public addScene(
        name: string,
        controller: any,
        view: any,
        model: any
    ): void {
        if (this.controllers.has(name)) {
            throw new Error(`Scene ${name} already exists`);
        }
        let sceneView = new view(name, this.app.stage);
        let sceneModel = new model();
        this.controllers.set(name, new controller(sceneView, sceneModel));
    }

    /**
     * Get scene by name
     * @param name
     */
    public getScene(name: string): AbstractController {
        if (!this.controllers.has(name)) {
            throw new Error(`Scene ${name} doesn't exist`);
        }
        return this.controllers.get(name) as AbstractController;
    }
}

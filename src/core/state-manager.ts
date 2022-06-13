import AbstractController from '../scenes/abstract/abstract.controller';

/**
 * State manager for a game
 */
export default class StateManager {
    private static instance: StateManager;
    protected states: Map<string, AbstractController>;
    protected currentState: AbstractController;

    private constructor() {
        this.states = new Map();
    }

    /**
     * Get state manager instance
     */
    public static getInstance(): StateManager {
        if (!StateManager.instance) {
            StateManager.instance = new StateManager();
        }
        return StateManager.instance;
    }

    /**
     * Add MVC to controllers list
     * @param name
     * @param scene - controller of the state
     */
    public addState(name: string, scene: AbstractController): void {
        this.states.set(name, scene);
    }

    /**
     * Change current state to another
     * @param name
     */
    public changeState(name: string): void {
        if (!this.states.has(name)) {
            throw new Error(`State ${name} doesn't exist`);
        }
        if (this.currentState) {
            this.currentState.hideScene();
        }
        console.log('Changing state to ' + name);
        this.currentState = this.states.get(name) as AbstractController;
        this.currentState.showScene();
    }
}

import { Application } from 'pixi.js';
import MVCManager from './core/mvc-manager';
import StateManager from './core/state-manager';
import Screen from './misc/app.constants';
import ScenesNames from './misc/scenes.names';
import States from './misc/states.names';
import AbstractController from './scenes/abstract/abstract.controller';
import AbstractModel from './scenes/abstract/abstract.model';
import IntroView from './scenes/intro/intro.view';
import PreloaderController from './scenes/preloader/preloader.controller';
import PreloaderView from './scenes/preloader/preloader.view';
import './style.css';

class Game {
    protected app: Application;
    protected appDOMElement: HTMLElement | null;
    protected mvcManager: MVCManager;
    protected stateManager: StateManager;

    constructor() {
        this.app = new Application({
            width: Screen.WIDTH,
            height: Screen.HEIGHT
        });
        this.addPixiToDOM();
        this.initManagers();
        this.initScenes();
        this.initStates();
        this.stateManager.changeState(States.PRELOADER);
    }

    /**
     * Add pixi.js to DOM
     * @protected
     */
    protected addPixiToDOM(): void {
        this.appDOMElement = document.getElementById('app');
        if (this.appDOMElement) {
            this.appDOMElement.appendChild(this.app.renderer.view);
        }
    }

    /**
     * Initialize managers
     * @protected
     */
    protected initManagers(): void {
        this.stateManager = StateManager.getInstance();
        this.mvcManager = MVCManager.getInstance();
        this.mvcManager.setApplication(this.app);
    }

    /**
     * Initialize scenes
     * @protected
     */
    protected initScenes(): void {
        this.mvcManager.addScene(
            ScenesNames.PRELOADER,
            PreloaderController,
            PreloaderView,
            AbstractModel
        );
        this.mvcManager.addScene(
            ScenesNames.INTRO,
            AbstractController,
            IntroView,
            AbstractModel
        );
    }

    /**
     * Initialize states
     * @protected
     */
    protected initStates(): void {
        this.stateManager.addState(
            States.PRELOADER,
            this.mvcManager.getScene(ScenesNames.PRELOADER)
        );
        this.stateManager.addState(
            States.INTRO,
            this.mvcManager.getScene(ScenesNames.INTRO)
        );
    }
}

window.onload = () => {
    new Game();
};

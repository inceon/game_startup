// @ts-ignore
import * as PIXI from 'pixi.js';
import { Application } from 'pixi.js';
import MVCManager from './core/mvc-manager';
import StateManager from './core/state-manager';
import Screen from './misc/app.constants';
import AssetsNames from './misc/assets.names';
import ScenesNames from './misc/scenes.names';
import States from './misc/states.names';
import AbstractController from './scenes/abstract/abstract.controller';
import AbstractModel from './scenes/abstract/abstract.model';
import GameController from './scenes/game/game.controller';
import GameModel from './scenes/game/game.model';
import GameView from './scenes/game/game.view';
import IntroView from './scenes/intro/intro.view';
import PreloaderController from './scenes/preloader/preloader.controller';
import PreloaderView from './scenes/preloader/preloader.view';
import { LoaderService } from './services/loader.service';
import RescaleService from './services/rescale.service';
import './style.css';
// @ts-ignore
window.PIXI = PIXI;

class Game {
    protected app: Application;
    protected appDOMElement: HTMLElement | null;
    protected mvcManager: MVCManager;
    protected stateManager: StateManager;

    constructor() {
        let rendererOptions = {
            backgroundAlpha: 1,
            resolution: Math.min(
                Screen.MAX_RESOLUTION,
                window.devicePixelRatio
            ),
            autoDensity: true,
            backgroundColor: 0xeeeeee
        };
        this.app = new Application({
            width: Screen.WIDTH,
            height: Screen.HEIGHT,
            ...rendererOptions
        });
        this.addPixiToDOM();
        this.initManagers();
        this.initScenes();
        this.initServices();
        this.initStates();
        this.loadInitialAssets();
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
        this.mvcManager.addScene(
            ScenesNames.GAME,
            GameController,
            GameView,
            GameModel
        );
    }

    /**
     * Initialize services
     * @protected
     */
    protected initServices(): void {
        RescaleService.getInstance().init(this.app);
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
        this.stateManager.addState(
            States.GAME,
            this.mvcManager.getScene(ScenesNames.GAME)
        );
    }

    /**
     * Load initial assets
     */
    protected loadInitialAssets(): void {
        LoaderService.getInstance()
            .loadAll(AssetsNames.PRELOADER_ASSETS)
            .then(() => {
                this.stateManager.changeState(States.PRELOADER);
            });
    }
}

window.onload = () => {
    new Game();
};

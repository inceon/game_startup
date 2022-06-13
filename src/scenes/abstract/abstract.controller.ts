import AbstractModel from './abstract.model';
import AbstractView from './abstract.view';

export default class AbstractController {
    protected scene: AbstractView;
    protected model: AbstractModel;

    /**
     * Initialize controller
     * @param scene
     * @param model
     */
    constructor(scene: AbstractView, model: AbstractModel) {
        this.scene = scene;
        this.model = model;
    }

    /**
     * Show the scene
     */
    showScene(): void {
        this.scene.show();
    }

    /**
     * Hide the scene
     */
    hideScene(): void {
        this.scene.hide();
    }
}

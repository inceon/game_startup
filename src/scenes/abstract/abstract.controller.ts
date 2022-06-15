import AbstractModel from './abstract.model';
import AbstractView from './abstract.view';

export default class AbstractController {
    protected viewComponent: AbstractView;
    protected modelComponent: AbstractModel;

    /**
     * Getter for view component
     */
    protected get view(): AbstractView {
        return this.viewComponent as AbstractView;
    }

    /**
     * Getter for model component
     */
    protected get model(): AbstractModel {
        return this.modelComponent as AbstractModel;
    }

    /**
     * Initialize controller
     * @param view
     * @param model
     */
    constructor(view: AbstractView, model: AbstractModel) {
        this.viewComponent = view;
        this.modelComponent = model;
    }

    /**
     * Show the view
     */
    showScene(): void {
        this.viewComponent.show();
    }

    /**
     * Hide the view
     */
    hideScene(): void {
        this.viewComponent.hide();
    }
}

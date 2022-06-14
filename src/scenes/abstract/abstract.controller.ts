import AbstractModel from './abstract.model';
import AbstractView from './abstract.view';

export default class AbstractController {
    protected view: AbstractView;
    protected model: AbstractModel;

    /**
     * Initialize controller
     * @param view
     * @param model
     */
    constructor(view: AbstractView, model: AbstractModel) {
        this.view = view;
        this.model = model;
    }

    /**
     * Show the view
     */
    showScene(): void {
        this.view.show();
    }

    /**
     * Hide the view
     */
    hideScene(): void {
        this.view.hide();
    }
}

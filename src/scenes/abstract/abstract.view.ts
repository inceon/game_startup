import { ease } from 'pixi-ease';
import { Container } from 'pixi.js';

export default class AbstractView {
    public display: Container;
    public name: string;
    public changeSceneDuration: number = 500;

    /**
     * @param name - Name of the scene
     * @param stage
     */
    constructor(name: string, stage: Container) {
        this.name = name;
        this.createDisplay();
        stage.addChild(this.display);
    }

    createDisplay(): void {
        this.display = new Container();
        this.display.name = this.name;
        this.display.visible = false;
        this.display.alpha = 0;
    }

    /**
     * Get scene display object
     * @returns {Container}
     */
    public getDisplay(): Container {
        return this.display;
    }

    /**
     * Show scene
     */
    show(): void {
        this.display.visible = true;
        this.display.alpha = 0;
        let showTween = ease.add(
            this.display,
            {
                alpha: 1
            },
            {
                duration: this.changeSceneDuration
            }
        );
        showTween.on('complete', this.onShowComplete.bind(this));
    }

    /**
     * Called when scene is shown
     */
    onShowComplete(): void {}

    /**
     * Hide scene
     */
    hide(): void {
        let hideTween = ease.add(
            this.display,
            {
                alpha: 0
            },
            {
                duration: this.changeSceneDuration
            }
        );
        hideTween.on('complete', this.onHideComplete.bind(this));
    }

    /**
     * Called when scene is hidden
     */
    onHideComplete(): void {
        this.display.visible = false;
    }
}

import { ease } from 'pixi-ease';
import { Graphics } from 'pixi.js';
import AbstractView from '../abstract/abstract.view';

export default class IntroView extends AbstractView {
    protected rectangle: Graphics;

    /**
     * @inheritDoc
     */
    public show() {
        super.show();
        this.drawRectangle();
        this.goRotation();
    }

    public drawRectangle(): void {
        this.rectangle = new Graphics();
        this.rectangle.beginFill(0xffaa00);
        this.rectangle.drawRect(300, 300, 200, 250);
        this.rectangle.endFill();
        this.display.addChild(this.rectangle);
    }

    public goRotation(): void {
        ease.add(this.rectangle, { rotation: 250 }, { duration: 2000 });
    }
}

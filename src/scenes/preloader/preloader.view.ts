import { Graphics } from 'pixi.js';
import AbstractView from '../abstract/abstract.view';

export default class PreloaderView extends AbstractView {
    /**
     * @inheritDoc
     */
    public show(): void {
        super.show();
        this.drawRectangle();
    }

    public drawRectangle(): void {
        let rectangle = new Graphics();
        rectangle.beginFill(0x00ffff);
        rectangle.drawRect(0, 0, 200, 200);
        rectangle.endFill();
        this.display.addChild(rectangle);
    }
}

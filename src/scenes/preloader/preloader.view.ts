import { ease, Easing } from 'pixi-ease';
import { Graphics, Sprite } from 'pixi.js';
import Screen from '../../misc/app.constants';
import AssetsNames from '../../misc/assets.names';
import { LoaderService } from '../../services/loader.service';
import AbstractView from '../abstract/abstract.view';

export default class PreloaderView extends AbstractView {
    protected barWidth: number = 500;
    protected barHeight: number = 50;
    protected barAnimation: Easing;
    protected bar: Graphics;
    /**
     * @inheritDoc
     */
    public show(): void {
        super.show();
        this.drawBar();
        this.drawLogo();
    }

    protected drawBar(): void {
        this.bar = new Graphics();
        this.bar.beginFill(0xcccccc);
        this.bar.drawRect(
            Screen.CENTER.x - this.barWidth / 2,
            Screen.CENTER.y,
            1,
            this.barHeight
        );
        this.bar.endFill();
        this.display.addChild(this.bar);
    }

    public onShowComplete() {
        super.onShowComplete();
        this.animateBar(this.bar);
    }

    protected drawLogo(): void {
        const logo = new Sprite(
            LoaderService.getInstance().getResource(
                AssetsNames.PRELOADER_ASSETS.LOGO
            ).texture
        );
        logo.scale.set(0.2);
        logo.position.set(
            Screen.CENTER.x - logo.width / 2,
            Screen.CENTER.y - logo.height - 20
        );
        this.display.addChild(logo);
    }

    protected animateBar(bar: Graphics): void {
        this.barAnimation = ease.add(
            bar,
            {
                alpha: 0
            },
            {
                reverse: true,
                repeat: true,
                duration: 1000
            }
        );
    }

    public setProgress(progress: number): void {
        this.bar.clear();
        this.bar.beginFill(0xcccccc);
        this.bar.drawRect(
            Screen.CENTER.x - this.barWidth / 2,
            Screen.CENTER.y,
            this.barWidth * progress,
            this.barHeight
        );
        this.bar.endFill();
    }
}

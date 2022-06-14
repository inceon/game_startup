import { AbstractRenderer, Renderer } from '@pixi/core';
import { Application, Container } from 'pixi.js';
import Screen from '../misc/app.constants';
import DeviceUtils from '../utils/device.utils';

export default class RescaleService {
    private static instance: RescaleService;
    protected gameScreen: Container;
    protected ratio: number;
    protected renderer: Renderer | AbstractRenderer;

    private constructor() {}

    /**
     * Get rescale service instance
     */
    public static getInstance(): RescaleService {
        if (!RescaleService.instance) {
            RescaleService.instance = new RescaleService();
        }
        return RescaleService.instance;
    }

    public init(app: Application): void {
        this.gameScreen = app.stage;
        this.renderer = app.renderer;
        this.rescale();
        window.addEventListener('resize', this.rescale.bind(this), false);
    }

    public rescale(): void {
        this.ratio = Number(
            Math.min(
                DeviceUtils.getClientWidth() / Screen.WIDTH,
                DeviceUtils.getClientHeight() / Screen.HEIGHT
            ).toFixed(2)
        );

        this.ratio = Math.min(this.ratio, 1.0);

        this.gameScreen.scale.set(this.ratio);
        if (
            DeviceUtils.getClientWidth() > Screen.WIDTH &&
            DeviceUtils.getClientHeight() > Screen.HEIGHT
        ) {
            this.renderer.resize(Screen.WIDTH, Screen.HEIGHT);
        } else {
            this.renderer.resize(
                Screen.WIDTH * this.ratio,
                Screen.HEIGHT * this.ratio
            );
        }

        // this.renderer.resize(
        //     Math.min(DeviceUtils.getClientWidth(), Screen.WIDTH),
        //     Math.min(DeviceUtils.getClientHeight(), Screen.HEIGHT)
        // );
    }
}

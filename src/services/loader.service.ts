import { Loader, Texture } from 'pixi.js';
import AssetsNames from '../misc/assets.names';

export class LoaderService {
    private static instance: LoaderService;
    private loader: Loader;
    private static readonly ASSETS_PATH: string = AssetsNames.PATH;

    private constructor() {
        this.loader = new Loader();
    }

    /**
     * Get loader service instance
     */
    public static getInstance(): LoaderService {
        if (!LoaderService.instance) {
            LoaderService.instance = new LoaderService();
        }
        return LoaderService.instance;
    }

    /**
     * Load asset
     * @param name
     * @param url
     */
    public load(name: string, url: string): void {
        this.loader.add(name, url);
    }

    /**
     * Load all assets
     * @param assets
     */
    public loadAll(assets: any): void {
        for (let name in assets) {
            this.load(assets[name], LoaderService.ASSETS_PATH + assets[name]);
        }
    }

    /**
     * Start loading
     * @param assets
     * @param callback
     */
    public loadAllAndRun(assets: any, callback: () => void): void {
        this.loadAll(assets);
        this.loader.load(callback);
    }

    /**
     * Get loader assets
     */
    public getLoader(): Loader {
        return this.loader;
    }

    /**
     * Get loaded asset by name
     * @param name
     */
    public getResource(name: string): any {
        return this.loader.resources[name];
    }

    /**
     * Get loaded asset by name as texture
     * @param name
     */
    public getResourceAsTexture(name: string): Texture {
        let texture = this.loader.resources[name].texture;
        if (texture) {
            return texture;
        } else {
            throw new Error(`Texture ${name} not found`);
        }
    }

    /**
     * Add progress callback
     */
    public addProgressCallback(
        callback: (loader: Loader, resource: any) => void
    ): void {
        this.loader.onProgress.add(callback);
    }
}

export default class ApiService {
    private static instance: ApiService;

    private constructor() {}

    /**
     * Get api service instance
     */
    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    public getUserData(): Promise<any> {
        return new Promise((resolve) => {
            resolve({
                name: 'John',
                age: 30
            });
        });
    }
}

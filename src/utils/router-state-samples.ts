import { RouterStateSer } from 'router-store-ser';
import { startRouteId } from '../app/app-routing.module';

export const startRouterState: RouterStateSer = {
    url: '/start',
    root: {
        configPath: 'start',
        data: {
            uid: startRouteId,
        },
        children: [],
        params: {},
    },
};

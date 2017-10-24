import { examRouterCommands } from '../app/app-routing.module';

/**
 * This file is the only place where this module know about its exterior.
 * Configure here all that information.
 */

/**
 * Module name.
 */
export const featureName = 'exam';

/**
 * The Router.navigate() commands that lead to this module routing. That is this module's placement in the URL.
 */
export const moduleNavigationCommands = examRouterCommands;

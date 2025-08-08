import { Routes } from '@angular/router';
import { Terminal } from './components/terminal/terminal';
import { Projects } from './components/projects/projects';

export const routes: Routes = [
    { path: '', component: Terminal },
    { path: 'test', component: Projects }
];

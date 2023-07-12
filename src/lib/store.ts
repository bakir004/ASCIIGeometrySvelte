import { writable } from 'svelte/store';

export const shapeProperties = writable({
    donutRadius: 2.5,
    donutThicknessRadius: 1.25,
    xIncrement: 0.1,
    yIncrement: 0,
    zIncrement: 0.1,
    distanceOfDonutFromViewer: 36,
    alphaSpacing: 0.07,
    betaSpacing: 0.02,
    lightSourceX: 0,
    lightSourceY: 1,
    lightSourceZ: -1
});
const ACFD_SincBoard = JXG.JSXGraph.initBoard('ACFD_SincBoard', { 
    boundingbox: [-30, 1.5, 30, -0.5], axis:true, showNavigation: false, showCopyright: false
});

function sinc(x){
    if(x==0){
        return 1;
    }
    else
    return Math.sin(x*Math.PI)/(x*Math.PI);
}

ACFD_SincBoard.create('functiongraph', [function(x){return sinc(x)}]);

const PDTD_RectTrainBoard = JXG.JSXGraph.initBoard('PDTD_RectTrainBoard', { 
    boundingbox: [-3, 0.4, 3, -0.25], axis:true, showNavigation: false, showCopyright: false});
 
PDTD_RectTrainBoard.defaultAxes.x.setAttribute({name:'t'.bold().fontsize(5), withLabel: true});

var PDTD_RectImpulseArrayNeg = [];
var PDTD_RectImpulseArrayPos = [];

PDFD_SincTrainBoard.addChild(PDTD_RectTrainBoard);

var ini_ifftDataArr = [...PDFD_sincTrainifftDataRe];
while(ini_ifftDataArr.length/2<= PDFD_numImpulse){
          Array.prototype.push.apply(ini_ifftDataArr, PDFD_sincTrainifftDataRe);
}
ini_ifftDataArr = ini_ifftDataArr.map(x =>x/AD_sliderStart);

PDTD_RectTrainBoard.suspendUpdate();

var PDTD_DiscreteAxis = PDTD_RectTrainBoard.create('axis', [[0,-0.06],[1,-0.06]],{needsRegularUpdate:true,ticks:{majorHeight: 20},name:'n'.bold().fontsize(5), withLabel: true});
PDTD_DiscreteAxis.defaultTicks.ticksFunction = function () {return 5};
PDTD_DiscreteAxis.defaultTicks.setAttribute({scale:1/PDFD_fs});

for(var i=0; i<PDFD_numImpulse; i++){
    
    PDTD_RectImpulseArrayPos.push(PDTD_RectTrainBoard.create('line',[[(1/PDFD_fs)*i,0],[(1/PDFD_fs)*i,ini_ifftDataArr[i]]],{straightFirst: false, straightLast: false, strokeWidth: 1.5}));
    PDTD_RectImpulseArrayPos[i].point2.showElement();
    PDTD_RectImpulseArrayPos[i].point2._set('fillColor','blue');
    
    PDTD_RectImpulseArrayNeg.push(PDTD_RectTrainBoard.create('line',[[-(1/PDFD_fs)*i,0],[-(1/PDFD_fs)*i,ini_ifftDataArr[i]]],{straightFirst: false, straightLast: false, strokeWidth: 1.5}));
    PDTD_RectImpulseArrayNeg[i].point2.showElement();
    PDTD_RectImpulseArrayNeg[i].point2._set('fillColor','blue');
}
Ts_Line = PDTD_RectTrainBoard.create(`line`,[[0,0.33],[1/PDFD_fs,0.33]],{straightFirst: false, straightLast:false, firstArrow: true, lastArrow: true, name:function(){return 'Ts = '+ Math.round(1000/PDFD_fs)/1000}, withLabel: true});
To_Line = PDTD_RectTrainBoard.create(`line`,[[0,0.28],[PDTD_To,0.28]],{straightFirst: false, straightLast:false, firstArrow: true, lastArrow: true, name:function(){return 'To = '+ Math.round(1000*PDTD_To)/1000+
', No = '+Nnaught}, withLabel: true});

PDTD_RectTrainBoard.unsuspendUpdate();

function PDTD_doItRectTrain(){

    var temp_arr = [...PDFD_sincTrainifftDataRe];
    while(PDFD_sincTrainifftDataRe.length/2<= PDFD_numImpulse){
          Array.prototype.push.apply(PDFD_sincTrainifftDataRe, temp_arr);
    }
    PDFD_sincTrainifftDataRe = PDFD_sincTrainifftDataRe.map(x =>x/fsNo_Slider.Value());

    for(var i=0; i<PDFD_numImpulse; i++){
        
        
        PDTD_RectImpulseArrayPos[i].point1.setPositionDirectly(JXG.COORDS_BY_USER,[i*(1/PDFD_fs),0]);  
        PDTD_RectImpulseArrayPos[i].point2.setPositionDirectly(JXG.COORDS_BY_USER,[i*(1/PDFD_fs),PDFD_sincTrainifftDataRe[i]]);
        
        PDTD_RectImpulseArrayNeg[i].point1.setPositionDirectly(JXG.COORDS_BY_USER,[-i*(1/PDFD_fs),0]);       
        PDTD_RectImpulseArrayNeg[i].point2.setPositionDirectly(JXG.COORDS_BY_USER,[-i*(1/PDFD_fs),PDFD_sincTrainifftDataRe[i]]);
        
    }
    
    Ts_Line.point2.setPositionDirectly(JXG.COORDS_BY_USER, [1/PDFD_fs,0.33]);
    To_Line.point2.setPositionDirectly(JXG.COORDS_BY_USER, [PDTD_To,0.28]);
    
}


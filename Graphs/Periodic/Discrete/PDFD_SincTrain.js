const PDFD_SincTrainBoard = JXG.JSXGraph.initBoard('PDFD_SincTrainBoard', { 
    boundingbox: [-40, 1.7, 40, -1.2], axis:true, showNavigation: false, showCopyright: false});

PDFD_SincTrainBoard.defaultAxes.x.setAttribute({name:'f'.bold().fontsize(5), withLabel: true});

var AD_sliderStart = 8;
var ToNo_SliderStart = 0;
var PDFD_fs = 10;
var PDTD_To = 0.8;
var Nnaught = AD_sliderStart;

var fsNo_Slider = PDFD_SincTrainBoard.create('slider',[[5,-0.9],[20,-0.9],[AD_sliderStart,AD_sliderStart,32]],{snapWidth:1, withLabel: false, withTicks:false});
PDFD_SincTrainBoard.create('text', [-24.5, -0.9,'Change fo!'.bold().fontsize(4)],{fixed: true});

var ToNo_Slider = PDFD_SincTrainBoard.create('slider',[[-20,-0.9],[-5,-0.9],[0,ToNo_SliderStart,32]],{snapWidth:1, withLabel: false, withTicks:false});
PDFD_SincTrainBoard.create('text', [0.5, -0.9,'Change fs!'.bold().fontsize(4)],{fixed: true});

var PDFD_DiscreteAxis = PDFD_SincTrainBoard.create('axis', [[0,-0.3],[1,-0.3]],{needsRegularUpdate:true,ticks:{majorHeight: 20,scale:1/PDTD_To}, name:'r'.bold().fontsize(5),withLabel:true});
PDFD_DiscreteAxis.defaultTicks.ticksFunction = function () {return 5;};

var sam_period = 0.10;
var PDFD_numImpulse = 128;

var PDFD_sincImpulseArrayNeg = [];
var PDFD_sincImpulseArrayPos = [];

function PDFD_sincTrain(x, fs){
    
    var output=sinc(x);
    for(var i=1; i<8; i++){
        output += sinc(x-i*fs);
        output += sinc(x+i*fs);
    }
    
    return output;
}

PDFD_SincTrainBoard.create('functiongraph', [function(x){return PDFD_sincTrain(x,PDFD_fs);}],{strokeColor:'black'});

var PDFD_sincTrainData = [];
var PDFD_sincTrainifftDataRe = [];
var PDFD_sincTrainifftDataI = [];

PDFD_SincTrainBoard.suspendUpdate();

for(var i=0; i<PDFD_numImpulse; i++){
    
    PDFD_sincImpulseArrayPos.push(PDFD_SincTrainBoard.create('line',[[(1/sam_period)/AD_sliderStart*i,0],[(1/sam_period)/AD_sliderStart*i,PDFD_sincTrain((1/sam_period)/AD_sliderStart*i,PDFD_fs)]],{straightFirst: false, straightLast: false, strokeWidth: 1.5}));
    PDFD_sincImpulseArrayPos[i].point2.showElement();
    PDFD_sincImpulseArrayPos[i].point2._set('fillColor','blue');
    
    PDFD_sincImpulseArrayNeg.push(PDFD_SincTrainBoard.create('line',[[-(1/sam_period)/AD_sliderStart*i,0],[-(1/sam_period)/AD_sliderStart*i,PDFD_sincTrain(-(1/sam_period)/AD_sliderStart*i,PDFD_fs)]],{straightFirst: false, straightLast: false, strokeWidth: 1.5}));
    PDFD_sincImpulseArrayNeg[i].point2.showElement();
    PDFD_sincImpulseArrayNeg[i].point2._set('fillColor','blue');

}

fs_Line = PDFD_SincTrainBoard.create(`line`,[[0,1.4],[PDFD_fs,1.4]],{straightFirst: false, straightLast:false, firstArrow: true, lastArrow: true, name:function(){return 'fs = 1/Ts = '+ Math.round(1000*PDFD_fs)/1000+
', No\' = '+Nnaught}, withLabel: true});
fo_Line = PDFD_SincTrainBoard.create(`line`,[[0,1.2],[1/PDTD_To,1.2]],{straightFirst: false, straightLast:false, firstArrow: true, lastArrow: true, name:function(){return 'fo = 1/To = '+ Math.round(1000/PDTD_To)/1000}, withLabel: true});

PDFD_SincTrainBoard.unsuspendUpdate();

function PDFD_doItSincTrainfsNo(){
    
    PDFD_sincTrainData = [];
    PDFD_sincTrainifftDataRe = [];
    PDFD_sincTrainifftDataI = [];
    
    Nnaught = fsNo_Slider.Value() + ToNo_Slider.Value();
    PDFD_fs = Nnaught/PDTD_To;
    
    for(var i=0; i<PDFD_numImpulse; i++){
        
        PDFD_sincImpulseArrayPos[i].point1.setPositionDirectly(JXG.COORDS_BY_USER,[i*(1/PDTD_To),0]);  
        PDFD_sincImpulseArrayPos[i].point2.setPositionDirectly(JXG.COORDS_BY_USER,[i*(1/PDTD_To),PDFD_sincTrain((1/PDTD_To)*i,PDFD_fs)]);
        
        PDFD_sincImpulseArrayNeg[i].point1.setPositionDirectly(JXG.COORDS_BY_USER,[-i*(1/PDTD_To),0]);       
        PDFD_sincImpulseArrayNeg[i].point2.setPositionDirectly(JXG.COORDS_BY_USER,[-i*(1/PDTD_To),PDFD_sincTrain(-(1/PDTD_To)*i,PDFD_fs)]);
        
        PDFD_sincTrainData.push(PDFD_sincTrain((1/PDTD_To)*i,PDFD_fs));
    }
    PDFD_sincTrainData = PDFD_sincTrainData.slice(0,Nnaught);
    PDFD_sincTrainifftDataRe = PDFD_sincTrainData;
    PDFD_sincTrainifftDataI = new Array(Nnaught).fill(0);
    inverseTransform(PDFD_sincTrainifftDataRe,PDFD_sincTrainifftDataI);
    
    fs_Line.point2.setPositionDirectly(JXG.COORDS_BY_USER, [PDFD_fs,1.4]);
}

function PDFD_doItSincTrainToNo(){
    
    PDFD_sincTrainData = [];
    PDFD_sincTrainifftDataRe = [];
    PDFD_sincTrainifftDataI = [];
    
    Nnaught = fsNo_Slider.Value() + ToNo_Slider.Value();
    PDTD_To = Nnaught/PDFD_fs;
    
    for(var i=0; i<PDFD_numImpulse; i++){
        
        PDFD_sincImpulseArrayPos[i].point1.setPositionDirectly(JXG.COORDS_BY_USER,[i*(1/PDTD_To),0]);  
        PDFD_sincImpulseArrayPos[i].point2.setPositionDirectly(JXG.COORDS_BY_USER,[i*(1/PDTD_To),PDFD_sincTrain((1/PDTD_To)*i,PDFD_fs)]);
        
        PDFD_sincImpulseArrayNeg[i].point1.setPositionDirectly(JXG.COORDS_BY_USER,[-i*(1/PDTD_To),0]);       
        PDFD_sincImpulseArrayNeg[i].point2.setPositionDirectly(JXG.COORDS_BY_USER,[-i*(1/PDTD_To),PDFD_sincTrain(-(1/PDTD_To)*i,PDFD_fs)]);
        
        PDFD_sincTrainData.push(PDFD_sincTrain((1/PDTD_To)*i,PDFD_fs));
    }
    PDFD_sincTrainData = PDFD_sincTrainData.slice(0,Nnaught);
    PDFD_sincTrainifftDataRe = PDFD_sincTrainData;
    PDFD_sincTrainifftDataI = new Array(Nnaught).fill(0);
    inverseTransform(PDFD_sincTrainifftDataRe,PDFD_sincTrainifftDataI);
    
    fo_Line.point2.setPositionDirectly(JXG.COORDS_BY_USER, [1/PDTD_To,1.2]);
}

PDFD_doItSincTrainfsNo();
fsNo_Slider.on('drag',function(){
    PDFD_doItSincTrainfsNo();
    PDTD_doItRectTrain();
    PDTD_DiscreteAxis.defaultTicks.setAttribute({scale:1/PDFD_fs});
    
})
ToNo_Slider.on('drag',function(){
    PDFD_doItSincTrainToNo();
    PDTD_doItRectTrain();
    PDFD_DiscreteAxis.defaultTicks.setAttribute({scale:1/PDTD_To});
})

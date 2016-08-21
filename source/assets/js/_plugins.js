// Function to round a number to a specified decimal place
roundToNum = function(num,dec) {    
    return +(Math.round(num + "e+"+dec)  + "e-"+dec);
};

// https://code.google.com/p/domready/

(function(exports, d) {
  function domReady(fn, context) {

    function onReady(event) {
      d.removeEventListener("DOMContentLoaded", onReady);
      fn.call(context || exports, event);
    }

    function onReadyIe(event) {
      if (d.readyState === "complete") {
        d.detachEvent("onreadystatechange", onReadyIe);
        fn.call(context || exports, event);
      }
    }

    d.addEventListener && d.addEventListener("DOMContentLoaded", onReady) ||
    d.attachEvent      && d.attachEvent("onreadystatechange", onReadyIe);
  }

  exports.domReady = domReady;
})(window, document);

// https://github.com/toddmotto/apollo/blob/master/src/apollo.js

function hasClass(elem, className) {
      return new RegExp('(^|\\s)' + className + '(\\s|$)').test(elem.className);
    };
function removeClass(elem, className) {
    if (hasClass(elem, className)) {
        elem.className = elem.className.replace(new RegExp('(^|\\s)*' + className + '(\\s|$)*', 'g'), '');
    }
};
function addClass(elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += (elem.className ? ' ' : '') + className;
    }
};
function toggleClass(elem, className) {
    (hasClass(elem, className) ? removeClass : addClass)(elem, className);
};

// https://raw.githubusercontent.com/madebysource/animated-scrollto/master/animatedScrollTo.js

(function (window) {
    var requestAnimFrame = (function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();

    var easeInOutQuad = function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    var animatedScrollTo = function (element, to, duration, callback) {
        var start = element.scrollTop,
        change = to - start,
        animationStart = +new Date();
        var animating = true;
        var lastpos = null;

        var animateScroll = function() {
            if (!animating) {
                return;
            }
            requestAnimFrame(animateScroll);
            var now = +new Date();
            var val = Math.floor(easeInOutQuad(now - animationStart, start, change, duration));
            if (lastpos) {
                if (lastpos === element.scrollTop) {
                    lastpos = val;
                    element.scrollTop = val;
                } else {
                    animating = false;
                }
            } else {
                lastpos = val;
                element.scrollTop = val;
            }
            if (now > animationStart + duration) {
                element.scrollTop = to;
                animating = false;
                if (callback) { callback(); }
            }
        };
        requestAnimFrame(animateScroll);
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = animatedScrollTo;
    } else {
        window.animatedScrollTo = animatedScrollTo;
    }
})(window);

function OnScreen(options) {
    var self = this;

    var defaults = {
        scrollContainer: [document.body, document.documentElement, window],
        scroll: true,
        resize: true,
        load: true
    };

    self.options = mergeObjects(defaults, options || {});
    self.animFrame = null;
    self.items = [];
    self.map = {};
    self.update = update;
    self.util = {
        mergeObjects: mergeObjects
    };

    if (self.options.scroll) {
        [].forEach.call(self.options.scrollContainer, function(container) {
            container.addEventListener('scroll', update);
        });
    }

    if (self.options.resize) {
        window.addEventListener('resize', update);
    }

    if (self.options.load) {
        window.addEventListener('load', update);
    }


    function update() {
        if (!self.animFrame && self.items.length) {
            self.animFrame = requestAnimationFrame(process);
        }
    }


    function process() {
        self.animFrame = null;

        self.items.forEach(function (item) {

            var element = item.element;
            var options = item.options;

            var sideBefore = item.side;
            var isOnScreen = check(item);
            var sideAfter = item.side;
            var offset = item.offset;
            var detail = { side: isOnScreen ? sideBefore : sideAfter, offset: offset, data: options.data };

            var classes = element.getAttribute('class').match(new RegExp('\\b(' + options.screenEnterClass + '|' + options.screenLeaveClass + ')(-(-(top|bottom|left|right)){0,2})*', 'g')) || [];

            // Screen Enter
            if (isOnScreen) {

                // make sure to only fire once
                if (!item.onscreen) {
                    item.onscreen = true;

                    if (!dispatchEvent(element, 'screenenter', detail) ||
                        (options.onScreenEnter && options.onScreenEnter.call(element, detail) === false)) {
                        return
                    }

                    classes.forEach(function(item){
                        element.classList.remove(item);
                    });

                    element.classList.add(options.screenEnterClass);
                    element.classList.add(options.screenEnterClass + '--' + sideBefore);
                }
            }

            // Screen Leave
            else {

                // make sure to only fire once
                if (item.onscreen) {
                    item.onscreen = false;

                    if (!dispatchEvent(element, 'screenleave', detail) ||
                        (options.onScreenLeave && options.onScreenLeave.call(element, detail) === false)) {
                        return;
                    }
                    
                    classes.forEach(function(item){
                        element.classList.remove(item);
                    });

                    element.classList.add(options.screenLeaveClass);
                    element.classList.add(options.screenLeaveClass + '--' + sideAfter);
                }
            }

            // Screen Move
            if (!options.disableScreenMove && (isOnScreen || options.fireScreenMoveOffScreen)) {
                
                if (!dispatchEvent(element, 'screenmove', detail) ||
                    (options.onScreenMove && options.onScreenMove.call(element, detail) === false)) {
                    return;
                }
            }
        });
    }


    function check(item) {
        var targetBounds = item.element.getBoundingClientRect(),
            screenBounds = {
                top: 0,
                right: window.innerWidth,
                bottom: window.innerHeight,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };

        var targetRect = getModifiedRect(targetBounds, item.options.target),
            screenRect = getModifiedRect(screenBounds, item.options.screen);

        var offsetTop = targetRect.top - screenRect.top,
            offsetRight = screenRect.right - targetRect.right,
            offsetBottom = screenRect.bottom - targetRect.bottom,
            offsetLeft = targetRect.left - screenRect.left;

        var insideHeight = screenRect.height - targetRect.height,
            insideWidth = screenRect.width - targetRect.width;

        var outsideHeight = screenRect.height + targetRect.height,
            outsideWidth = screenRect.width + targetRect.width;

        var offset = {
            top: offsetTop / screenRect.height,
            right: offsetRight / screenRect.width,
            bottom: offsetBottom / screenRect.height,
            left: offsetLeft / screenRect.width,

            inside: {
                top: offsetTop / insideHeight,
                right: offsetRight / insideWidth,
                bottom: offsetBottom /insideHeight,
                left: offsetLeft / insideWidth
            },

            outside: {
                top: (targetRect.bottom - screenRect.top) / outsideHeight,
                right: (screenRect.right - targetRect.left) / outsideWidth,
                bottom: (screenRect.bottom - targetRect.top) / outsideHeight,
                left: (targetRect.right - screenRect.left) / outsideWidth
            }
        };

        var side = [];

        // check side: top / bottom
        if (targetRect.bottom <= screenRect.top) {
            side[side.length] = 'top';
        }
        else if (targetRect.top >= screenRect.bottom) {
            side[side.length] = 'bottom';
        }

        // check side: left / right
        if (targetRect.right <= screenRect.left) {
            side[side.length] = 'left';
        }
        else if (targetRect.left >= screenRect.right) {
            side[side.length] = 'right';
        }

        // set offset
        item.offset = offset;

        // set side and return visibility
        if (side.length) {
            item.side = side.join('-');
            return false;
        }
        else {
            return true;
        }
    }


    function getModifiedRect(rect, mods) {
        var width = rect.width || (rect.right - rect.left);
        var height = rect.height || (rect.bottom - rect.top);
        var modRect = {};

        mods = mods || {};

        modRect.top = rect.top + (mods.top ? getModifierValue(mods.top, height) : 0);
        modRect.right = rect.right - (mods.right ? getModifierValue(mods.right, width) : 0);
        modRect.bottom = rect.bottom - (mods.bottom ? getModifierValue(mods.bottom, height) : 0);
        modRect.left = rect.left + (mods.left ? getModifierValue(mods.left, width) : 0);

        modRect.width = modRect.right - modRect.left;
        modRect.height = modRect.bottom - modRect.top;

        return modRect;
    }


    function getModifierValue(modifier, range) {
        return /\d%$/.test(modifier) ? (parseFloat(modifier) / 100) * range : parseFloat(modifier || 0);
    }


    function dispatchEvent(element, name, data) {
        var event;

        if (typeof CustomEvent === 'function') {
            event = new CustomEvent(name, {
                detail: data,
                bubbles: true,
                cancelable: true
            });
        }
        else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(name, true, true, data);
        }

        return !!element.dispatchEvent(event);
    }


    function mergeObjects() {
        var destination = {};

        [].forEach.call(arguments, function(source) {
            for (var property in source) {
                if (source.hasOwnProperty(property)) {
                    if (source[property] && {}.toString.call(source[property]) === '[object Object]') {
                        destination[property] = mergeObjects(destination[property] || {}, source[property]);
                    } else {
                        destination[property] = source[property];
                    }
                }
            }
        });

        return destination;
    };
}

OnScreen.prototype.addItem = function(element, options) {
    var defaults = {
        screen: { top: 0, right: 0, bottom: 0, left: 0 },
        target: { top: 0, right: 0, bottom: 0, left: 0 },
        screenEnterClass: 'js-screenenter',
        screenLeaveClass: 'js-screenleave',
        onScreenEnter: null,
        onScreenLeave: null,
        onScreenMove: null,
        fireScreenMoveOffScreen: false,
        disableScreenMove: false
    };

    var index = this.items.length;
    this.items[index] = { element: element, options: this.util.mergeObjects(defaults, options || {}), onscreen: false, side: 'bottom' };
    this.map[element] = index;

    return this.items[index];
};

OnScreen.prototype.updateItem = function(element, options) {
    var index = parseInt(this.map[element]);
    if (index >= 0 && index < this.items.length && this.items[index]) {
        this.items[index].options = this.util.mergeObjects(this.items[index].options, options || {});
    }

    return this.items[index];
};

OnScreen.prototype.removeItem = function(element) {
    var index = parseInt(this.map[element]);
    if (index >= 0 && index < this.items.length) {
        this.items.splice(index, 1);
        this.map[element] = null;
        delete this.map[element];
    }
};

OnScreen.prototype.empty = function() {
    this.items = [];
    this.map = {};
};

OnScreen.prototype.dispose = function() {
    this.empty();

    if (this.options.scroll) {
        this.options.scrollContainer.forEach(function(container) {
            container.removeEventListener('scroll', this.update);
        }, this);
    }

    if (this.options.resize) {
        window.removeEventListener('resize', this.update);
    }

    if (this.options.load) {
        window.removeEventListener('load', this.update);
    }
};

function linear(t, b, c, d) {
    return c*t/d + b;
};

function easeInSine(t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
};

function easeOutSine(t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
};

function easeInOutSine(t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};


var hljs=new function(){function j(v){return v.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function t(v){return v.nodeName.toLowerCase()}function h(w,x){var v=w&&w.exec(x);return v&&v.index==0}function r(w){var v=(w.className+" "+(w.parentNode?w.parentNode.className:"")).split(/\s+/);v=v.map(function(x){return x.replace(/^lang(uage)?-/,"")});return v.filter(function(x){return i(x)||/no(-?)highlight/.test(x)})[0]}function o(x,y){var v={};for(var w in x){v[w]=x[w]}if(y){for(var w in y){v[w]=y[w]}}return v}function u(x){var v=[];(function w(y,z){for(var A=y.firstChild;A;A=A.nextSibling){if(A.nodeType==3){z+=A.nodeValue.length}else{if(A.nodeType==1){v.push({event:"start",offset:z,node:A});z=w(A,z);if(!t(A).match(/br|hr|img|input/)){v.push({event:"stop",offset:z,node:A})}}}}return z})(x,0);return v}function q(w,y,C){var x=0;var F="";var z=[];function B(){if(!w.length||!y.length){return w.length?w:y}if(w[0].offset!=y[0].offset){return(w[0].offset<y[0].offset)?w:y}return y[0].event=="start"?w:y}function A(H){function G(I){return" "+I.nodeName+'="'+j(I.value)+'"'}F+="<"+t(H)+Array.prototype.map.call(H.attributes,G).join("")+">"}function E(G){F+="</"+t(G)+">"}function v(G){(G.event=="start"?A:E)(G.node)}while(w.length||y.length){var D=B();F+=j(C.substr(x,D[0].offset-x));x=D[0].offset;if(D==w){z.reverse().forEach(E);do{v(D.splice(0,1)[0]);D=B()}while(D==w&&D.length&&D[0].offset==x);z.reverse().forEach(A)}else{if(D[0].event=="start"){z.push(D[0].node)}else{z.pop()}v(D.splice(0,1)[0])}}return F+j(C.substr(x))}function m(y){function v(z){return(z&&z.source)||z}function w(A,z){return RegExp(v(A),"m"+(y.cI?"i":"")+(z?"g":""))}function x(D,C){if(D.compiled){return}D.compiled=true;D.k=D.k||D.bK;if(D.k){var z={};var E=function(G,F){if(y.cI){F=F.toLowerCase()}F.split(" ").forEach(function(H){var I=H.split("|");z[I[0]]=[G,I[1]?Number(I[1]):1]})};if(typeof D.k=="string"){E("keyword",D.k)}else{Object.keys(D.k).forEach(function(F){E(F,D.k[F])})}D.k=z}D.lR=w(D.l||/\b[A-Za-z0-9_]+\b/,true);if(C){if(D.bK){D.b="\\b("+D.bK.split(" ").join("|")+")\\b"}if(!D.b){D.b=/\B|\b/}D.bR=w(D.b);if(!D.e&&!D.eW){D.e=/\B|\b/}if(D.e){D.eR=w(D.e)}D.tE=v(D.e)||"";if(D.eW&&C.tE){D.tE+=(D.e?"|":"")+C.tE}}if(D.i){D.iR=w(D.i)}if(D.r===undefined){D.r=1}if(!D.c){D.c=[]}var B=[];D.c.forEach(function(F){if(F.v){F.v.forEach(function(G){B.push(o(F,G))})}else{B.push(F=="self"?D:F)}});D.c=B;D.c.forEach(function(F){x(F,D)});if(D.starts){x(D.starts,C)}var A=D.c.map(function(F){return F.bK?"\\.?("+F.b+")\\.?":F.b}).concat([D.tE,D.i]).map(v).filter(Boolean);D.t=A.length?w(A.join("|"),true):{exec:function(F){return null}}}x(y)}function c(T,L,J,R){function v(V,W){for(var U=0;U<W.c.length;U++){if(h(W.c[U].bR,V)){return W.c[U]}}}function z(V,U){if(h(V.eR,U)){return V}if(V.eW){return z(V.parent,U)}}function A(U,V){return !J&&h(V.iR,U)}function E(W,U){var V=M.cI?U[0].toLowerCase():U[0];return W.k.hasOwnProperty(V)&&W.k[V]}function w(aa,Y,X,W){var U=W?"":b.classPrefix,V='<span class="'+U,Z=X?"":"</span>";V+=aa+'">';return V+Y+Z}function N(){if(!I.k){return j(C)}var U="";var X=0;I.lR.lastIndex=0;var V=I.lR.exec(C);while(V){U+=j(C.substr(X,V.index-X));var W=E(I,V);if(W){H+=W[1];U+=w(W[0],j(V[0]))}else{U+=j(V[0])}X=I.lR.lastIndex;V=I.lR.exec(C)}return U+j(C.substr(X))}function F(){if(I.sL&&!f[I.sL]){return j(C)}var U=I.sL?c(I.sL,C,true,S):e(C);if(I.r>0){H+=U.r}if(I.subLanguageMode=="continuous"){S=U.top}return w(U.language,U.value,false,true)}function Q(){return I.sL!==undefined?F():N()}function P(W,V){var U=W.cN?w(W.cN,"",true):"";if(W.rB){D+=U;C=""}else{if(W.eB){D+=j(V)+U;C=""}else{D+=U;C=V}}I=Object.create(W,{parent:{value:I}})}function G(U,Y){C+=U;if(Y===undefined){D+=Q();return 0}var W=v(Y,I);if(W){D+=Q();P(W,Y);return W.rB?0:Y.length}var X=z(I,Y);if(X){var V=I;if(!(V.rE||V.eE)){C+=Y}D+=Q();do{if(I.cN){D+="</span>"}H+=I.r;I=I.parent}while(I!=X.parent);if(V.eE){D+=j(Y)}C="";if(X.starts){P(X.starts,"")}return V.rE?0:Y.length}if(A(Y,I)){throw new Error('Illegal lexeme "'+Y+'" for mode "'+(I.cN||"<unnamed>")+'"')}C+=Y;return Y.length||1}var M=i(T);if(!M){throw new Error('Unknown language: "'+T+'"')}m(M);var I=R||M;var S;var D="";for(var K=I;K!=M;K=K.parent){if(K.cN){D=w(K.cN,"",true)+D}}var C="";var H=0;try{var B,y,x=0;while(true){I.t.lastIndex=x;B=I.t.exec(L);if(!B){break}y=G(L.substr(x,B.index-x),B[0]);x=B.index+y}G(L.substr(x));for(var K=I;K.parent;K=K.parent){if(K.cN){D+="</span>"}}return{r:H,value:D,language:T,top:I}}catch(O){if(O.message.indexOf("Illegal")!=-1){return{r:0,value:j(L)}}else{throw O}}}function e(y,x){x=x||b.languages||Object.keys(f);var v={r:0,value:j(y)};var w=v;x.forEach(function(z){if(!i(z)){return}var A=c(z,y,false);A.language=z;if(A.r>w.r){w=A}if(A.r>v.r){w=v;v=A}});if(w.language){v.second_best=w}return v}function g(v){if(b.tabReplace){v=v.replace(/^((<[^>]+>|\t)+)/gm,function(w,z,y,x){return z.replace(/\t/g,b.tabReplace)})}if(b.useBR){v=v.replace(/\n/g,"<br>")}return v}function p(A){var B=r(A);if(/no(-?)highlight/.test(B)){return}var y;if(b.useBR){y=document.createElementNS("http://www.w3.org/1999/xhtml","div");y.innerHTML=A.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")}else{y=A}var z=y.textContent;var v=B?c(B,z,true):e(z);var x=u(y);if(x.length){var w=document.createElementNS("http://www.w3.org/1999/xhtml","div");w.innerHTML=v.value;v.value=q(x,u(w),z)}v.value=g(v.value);A.innerHTML=v.value;A.className+=" hljs "+(!B&&v.language||"");A.result={language:v.language,re:v.r};if(v.second_best){A.second_best={language:v.second_best.language,re:v.second_best.r}}}var b={classPrefix:"hljs-",tabReplace:null,useBR:false,languages:undefined};function s(v){b=o(b,v)}function l(){if(l.called){return}l.called=true;var v=document.querySelectorAll("pre code");Array.prototype.forEach.call(v,p)}function a(){addEventListener("DOMContentLoaded",l,false);addEventListener("load",l,false)}var f={};var n={};function d(v,x){var w=f[v]=x(this);if(w.aliases){w.aliases.forEach(function(y){n[y]=v})}}function k(){return Object.keys(f)}function i(v){return f[v]||f[n[v]]}this.highlight=c;this.highlightAuto=e;this.fixMarkup=g;this.highlightBlock=p;this.configure=s;this.initHighlighting=l;this.initHighlightingOnLoad=a;this.registerLanguage=d;this.listLanguages=k;this.getLanguage=i;this.inherit=o;this.IR="[a-zA-Z][a-zA-Z0-9_]*";this.UIR="[a-zA-Z_][a-zA-Z0-9_]*";this.NR="\\b\\d+(\\.\\d+)?";this.CNR="(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";this.BNR="\\b(0b[01]+)";this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";this.BE={b:"\\\\[\\s\\S]",r:0};this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[this.BE]};this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[this.BE]};this.PWM={b:/\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/};this.CLCM={cN:"comment",b:"//",e:"$",c:[this.PWM]};this.CBCM={cN:"comment",b:"/\\*",e:"\\*/",c:[this.PWM]};this.HCM={cN:"comment",b:"#",e:"$",c:[this.PWM]};this.NM={cN:"number",b:this.NR,r:0};this.CNM={cN:"number",b:this.CNR,r:0};this.BNM={cN:"number",b:this.BNR,r:0};this.CSSNM={cN:"number",b:this.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0};this.RM={cN:"regexp",b:/\//,e:/\/[gim]*/,i:/\n/,c:[this.BE,{b:/\[/,e:/\]/,r:0,c:[this.BE]}]};this.TM={cN:"title",b:this.IR,r:0};this.UTM={cN:"title",b:this.UIR,r:0}}();hljs.registerLanguage("ruby",function(f){var j="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?";var i="and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor";var b={cN:"yardoctag",b:"@[A-Za-z]+"};var c={cN:"value",b:"#<",e:">"};var k={cN:"comment",v:[{b:"#",e:"$",c:[b]},{b:"^\\=begin",e:"^\\=end",c:[b],r:10},{b:"^__END__",e:"\\n$"}]};var d={cN:"subst",b:"#\\{",e:"}",k:i};var e={cN:"string",c:[f.BE,d],v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:"%[qw]?\\(",e:"\\)"},{b:"%[qw]?\\[",e:"\\]"},{b:"%[qw]?{",e:"}"},{b:"%[qw]?<",e:">"},{b:"%[qw]?/",e:"/"},{b:"%[qw]?%",e:"%"},{b:"%[qw]?-",e:"-"},{b:"%[qw]?\\|",e:"\\|"},{b:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/}]};var a={cN:"params",b:"\\(",e:"\\)",k:i};var h=[e,c,k,{cN:"class",bK:"class module",e:"$|;",i:/=/,c:[f.inherit(f.TM,{b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{cN:"inheritance",b:"<\\s*",c:[{cN:"parent",b:"("+f.IR+"::)?"+f.IR}]},k]},{cN:"function",bK:"def",e:" |$|;",r:0,c:[f.inherit(f.TM,{b:j}),a,k]},{cN:"constant",b:"(::)?(\\b[A-Z]\\w*(::)?)+",r:0},{cN:"symbol",b:f.UIR+"(\\!|\\?)?:",r:0},{cN:"symbol",b:":",c:[e,{b:j}],r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{cN:"variable",b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{b:"("+f.RSR+")\\s*",c:[c,k,{cN:"regexp",c:[f.BE,d],i:/\n/,v:[{b:"/",e:"/[a-z]*"},{b:"%r{",e:"}[a-z]*"},{b:"%r\\(",e:"\\)[a-z]*"},{b:"%r!",e:"![a-z]*"},{b:"%r\\[",e:"\\][a-z]*"}]}],r:0}];d.c=h;a.c=h;var g=[{b:/^\s*=>/,cN:"status",starts:{e:"$",c:h}},{cN:"prompt",b:/^\S[^=>\n]*>+/,starts:{e:"$",c:h}}];return{aliases:["rb","gemspec","podspec","thor","irb"],k:i,c:[k].concat(g).concat(h)}});hljs.registerLanguage("javascript",function(a){return{aliases:["js"],k:{keyword:"in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document"},c:[{cN:"pi",b:/^\s*('|")use strict('|")/,r:10},a.ASM,a.QSM,a.CLCM,a.CBCM,a.CNM,{b:"("+a.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[a.CLCM,a.CBCM,a.RM,{b:/</,e:/>;/,r:0,sL:"xml"}],r:0},{cN:"function",bK:"function",e:/\{/,eE:true,c:[a.inherit(a.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/}),{cN:"params",b:/\(/,e:/\)/,c:[a.CLCM,a.CBCM],i:/["'\(]/}],i:/\[|%/},{b:/\$[(.]/},{b:"\\."+a.IR,r:0}]}});hljs.registerLanguage("xml",function(a){var c="[A-Za-z0-9\\._:-]+";var d={b:/<\?(php)?(?!\w)/,e:/\?>/,sL:"php",subLanguageMode:"continuous"};var b={eW:true,i:/</,r:0,c:[d,{cN:"attribute",b:c,r:0},{b:"=",r:0,c:[{cN:"value",v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s\/>]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xsl","plist"],cI:true,c:[{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},{cN:"comment",b:"<!--",e:"-->",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[b],starts:{e:"</style>",rE:true,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[b],starts:{e:"<\/script>",rE:true,sL:"javascript"}},{b:"<%",e:"%>",sL:"vbscript"},d,{cN:"pi",b:/<\?\w+/,e:/\?>/,r:10},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:/[^ \/><\n\t]+/,r:0},b]}]}});hljs.registerLanguage("markdown",function(a){return{aliases:["md","mkdown","mkd"],c:[{cN:"header",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"blockquote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"`.+?`"},{b:"^( {4}|\t)",e:"$",r:0}]},{cN:"horizontal_rule",b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].*?[\\)\\]]",rB:true,c:[{cN:"link_label",b:"\\[",e:"\\]",eB:true,rE:true,r:0},{cN:"link_url",b:"\\]\\(",e:"\\)",eB:true,eE:true},{cN:"link_reference",b:"\\]\\[",e:"\\]",eB:true,eE:true}],r:10},{b:"^\\[.+\\]:",rB:true,c:[{cN:"link_reference",b:"\\[",e:"\\]:",eB:true,eE:true,starts:{cN:"link_url",e:"$"}}]}]}});hljs.registerLanguage("css",function(a){var b="[a-zA-Z-][a-zA-Z0-9_-]*";var c={cN:"function",b:b+"\\(",rB:true,eE:true,e:"\\("};return{cI:true,i:"[=/|']",c:[a.CBCM,{cN:"id",b:"\\#[A-Za-z0-9_-]+"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{cN:"at_rule",b:"@",e:"[{;]",c:[{cN:"keyword",b:/\S+/},{b:/\s/,eW:true,eE:true,r:0,c:[c,a.ASM,a.QSM,a.CSSNM]}]},{cN:"tag",b:b,r:0},{cN:"rules",b:"{",e:"}",i:"[^\\s]",r:0,c:[a.CBCM,{cN:"rule",b:"[^\\s]",rB:true,e:";",eW:true,c:[{cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:true,i:"[^\\s]",starts:{cN:"value",eW:true,eE:true,c:[c,a.CSSNM,a.QSM,a.ASM,a.CBCM,{cN:"hexcolor",b:"#[0-9A-Fa-f]+"},{cN:"important",b:"!important"}]}}]}]}]}});hljs.registerLanguage("java",function(c){var b=c.UIR+"(<"+c.UIR+">)?";var a="false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private";return{aliases:["jsp"],k:a,i:/<\//,c:[{cN:"javadoc",b:"/\\*\\*",e:"\\*/",r:0,c:[{cN:"javadoctag",b:"(^|\\s)@[A-Za-z]+"}]},c.CLCM,c.CBCM,c.ASM,c.QSM,{cN:"class",bK:"class interface",e:/[{;=]/,eE:true,k:"class interface",i:/[:"\[\]]/,c:[{bK:"extends implements"},c.UTM]},{bK:"new",e:/\s/,r:0},{cN:"function",b:"("+b+"\\s+)+"+c.UIR+"\\s*\\(",rB:true,e:/[{;=]/,eE:true,k:a,c:[{b:c.UIR+"\\s*\\(",rB:true,c:[c.UTM]},{cN:"params",b:/\(/,e:/\)/,k:a,c:[c.ASM,c.QSM,c.CNM,c.CBCM]},c.CLCM,c.CBCM]},c.CNM,{cN:"annotation",b:"@[A-Za-z]+"}]}});hljs.registerLanguage("php",function(b){var e={cN:"variable",b:"(\\$|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*"};var a={cN:"preprocessor",b:/<\?(php)?|\?>/};var c={cN:"string",c:[b.BE,a],v:[{b:'b"',e:'"'},{b:"b'",e:"'"},b.inherit(b.ASM,{i:null}),b.inherit(b.QSM,{i:null})]};var d={v:[b.BNM,b.CNM]};return{aliases:["php3","php4","php5","php6"],cI:true,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",c:[b.CLCM,b.HCM,{cN:"comment",b:"/\\*",e:"\\*/",c:[{cN:"phpdoc",b:"\\s@[A-Za-z]+"},a]},{cN:"comment",b:"__halt_compiler.+?;",eW:true,k:"__halt_compiler",l:b.UIR},{cN:"string",b:"<<<['\"]?\\w+['\"]?$",e:"^\\w+;",c:[b.BE]},a,e,{cN:"function",bK:"function",e:/[;{]/,eE:true,i:"\\$|\\[|%",c:[b.UTM,{cN:"params",b:"\\(",e:"\\)",c:["self",e,b.CBCM,c,d]}]},{cN:"class",bK:"class interface",e:"{",eE:true,i:/[:\(\$"]/,c:[{bK:"extends implements"},b.UTM]},{bK:"namespace",e:";",i:/[\.']/,c:[b.UTM]},{bK:"use",e:";",c:[b.UTM]},{b:"=>"},c,d]}});hljs.registerLanguage("json",function(a){var e={literal:"true false null"};var d=[a.QSM,a.CNM];var c={cN:"value",e:",",eW:true,eE:true,c:d,k:e};var b={b:"{",e:"}",c:[{cN:"attribute",b:'\\s*"',e:'"\\s*:\\s*',eB:true,eE:true,c:[a.BE],i:"\\n",starts:c}],i:"\\S"};var f={b:"\\[",e:"\\]",c:[a.inherit(c,{cN:null})],i:"\\S"};d.splice(d.length,0,b,f);return{c:d,k:e,i:"\\S"}});hljs.registerLanguage("apache",function(a){var b={cN:"number",b:"[\\$%]\\d+"};return{aliases:["apacheconf"],cI:true,c:[a.HCM,{cN:"tag",b:"</?",e:">"},{cN:"keyword",b:/\w+/,r:0,k:{common:"order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"},starts:{e:/$/,r:0,k:{literal:"on off all"},c:[{cN:"sqbracket",b:"\\s\\[",e:"\\]$"},{cN:"cbracket",b:"[\\$%]\\{",e:"\\}",c:["self",b]},b,a.QSM]}}],i:/\S/}});


/*!
* Baseline.js 1.1
*
* Copyright 2013, Daniel Eden http://daneden.me
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: 2014-06-20
*/

(function (window, $) {

  'use strict';

  var baseline = (function () {

    /**
     * `_base` will later hold the value for the current baseline that matches
     * the given breakpoint. `_breakpoints` will hold a reference to all
     * breakpoints given to the baseline call.
     */

    var _base = 0,
        _breakpoints = {},
        _dynamicBase;

    /**
     * @name     _setBase
     *
     * Set the correct margin-bottom on the given element to get back to the
     * baseline.
     *
     * @param    {Element}  element
     *
     * @private
     */

    function _setBase (element) {
      var height = element.offsetHeight,
          current, old;

      if( _dynamicBase ) {

          /**
           * Compute the _base through a user defined function on each execution.
           * This could be used to get the current grid size for different breakpoints
           * from an actual element property instead of defining those breakpoints in the options.
           */
          _base = _dynamicBase();

      }
      else {

        /**
         * In this step we loop through all the breakpoints, if any were given.
         * If the baseline call received a number from the beginning, this loop
         * is simply ignored.
         */

        for (var key in _breakpoints) {
          current = key;

          if (document.body.clientWidth > current && current >= old) {
            _base = _breakpoints[key];
            old = current;
          }
        }

      }

      /**
       * We set the element's margin-bottom style to a number that pushes the
       * adjacent element down far enough to get back onto the baseline.
       */

      var totalMargin = (_base - (height % _base)) / 16,
        halfMargin = totalMargin / 2;

      // element.style.marginBottom = halfMargin + 'rem';
      // element.style.marginTop    = halfMargin + 'rem';
      element.style.marginBottom = totalMargin + 'rem';
    }

    /**
     * @name     _init
     *
     * Call `_setBase()` on the given element and add an event listener to the
     * window to reset the baseline on resize.
     *
     * @param    {Element}  element
     *
     * @private
     */

    function _init (element) {
      _setBase(element);

      if ('addEventListener' in window) {
        window.addEventListener('resize', function () { _setBase(element); }, false);
      } else if ('attachEvent' in window) {
        window.attachEvent('resize', function () { _setBase(element); });
      }
    }

    /**
     * @name     baseline
     *
     * Gets the correct elements and attaches the baseline behaviour to them.
     *
     * @param    {String/Element/NodeList}  elements
     * @param    {Number/Object}            options
     */

    return function baseline (elements, options) {

      /**
       * Accept a NodeList or a selector string and set `targets` to the
       * relevant elements.
       */

      var targets = typeof elements === 'string' ? document.querySelectorAll(elements) : elements,
          len = targets.length;

      /**
       * Decide whether to set the `_breakpoints` or `_dynamicBase` variables or not.
       * This will be relevant in the `_setBase()` function.
       */

      if (typeof options === 'number') {
        _base = parseInt(options, 10);
      } else if (typeof options === 'function') {
          _dynamicBase = options;
      } else if (typeof options === 'object') {
        var em = parseInt(getComputedStyle(document.body, null).getPropertyValue('font-size'), 10);

        for (var point in _breakpoints) {
          var unitless = /\d+em/.test(point) ? parseInt(point, 10) * em : /\d+px/.test(point) ? parseInt(point, 10) : point;
          _breakpoints[unitless] = parseInt(_breakpoints[point], 10);
        }
      }

      /**
       * If we have multiple elements, loop through them, otherwise just
       * initialise the functionality on the single element.
       */

      if (len > 1) {
        while (len--) { _init(targets[len]); }
      } else {
        _init(targets[0]);
      }
    };

  }());

  /**
   * Export baseline as a jQuery or Zepto plugin if any of them are loaded,
   * otherwise export as a browser global.
   */

  if (typeof $ !== "undefined") {
    $.extend($.fn, {
      baseline: function (options) {
        return baseline(this, options);
      }
    });
  } else {
    window.baseline = baseline;
  }

}(window, window.jQuery || window.Zepto || undefined));
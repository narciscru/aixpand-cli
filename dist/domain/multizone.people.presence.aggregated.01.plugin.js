"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultizonePeoplePresenceAggregated01Plugin = exports.WorkingHours2Part = exports.TuePart = exports.WedPart = void 0;
const client_1 = require("@aixpand/client");
exports.WedPart = (() => {
    let _classDecorators = [(0, client_1.Embedable)(['MULTIZONE_PEOPLE_PRESENCE_AGGREGATED_01'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _test_decorators;
    let _test_initializers = [];
    var WedPart = _classThis = class {
        constructor() {
            this.test = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _test_initializers, 'asdf'));
        }
    };
    __setFunctionName(_classThis, "WedPart");
    (() => {
        _test_decorators = [(0, client_1.Bind)('TEST')];
        __esDecorate(null, null, _test_decorators, { kind: "field", name: "test", static: false, private: false, access: { has: obj => "test" in obj, get: obj => obj.test, set: (obj, value) => { obj.test = value; } } }, _test_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        WedPart = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WedPart = _classThis;
})();
exports.TuePart = (() => {
    let _classDecorators_1 = [(0, client_1.Embedable)(['MULTIZONE_PEOPLE_PRESENCE_AGGREGATED_01'])];
    let _classDescriptor_1;
    let _classExtraInitializers_1 = [];
    let _classThis_1;
    let _instanceExtraInitializers_1 = [];
    let _test_decorators;
    let _test_initializers = [];
    var TuePart = _classThis_1 = class {
        constructor() {
            this.test = (__runInitializers(this, _instanceExtraInitializers_1), __runInitializers(this, _test_initializers, 'asdf'));
        }
    };
    __setFunctionName(_classThis_1, "TuePart");
    (() => {
        _test_decorators = [(0, client_1.Bind)('TEST')];
        __esDecorate(null, null, _test_decorators, { kind: "field", name: "test", static: false, private: false, access: { has: obj => "test" in obj, get: obj => obj.test, set: (obj, value) => { obj.test = value; } } }, _test_initializers, _instanceExtraInitializers_1);
        __esDecorate(null, _classDescriptor_1 = { value: _classThis_1 }, _classDecorators_1, { kind: "class", name: _classThis_1.name }, null, _classExtraInitializers_1);
        TuePart = _classThis_1 = _classDescriptor_1.value;
        __runInitializers(_classThis_1, _classExtraInitializers_1);
    })();
    return TuePart = _classThis_1;
})();
exports.WorkingHours2Part = (() => {
    let _classDecorators_2 = [(0, client_1.Embedable)(['MULTIZONE_PEOPLE_PRESENCE_AGGREGATED_01'])];
    let _classDescriptor_2;
    let _classExtraInitializers_2 = [];
    let _classThis_2;
    let _instanceExtraInitializers_2 = [];
    let _mon_decorators;
    let _mon_initializers = [];
    let _tue_decorators;
    let _tue_initializers = [];
    let _wed_decorators;
    let _wed_initializers = [];
    let _thu_decorators;
    let _thu_initializers = [];
    let _fri_decorators;
    let _fri_initializers = [];
    let _sat_decorators;
    let _sat_initializers = [];
    let _sun_decorators;
    let _sun_initializers = [];
    var WorkingHours2Part = _classThis_2 = class {
        constructor() {
            this.mon = (__runInitializers(this, _instanceExtraInitializers_2), __runInitializers(this, _mon_initializers, void 0));
            this.tue = __runInitializers(this, _tue_initializers, void 0);
            this.wed = __runInitializers(this, _wed_initializers, void 0);
            this.thu = __runInitializers(this, _thu_initializers, void 0);
            this.fri = __runInitializers(this, _fri_initializers, void 0);
            this.sat = __runInitializers(this, _sat_initializers, void 0);
            this.sun = __runInitializers(this, _sun_initializers, void 0);
        }
    };
    __setFunctionName(_classThis_2, "WorkingHours2Part");
    (() => {
        _mon_decorators = [(0, client_1.Bind)('MON')];
        _tue_decorators = [Embedded(TuePart, 'TUE')];
        _wed_decorators = [Embedded(WedPart, 'WED')];
        _thu_decorators = [(0, client_1.Bind)('THU')];
        _fri_decorators = [(0, client_1.Bind)('FRI')];
        _sat_decorators = [(0, client_1.Bind)('SAT')];
        _sun_decorators = [(0, client_1.Bind)('SUN')];
        __esDecorate(null, null, _mon_decorators, { kind: "field", name: "mon", static: false, private: false, access: { has: obj => "mon" in obj, get: obj => obj.mon, set: (obj, value) => { obj.mon = value; } } }, _mon_initializers, _instanceExtraInitializers_2);
        __esDecorate(null, null, _tue_decorators, { kind: "field", name: "tue", static: false, private: false, access: { has: obj => "tue" in obj, get: obj => obj.tue, set: (obj, value) => { obj.tue = value; } } }, _tue_initializers, _instanceExtraInitializers_2);
        __esDecorate(null, null, _wed_decorators, { kind: "field", name: "wed", static: false, private: false, access: { has: obj => "wed" in obj, get: obj => obj.wed, set: (obj, value) => { obj.wed = value; } } }, _wed_initializers, _instanceExtraInitializers_2);
        __esDecorate(null, null, _thu_decorators, { kind: "field", name: "thu", static: false, private: false, access: { has: obj => "thu" in obj, get: obj => obj.thu, set: (obj, value) => { obj.thu = value; } } }, _thu_initializers, _instanceExtraInitializers_2);
        __esDecorate(null, null, _fri_decorators, { kind: "field", name: "fri", static: false, private: false, access: { has: obj => "fri" in obj, get: obj => obj.fri, set: (obj, value) => { obj.fri = value; } } }, _fri_initializers, _instanceExtraInitializers_2);
        __esDecorate(null, null, _sat_decorators, { kind: "field", name: "sat", static: false, private: false, access: { has: obj => "sat" in obj, get: obj => obj.sat, set: (obj, value) => { obj.sat = value; } } }, _sat_initializers, _instanceExtraInitializers_2);
        __esDecorate(null, null, _sun_decorators, { kind: "field", name: "sun", static: false, private: false, access: { has: obj => "sun" in obj, get: obj => obj.sun, set: (obj, value) => { obj.sun = value; } } }, _sun_initializers, _instanceExtraInitializers_2);
        __esDecorate(null, _classDescriptor_2 = { value: _classThis_2 }, _classDecorators_2, { kind: "class", name: _classThis_2.name }, null, _classExtraInitializers_2);
        WorkingHours2Part = _classThis_2 = _classDescriptor_2.value;
        __runInitializers(_classThis_2, _classExtraInitializers_2);
    })();
    return WorkingHours2Part = _classThis_2;
})();
exports.MultizonePeoplePresenceAggregated01Plugin = (() => {
    let _classDecorators_3 = [(0, client_1.PluginInstance)('MULTIZONE_PEOPLE_PRESENCE_AGGREGATED_01')];
    let _classDescriptor_3;
    let _classExtraInitializers_3 = [];
    let _classThis_3;
    let _instanceExtraInitializers_3 = [];
    let _debugObjects_decorators;
    let _debugObjects_initializers = [];
    let _demoMode_decorators;
    let _demoMode_initializers = [];
    let _intervalAggregationSeconds_decorators;
    let _intervalAggregationSeconds_initializers = [];
    let _points_decorators;
    let _points_initializers = [];
    let _workingHours2_decorators;
    let _workingHours2_initializers = [];
    let _sendImages_decorators;
    let _sendImages_initializers = [];
    var MultizonePeoplePresenceAggregated01Plugin = _classThis_3 = class {
        constructor() {
            this.debugObjects = (__runInitializers(this, _instanceExtraInitializers_3), __runInitializers(this, _debugObjects_initializers, true));
            this.demoMode = __runInitializers(this, _demoMode_initializers, void 0);
            this.intervalAggregationSeconds = __runInitializers(this, _intervalAggregationSeconds_initializers, 60);
            this.points = __runInitializers(this, _points_initializers, void 0);
            this.workingHours2 = __runInitializers(this, _workingHours2_initializers, void 0);
            this.sendImages = __runInitializers(this, _sendImages_initializers, void 0);
        }
    };
    __setFunctionName(_classThis_3, "MultizonePeoplePresenceAggregated01Plugin");
    (() => {
        _debugObjects_decorators = [(0, client_1.Bind)('DEBUG_OBJECTS')];
        _demoMode_decorators = [(0, client_1.Bind)('DEMO_MODE')];
        _intervalAggregationSeconds_decorators = [(0, client_1.Bind)('INTERVAL_AGGREGATION_SECONDS')];
        _points_decorators = [(0, client_1.Bind)('POINTS')];
        _workingHours2_decorators = [Embedded(WorkingHours2Part, 'WORKING_HOURS_2')];
        _sendImages_decorators = [(0, client_1.Bind)('SEND_IMAGES')];
        __esDecorate(null, null, _debugObjects_decorators, { kind: "field", name: "debugObjects", static: false, private: false, access: { has: obj => "debugObjects" in obj, get: obj => obj.debugObjects, set: (obj, value) => { obj.debugObjects = value; } } }, _debugObjects_initializers, _instanceExtraInitializers_3);
        __esDecorate(null, null, _demoMode_decorators, { kind: "field", name: "demoMode", static: false, private: false, access: { has: obj => "demoMode" in obj, get: obj => obj.demoMode, set: (obj, value) => { obj.demoMode = value; } } }, _demoMode_initializers, _instanceExtraInitializers_3);
        __esDecorate(null, null, _intervalAggregationSeconds_decorators, { kind: "field", name: "intervalAggregationSeconds", static: false, private: false, access: { has: obj => "intervalAggregationSeconds" in obj, get: obj => obj.intervalAggregationSeconds, set: (obj, value) => { obj.intervalAggregationSeconds = value; } } }, _intervalAggregationSeconds_initializers, _instanceExtraInitializers_3);
        __esDecorate(null, null, _points_decorators, { kind: "field", name: "points", static: false, private: false, access: { has: obj => "points" in obj, get: obj => obj.points, set: (obj, value) => { obj.points = value; } } }, _points_initializers, _instanceExtraInitializers_3);
        __esDecorate(null, null, _workingHours2_decorators, { kind: "field", name: "workingHours2", static: false, private: false, access: { has: obj => "workingHours2" in obj, get: obj => obj.workingHours2, set: (obj, value) => { obj.workingHours2 = value; } } }, _workingHours2_initializers, _instanceExtraInitializers_3);
        __esDecorate(null, null, _sendImages_decorators, { kind: "field", name: "sendImages", static: false, private: false, access: { has: obj => "sendImages" in obj, get: obj => obj.sendImages, set: (obj, value) => { obj.sendImages = value; } } }, _sendImages_initializers, _instanceExtraInitializers_3);
        __esDecorate(null, _classDescriptor_3 = { value: _classThis_3 }, _classDecorators_3, { kind: "class", name: _classThis_3.name }, null, _classExtraInitializers_3);
        MultizonePeoplePresenceAggregated01Plugin = _classThis_3 = _classDescriptor_3.value;
        __runInitializers(_classThis_3, _classExtraInitializers_3);
    })();
    return MultizonePeoplePresenceAggregated01Plugin = _classThis_3;
})();

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
exports.MultizonePeoplePresenceCrowded01Payload = exports.IdTagsPart = void 0;
const client_1 = require("@aixpand/client");
exports.IdTagsPart = (() => {
    let _classDecorators = [(0, client_1.Embedable)(['MULTIZONE_PEOPLE_PRESENCE_CROWDED_01'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _tag1_decorators;
    let _tag1_initializers = [];
    let _tag2_decorators;
    let _tag2_initializers = [];
    let _tag3_decorators;
    let _tag3_initializers = [];
    let _tag4_decorators;
    let _tag4_initializers = [];
    let _tag5_decorators;
    let _tag5_initializers = [];
    var IdTagsPart = _classThis = class {
        constructor() {
            this.tag1 = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _tag1_initializers, void 0));
            this.tag2 = __runInitializers(this, _tag2_initializers, void 0);
            this.tag3 = __runInitializers(this, _tag3_initializers, void 0);
            this.tag4 = __runInitializers(this, _tag4_initializers, void 0);
            this.tag5 = __runInitializers(this, _tag5_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "IdTagsPart");
    (() => {
        _tag1_decorators = [(0, client_1.Bind)('TAG_1')];
        _tag2_decorators = [(0, client_1.Bind)('TAG_2')];
        _tag3_decorators = [(0, client_1.Bind)('TAG3')];
        _tag4_decorators = [(0, client_1.Bind)('Tag4')];
        _tag5_decorators = [(0, client_1.Bind)('Tag_5')];
        __esDecorate(null, null, _tag1_decorators, { kind: "field", name: "tag1", static: false, private: false, access: { has: obj => "tag1" in obj, get: obj => obj.tag1, set: (obj, value) => { obj.tag1 = value; } } }, _tag1_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _tag2_decorators, { kind: "field", name: "tag2", static: false, private: false, access: { has: obj => "tag2" in obj, get: obj => obj.tag2, set: (obj, value) => { obj.tag2 = value; } } }, _tag2_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _tag3_decorators, { kind: "field", name: "tag3", static: false, private: false, access: { has: obj => "tag3" in obj, get: obj => obj.tag3, set: (obj, value) => { obj.tag3 = value; } } }, _tag3_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _tag4_decorators, { kind: "field", name: "tag4", static: false, private: false, access: { has: obj => "tag4" in obj, get: obj => obj.tag4, set: (obj, value) => { obj.tag4 = value; } } }, _tag4_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _tag5_decorators, { kind: "field", name: "tag5", static: false, private: false, access: { has: obj => "tag5" in obj, get: obj => obj.tag5, set: (obj, value) => { obj.tag5 = value; } } }, _tag5_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        IdTagsPart = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IdTagsPart = _classThis;
})();
exports.MultizonePeoplePresenceCrowded01Payload = (() => {
    let _classDecorators_1 = [(0, client_1.PluginPayload)('MULTIZONE_PEOPLE_PRESENCE_CROWDED_01')];
    let _classDescriptor_1;
    let _classExtraInitializers_1 = [];
    let _classThis_1;
    let _instanceExtraInitializers_1 = [];
    let _instanceId_decorators;
    let _instanceId_initializers = [];
    let _idTags_decorators;
    let _idTags_initializers = [];
    var MultizonePeoplePresenceCrowded01Payload = _classThis_1 = class {
        constructor() {
            this.instanceId = (__runInitializers(this, _instanceExtraInitializers_1), __runInitializers(this, _instanceId_initializers, void 0));
            this.idTags = __runInitializers(this, _idTags_initializers, void 0);
        }
    };
    __setFunctionName(_classThis_1, "MultizonePeoplePresenceCrowded01Payload");
    (() => {
        _instanceId_decorators = [(0, client_1.Bind)('INSTANCE_ID')];
        _idTags_decorators = [(0, client_1.Embedded)(IdTagsPart, 'ID_TAGS')];
        __esDecorate(null, null, _instanceId_decorators, { kind: "field", name: "instanceId", static: false, private: false, access: { has: obj => "instanceId" in obj, get: obj => obj.instanceId, set: (obj, value) => { obj.instanceId = value; } } }, _instanceId_initializers, _instanceExtraInitializers_1);
        __esDecorate(null, null, _idTags_decorators, { kind: "field", name: "idTags", static: false, private: false, access: { has: obj => "idTags" in obj, get: obj => obj.idTags, set: (obj, value) => { obj.idTags = value; } } }, _idTags_initializers, _instanceExtraInitializers_1);
        __esDecorate(null, _classDescriptor_1 = { value: _classThis_1 }, _classDecorators_1, { kind: "class", name: _classThis_1.name }, null, _classExtraInitializers_1);
        MultizonePeoplePresenceCrowded01Payload = _classThis_1 = _classDescriptor_1.value;
        __runInitializers(_classThis_1, _classExtraInitializers_1);
    })();
    return MultizonePeoplePresenceCrowded01Payload = _classThis_1;
})();

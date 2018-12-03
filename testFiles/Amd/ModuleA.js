define("ModuleA", ["module", "exports"], function (module, exports) {
    "use strict";

    var self = {};
    self.foo = function (bar) {       
    };

    self.bar("blah");   

    return self;
});
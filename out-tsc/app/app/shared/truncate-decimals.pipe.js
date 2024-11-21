import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let TruncateDecimalsPipe = class TruncateDecimalsPipe {
    transform(value, decimals = 2) {
        const multiplier = Math.pow(10, decimals);
        return Math.floor(value * multiplier) / multiplier;
    }
};
TruncateDecimalsPipe = __decorate([
    Pipe({ name: 'truncateDecimals' })
], TruncateDecimalsPipe);
export { TruncateDecimalsPipe };
//# sourceMappingURL=truncate-decimals.pipe.js.map
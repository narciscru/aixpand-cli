export declare class WedPart {
    test: string;
}
export declare class TuePart {
    test: string;
}
export declare class WorkingHours2Part {
    mon: string[][];
    tue: TuePart[];
    wed: WedPart;
    thu: string[][];
    fri: string[][];
    sat: string[][];
    sun: string[][];
}
export declare class MultizonePeoplePresenceAggregated01Plugin {
    debugObjects: boolean;
    demoMode: boolean;
    intervalAggregationSeconds: number;
    points: number[][];
    workingHours2: WorkingHours2Part;
    sendImages: boolean;
}

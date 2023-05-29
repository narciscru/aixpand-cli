export declare class WorkingHoursPart {
    mon: string[][];
    tue: string[][];
    wed: string[][];
    thu: string[][];
    fri: string[][];
    sat: string[][];
    sun: string[][];
}
export declare class MultizonePeoplePresenceCrowded01Plugin {
    alertLowerValue: number;
    alertRaiseValue: number;
    debugObjects: boolean;
    demoMode: boolean;
    intervalAggregationSeconds: number;
    points: number[][];
    workingHours: WorkingHoursPart;
    sendImages: boolean;
    tags: string;
}

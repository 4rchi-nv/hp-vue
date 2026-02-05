export interface PotterDbResponse<T> {
    data: T[];
}

export interface PotterMovie {
    id: string;
    attributes: {
        title: string;
        summary: string;
        poster: string;
        box_office: string | number | null;
        budget: string | number | null;
        running_time: string | number | null;
    };
}

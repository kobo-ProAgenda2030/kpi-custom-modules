export interface Raw {
    count: number;
    next?: null;
    previous?: null;
    results: RawEntity[] ;
}
export interface RawEntity {
    _id: number;
    _notes?: (null)[] | null;
    _uuid: string;
    _tags?: (null)[] | null;
    _submitted_by?: null;
    _xform_id_string: string;
    edad: string;
    question_1: string;
    end: string;
    _submission_time: string;
    _attachments?: (null)[] | null;
    start: string;
    _geolocation?: (null)[] | null;
    _status: string;
    __version__: string;
}

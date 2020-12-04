
export interface Survey {
    count: number;
    next?: null;
    previous?: null;
    results: SurveyEntity[] ;
}
export interface SurveyEntity {
    url: string;
    date_modified: string;
    date_created: string;
    owner: string;
    summary: Summary;
    owner__username: string;
    parent?: null;
    uid: string;
    tag_string: string;
    settings: Settings;
    kind: string;
    name: string;
    asset_type: string;
    version_id: string;
    has_deployment: boolean;
    deployed_version_id?: null;
    deployment__identifier?: null;
    deployment__active: boolean;
    deployment__submission_count: number;
    permissions?: (PermissionsEntity)[] | null;
    downloads?: (DownloadsEntity)[] | null;
    data: string;
}
export interface Summary {
    geo: boolean;
    labels?: (string)[] | null;
    columns?: (string)[] | null;
    languages?: (null)[] | null;
    row_count: number;
    default_translation?: null;
}
export interface Settings {
    sector?: null;
    country?: null;
    description: string;
}
export interface PermissionsEntity {
    url: string;
    user: string;
    permission: string;
    label: string;
}
export interface DownloadsEntity {
    format: string;
    url: string;
}

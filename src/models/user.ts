
export interface User {
    date_joined: string
    email: string
    extra_details: { require_auth: boolean }
    first_name: string
    gravatar: string
    is_staff: boolean
    is_superuser: boolean
    last_login: string
    last_name: string
    projects_url: string
    server_time: string
    username: string
}
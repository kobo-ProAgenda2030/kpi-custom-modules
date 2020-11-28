
import {Cookies} from 'react-cookie';
const cookies = new Cookies();
export function currentLang() {
    return cookies.get("django_language") || 'en';
  }
import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('authToken');
    console.log('Auth Interceptor - Retrieved token from localStorage:', token);
    
    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req);
}

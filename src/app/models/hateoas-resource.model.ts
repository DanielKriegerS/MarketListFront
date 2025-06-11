export interface HateoasResource<T> {
    _links: {
        self: {href: string};
        [key: string]: any;
    }

    [key: string]: any;
}
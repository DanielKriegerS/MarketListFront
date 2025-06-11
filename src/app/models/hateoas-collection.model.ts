import { HateoasResource } from "./hateoas-resource.model"

export interface HateoasCollection<T> {
    _embedded: {
        [key: string]: HateoasResource<T>[];
    }
    _links: {
        self: { href: string };
        [key: string]: any;
    }
}
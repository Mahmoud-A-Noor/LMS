import { Section } from "./section";

export interface Course {
    id: string;
    name: string;
    description: string
    sections: Section[];
}
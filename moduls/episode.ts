import {Choice} from "./choice";
export interface Episode{
    banAdds?: number,
    text: string,
    choice: Array<Choice | string>,
    to: Array<Choice | string>,
    time: number,
    mind?: number,
    health?: number
}
export interface ConvertedEpisode extends Episode{
    choice: Array<string>,
    to: Array<string>
}
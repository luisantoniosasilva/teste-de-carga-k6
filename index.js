import GetPosts from "./scenarios/Get-Posts.js";
import { group, sleep } from "k6";

export default () => {
    group('Endpoint Get Posts', () => {
        GetPosts();
    });

    sleep(1);
}
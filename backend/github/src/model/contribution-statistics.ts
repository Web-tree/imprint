import {User} from './v3/user';
import {Week} from './v3/week';

export class ContributionStatistics {
    total: number;
    weeks: Week[];
    author: User;
}

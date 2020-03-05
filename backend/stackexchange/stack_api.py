from datetime import datetime
from stackapi import StackAPI
from stackapi import StackAPIError
import json
from dataclasses import dataclass
# from dataclasses import make_dataclass
# from dataclasses_json import dataclass_json
from dacite import from_dict


class ApiResponse:
    """ Gets the users identified in ids in {ids}.
    Typically this method will be called to fetch user profiles when you have obtained user ids from some other source, such as /questions.
    {ids} can contain up to 100 semicolon delimited ids. To find ids programmatically look for user_id on user or shallow_user objects.
    The sorts accepted by this method operate on the following fields of the user object:
    reputation – reputation
    creation – creation_date
    name – display_name
    modified – last_modified_date
    reputation is the default sort.
    It is possible to create moderately complex queries using sort, min, max, fromdate, and todate.
    This method returns a list of users. """

    def __init__(self, site: str, user_id: str, order: str = 'desc', sort: str = 'name') -> None:
        self.site = StackAPI(site)
        self.order = order
        self.sort = sort
        self.api_url = f'users/{user_id}'
        self.data = self.site.fetch(self.api_url, order=self.order, sort=self.sort)

    def print_api_response_json(self):
        print(json.dumps(self.data, indent=4))


test_user = ApiResponse('stackoverflow', '2335489')


# test_user.print_api_response_json()


@dataclass
class UserDataFromJSON:
    backoff: int
    has_more: bool
    page: int
    quota_max: int
    quota_remaining: int
    total: int
    items: list

    def __post_init__(self):
        self.badge_counts = self.items[0].get('badge_counts')
        self.account_id = self.items[0].get('account_id')
        self.is_employee = self.items[0].get('is_employee')
        self.last_modified_date = self.items[0].get('last_modified_date')
        self.last_access_date = self.items[0].get('last_access_date')
        self.reputation_change_year = self.items[0].get('reputation_change_year')
        self.reputation_change_quarter = self.items[0].get('reputation_change_quarter')
        self.reputation_change_month = self.items[0].get('reputation_change_month')
        self.reputation_change_week = self.items[0].get('reputation_change_week')
        self.reputation_change_day = self.items[0].get('reputation_change_day')
        self.reputation = self.items[0].get('reputation')
        self.creation_date = self.items[0].get('creation_date')
        self.user_type = self.items[0].get('user_type')
        self.user_id = self.items[0].get('user_id')
        self.location = self.items[0].get('location')
        self.website_url = self.items[0].get('website_url')
        self.link = self.items[0].get('link')
        self.profile_image = self.items[0].get('profile_image')
        self.display_name = self.items[0].get('display_name')


assert type(test_user.data) == dict
assert len(test_user.data) == 7

# from_dict function populates dataclass with dict key:value's
test_user_dataclass = from_dict(data_class=UserDataFromJSON, data=test_user.data)
print(test_user_dataclass.reputation)

# todo: verify required data from api response
# todo: create unittest for classes UserDataFromJSON & ApiResponse
# todo: add multi id handling '2335489;2335149;2335239'

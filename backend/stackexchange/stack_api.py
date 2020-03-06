from stackapi import StackAPI
import json
from dataclasses import dataclass
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
        self._site = StackAPI(site)
        self.order = order
        self.sort = sort
        self._api_url = f'users/{user_id}'
        self._data_all = self._site.fetch(self._api_url, order=self.order, sort=self.sort)

    def print_api_response_json(self):
        print(json.dumps(self._data_all, indent=4))

    @property
    def data_specific_values(self):
        # Pull all values of specified key from nested JSON.
        # Keys list can be extended in future if more JSON properties required
        keys = ["reputation", "account_id", "user_id", "link", "display_name"]
        arr = {}

        def extract(obj, arr, key):
            # Recursively search for values of key in JSON tree.
            if isinstance(obj, dict):
                for k, v in obj.items():
                    if isinstance(v, (dict, list)):
                        extract(v, arr, key)
                    elif k in keys:
                        arr.update({k: v})
            elif isinstance(obj, list):
                for item in obj:
                    extract(item, arr, key)
            return arr

        results = extract(self._data_all, arr, keys)
        return results


@dataclass
class User:
    account_id: int
    user_id: int
    reputation: int
    link: str
    display_name: str


test_user = ApiResponse('stackoverflow', '2335489')

# from_dict function populates dataclass with dict key:value's
# test_user_dataclass = from_dict(data_class=User, data=test_user.data_specific_values)
# print(test_user_dataclass.reputation)


# todo: create unittest for classes UserDataFromJSON & ApiResponse
# todo: add multi id handling '2335489;2335149;2335239'

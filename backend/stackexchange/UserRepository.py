from stackapi import StackAPI
from dacite import from_dict
from backend.stackexchange.User import *
from dat


class UserRepository:
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

    def __init__(self, site: str) -> None:
        self.__site = StackAPI(site)

    def get_user(self, user_id: str):
        api_url = f'users/{user_id}'
        return from_dict(data_class=User, data=self.__site.fetch(api_url)['items'][0])

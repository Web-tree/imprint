from datetime import datetime
from stackapi import StackAPI
from stackapi import StackAPIError
import json


class UserData:
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

    def __init__(self, user_id, **kwargs):
        self.site = StackAPI('stackoverflow')
        self.user_id = f'users/{user_id}'

    def user_info(self):
        return self.site.fetch(self.user_id, order='desc', sort='name')

    def user_name(self):
        return \
            list(map(lambda x: x.get('display_name'),
                     self.site.fetch(self.user_id, order='desc', sort='name').get('items')))[0]

    def user_reputation(self):
        return \
            list(map(lambda x: x.get('reputation'),
                     self.site.fetch(self.user_id, order='desc', sort='name').get('items')))[0]

    @staticmethod
    def print_data(method):
        print(json.dumps(method, indent=4))


# u1 = UserData('1279574;200291')
u1 = UserData('2335489')

u1.print_data(u1.user_info())
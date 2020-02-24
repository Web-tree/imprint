from datetime import datetime
from stackapi import StackAPI
from stackapi import StackAPIError
import json

site = StackAPI('stackoverflow')
users = site.fetch('users', order='desc', sort='reputation')
print(json.dumps(users, indent=4))

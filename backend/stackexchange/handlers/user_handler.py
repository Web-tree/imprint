import json

from UserService import UserService

user_service = UserService()


def get_user_imprint(event, context):
    print(event)
    user_id = event['pathParameters']['userId']

    body = {
        "imprint": user_service.get_user_imprint(user_id)
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response


from UserRepository import UserRepository


class UserService:
    def __init__(self):
        self.__user_repository = UserRepository('stackoverflow')

    def get_user_imprint(self, user_id: str) -> float:
        return self.__user_repository.get_user(user_id).reputation

import unittest
from backend.stackexchange.stack_api import ApiResponse, User, from_dict


class TestStackApi(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.user_json_1 = ApiResponse('stackoverflow', '2335489')
        cls.user_json_2 = ApiResponse('stackoverflow', '8078494')
        cls.user_1 = from_dict(data_class=User, data=cls.user_json_1.data_specific_values)
        cls.user_2 = from_dict(data_class=User, data=cls.user_json_2.data_specific_values)

    def test_ApiResponse_object(self):
        print('Testing ApiResponse objects')
        self.assertTrue(isinstance(self.user_json_1._data_all, dict))
        self.assertTrue(isinstance(self.user_json_2._data_all, dict))
        self.assertTrue(isinstance(self.user_json_1.data_specific_values, dict))
        self.assertTrue(isinstance(self.user_json_2.data_specific_values, dict))

    def test_User_object(self):
        print('Testing User objects')
        self.assertTrue(isinstance(self.user_1.account_id, int))
        self.assertTrue(isinstance(self.user_1.user_id, int))
        self.assertTrue(isinstance(self.user_1.reputation, int))
        self.assertTrue(isinstance(self.user_1.link, str))
        self.assertTrue(isinstance(self.user_1.display_name, str))
        self.assertTrue(isinstance(self.user_2.account_id, int))
        self.assertTrue(isinstance(self.user_2.user_id, int))
        self.assertTrue(isinstance(self.user_2.reputation, int))
        self.assertTrue(isinstance(self.user_2.link, str))
        self.assertTrue(isinstance(self.user_2.display_name, str))


if __name__ == '__main__':
    unittest.main()

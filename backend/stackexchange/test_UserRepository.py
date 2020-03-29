import unittest
from UserRepository import *

'''
Test data:
'stackoverflow', '2335489': LucemFerre 2705879 54 https://stackoverflow.com/users/2335489/lucemferre
'superuser', '633364': Beto Aveiga 1030062 141 https://superuser.com/users/633364/beto-aveiga
'askubuntu', '398808': Bernard Wei 3059843 1367 https://askubuntu.com/users/398808/bernard-wei
'unix', '22565': St&#233;phane Chazelas 1744646 360423 https://unix.stackexchange.com/users/22565/st%c3%a9phane-chazelas
'serverfault', '201277': Homolupus 3396486 11 https://serverfault.com/users/201277/homolupus
'''


class TestUserRepository(unittest.TestCase):

    def test_stackoverflow(self):
        self.user_stackoverflow = UserRepository('stackoverflow').get_user('2335489')
        self.assertTrue(isinstance(self.user_stackoverflow.account_id, int))
        self.assertEqual(self.user_stackoverflow.account_id, 2705879)
        self.assertEqual(self.user_stackoverflow.user_id, 2335489)
        self.assertIn(self.user_stackoverflow.reputation, range(44, 64))
        self.assertTrue(self.user_stackoverflow.link, self.user_stackoverflow.link.startswith('https'))
        self.assertEqual(self.user_stackoverflow.display_name, 'LucemFerre')

    def test_superuser(self):
        self.user_superuser = UserRepository('superuser').get_user('633364')
        self.assertTrue(isinstance(self.user_superuser.user_id, int))
        self.assertEqual(self.user_superuser.account_id, 1030062)
        self.assertEqual(self.user_superuser.user_id, 633364)
        self.assertIn(self.user_superuser.reputation, range(100, 160))
        self.assertTrue(self.user_superuser.link, self.user_superuser.link.startswith('https'))
        self.assertEqual(self.user_superuser.display_name, 'Beto Aveiga')

    def test_askubuntu(self):
        self.user_askubuntu = UserRepository('askubuntu').get_user('398808')
        self.assertTrue(isinstance(self.user_askubuntu.reputation, int))
        self.assertEqual(self.user_askubuntu.account_id, 3059843)
        self.assertEqual(self.user_askubuntu.user_id, 398808)
        self.assertIn(self.user_askubuntu.reputation, range(1000, 1500))
        self.assertTrue(self.user_askubuntu.link, self.user_askubuntu.link.startswith('https'))
        self.assertEqual(self.user_askubuntu.display_name, 'Bernard Wei')

    def test_unix(self):
        self.user_unix = UserRepository('unix').get_user('22565')
        self.assertTrue(isinstance(self.user_unix.link, str))
        self.assertEqual(self.user_unix.account_id, 1744646)
        self.assertEqual(self.user_unix.user_id, 22565)
        self.assertIn(self.user_unix.reputation, range(360000, 400423))
        self.assertTrue(self.user_unix.link, self.user_unix.link.startswith('https'))
        self.assertEqual(self.user_unix.display_name, 'St&#233;phane Chazelas')

    def test_serverfault(self):
        self.user_serverfault = UserRepository('serverfault').get_user('201277')
        self.assertTrue(isinstance(self.user_serverfault.display_name, str))
        self.assertEqual(self.user_serverfault.account_id, 3396486)
        self.assertEqual(self.user_serverfault.user_id, 201277)
        self.assertIn(self.user_serverfault.reputation, range(5, 25))
        self.assertTrue(self.user_serverfault.link, self.user_serverfault.link.startswith('https'))
        self.assertEqual(self.user_serverfault.display_name, 'Homolupus')


if __name__ == '__main__':
    unittest.main()

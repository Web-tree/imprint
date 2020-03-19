from dataclasses import dataclass


@dataclass
class User:
    account_id: int
    user_id: int
    reputation: int
    link: str
    display_name: str

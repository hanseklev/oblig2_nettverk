# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util
from swagger_server.models.user import User
from swagger_server.models.room import Room


class RoomUsers(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, room: Room=None, users: List[User]=None):  # noqa: E501
        """RoomUsers - a model defined in Swagger

        :param room: The room of this RoomUsers.  # noqa: E501
        :type room: Room
        :param users: The users of this RoomUsers.  # noqa: E501
        :type users: List[User]
        """
        self.swagger_types = {
            'room': Room,
            'users': List[User]
        }

        self.attribute_map = {
            'room': 'Room',
            'users': 'Users'
        }

        self._room = room
        self._users = users

    @classmethod
    def from_dict(cls, dikt) -> 'RoomUsers':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The RoomUsers of this RoomUsers.  # noqa: E501
        :rtype: RoomUsers
        """
        return util.deserialize_model(dikt, cls)

    @property
    def room(self) -> Room:
        """Gets the room of this RoomUsers.


        :return: The room of this RoomUsers.
        :rtype: Room
        """
        return self._room

    @room.setter
    def room(self, room: Room):
        """Sets the room of this RoomUsers.


        :param room: The room of this RoomUsers.
        :type room: Room
        """

        self._room = room

    @property
    def users(self) -> List[User]:
        """Gets the users of this RoomUsers.


        :return: The users of this RoomUsers.
        :rtype: List[User]
        """
        return self._users

    @users.setter
    def users(self, users: List[User]):
        """Sets the users of this RoomUsers.


        :param users: The users of this RoomUsers.
        :type users: List[User]
        """

        self._users = users
# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class Message(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, id: str=None, datestamp: str=None, text: str=None):  # noqa: E501
        """Message - a model defined in Swagger

        :param id: The id of this Message.  # noqa: E501
        :type id: str
        :param datestamp: The datestamp of this Message.  # noqa: E501
        :type datestamp: str
        :param text: The text of this Message.  # noqa: E501
        :type text: str
        """
        self.swagger_types = {
            'id': str,
            'datestamp': str,
            'text': str
        }

        self.attribute_map = {
            'id': 'id',
            'datestamp': 'Datestamp',
            'text': 'Text'
        }

        self._id = id
        self._datestamp = datestamp
        self._text = text

    @classmethod
    def from_dict(cls, dikt) -> 'Message':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Message of this Message.  # noqa: E501
        :rtype: Message
        """
        return util.deserialize_model(dikt, cls)

    @property
    def id(self) -> str:
        """Gets the id of this Message.


        :return: The id of this Message.
        :rtype: str
        """
        return self._id

    @id.setter
    def id(self, id: str):
        """Sets the id of this Message.


        :param id: The id of this Message.
        :type id: str
        """

        self._id = id

    @property
    def datestamp(self) -> str:
        """Gets the datestamp of this Message.


        :return: The datestamp of this Message.
        :rtype: str
        """
        return self._datestamp

    @datestamp.setter
    def datestamp(self, datestamp: str):
        """Sets the datestamp of this Message.


        :param datestamp: The datestamp of this Message.
        :type datestamp: str
        """

        self._datestamp = datestamp

    @property
    def text(self) -> str:
        """Gets the text of this Message.


        :return: The text of this Message.
        :rtype: str
        """
        return self._text

    @text.setter
    def text(self, text: str):
        """Sets the text of this Message.


        :param text: The text of this Message.
        :type text: str
        """

        self._text = text

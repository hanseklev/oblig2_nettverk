const { ROOMS } = require("../database");

function getMessagesFromList(messages) {
  /* print('arg', messages)
arr = []
for (m in messages):
    arr.append(m.messages)
print(arr)
return arr */
}

function getMessagesFromRoomId(req, res) {
  const roomId = req.params.id;
  for (room in ROOMS) {
    if (room.id === roomId) {
      room.getMessages();
    }
  }

  /*  for message in ROOMS:
       
        if message.room.id == room_id:
            for m in message.messages:
                if m.user.id == user_id:
                    #message_arr = getMessagesFromList(message.messages)
                    return jsonify(message.messages)
                    #return jsonify(message.messages)
                    #return jsonify(message.messages)
         */

  return res.status(200).json({ roomId: roomId });
}

module.exports = { getMessagesFromRoomId };

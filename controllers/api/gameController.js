const { User } = require("../../models");
const { Playerroom } = require("../../models");
const { History } = require("../../models");

const wait = {};
const data = {}

function waitEnemyResponse(id) {
    return new Promise((resolve) => {
      wait[id] = { resolve };
    });
  }

exports.createRoom = (req, res) => {
  let isRoomCreated;
    const playerRoom = Playerroom.create({
          roomName: req.body.roomName,
        })
        .then(roomName => {
          const history = History.create ({
            roomId: roomName.id
        })
        res.status(201).json(roomName)
        }) .catch(err => {
        res.status(422).json("Gagal membuat room")
        })
      },

exports.joinRoom = async (req, res) => {
    const room = req.params.id; 
    const playerRoom = await Playerroom.findOne({
        where: { id: room },
      });

      const userId = req.user.id;

      let responseMessage = ""
      if (!playerRoom) {
        responseMessage = "Can't find room";
      } else {
        responseMessage = "Room is available";
        if (playerRoom.player1 == null) {
            Playerroom.update({
                player1: userId
            },
            {
            where: {
                id: room,
              },
            })
            res.json ({
                "message": responseMessage
              })
              return true;

        } else if (playerRoom.player2 == null) {
            Playerroom.update({
                player2: userId
            },
            {
            where: {
                id: room,
              },
            })
            res.json ({
                "message": responseMessage
              })
              return true; 
        } else { 
            responseMessage = "Room is full. You can't join this room";
            res.json ({
                 "message": responseMessage
              })
              return true;  
        }
      }
    
      exports.playGame = async (req, res) => {
        const history = await History.findOne ({
            where: {roomId: req.body.roomId},
        });
    
        const id = history.id;
        if (!data[id]) {
          // Player 1 memilih
          data[id] = {
            player1: req.body.choose,
            player2: null,
          };
        } else {
          // Player 2 memilih
          data[id].player2 = req.body.choose;
        }
    
        if (!wait[id]) {
          // Player 1 menunggu respons player 2
        await waitEnemyResponse(id);
        } else {
          // Player 2 merespons ke player 1 untuk selesai menunggu
          wait[id].resolve();
          delete wait[id];
        }
    
        // logic game suite
        hasil = tentukanPemenang(data[id]);
    
        History.update({
           pilihanPlayer1: data[id].player1,
           pilihanPlayer2: data[id].player2,
           winner: hasil
        },
        {
            where: {
                id: id,
            }
        })
    
        data[id].hasil = hasil
    
        res.json(data[id]);
      }
    
      function tentukanPemenang(data){
        let hasil = "" 
    
        if (data.player1 == 'kertas' && data.player2 == 'batu') {
            console.log("Player 1 Win!")
            hasil = 1;
        }   else if (data.player1 == 'gunting' && data.player2 == 'kertas') {
            console.log("Player 1 Win!")
            hasil = 1;
        }   else if (data.player1 == 'batu' && data.player2 == 'gunting') {
            console.log("Player 1 Win!")
            hasil = 1;
        }   else if (data.player2 == 'kertas' && data.player1 == 'batu') {
            console.log("Player 2 Win!")
            hasil = 2;
        }   else if (data.player2 == 'gunting' && data.player1 == 'kertas') {
            console.log("Player 2 Win!")
            hasil = 2;
        }   else if (data.player1 == 'gunting' && data.player2 == 'batu') {
            console.log("Player 2 Win!")
            hasil = 2;
            } else {
            // alert("Draw!")
            console.log("Draw!")
            hasil = 0;
            }
            return hasil;
        } 
      
    };
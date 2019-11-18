import { Component, OnInit } from '@angular/core';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';
import { environment } from '@env';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'app/data/services/appointment.service';
import { UserService } from 'app/data/services/user.service';

const apiUrl = environment.baseUrl + 'chat';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  userId = '';
  currentUser = <any>{};
  messages = [];
  currentRoom = <any>{};
  roomUsers = [];
  userRooms = [];
  newMessage = '';
  newRoom = {
    name: '',
    isPrivate: false
  };
  joinableRooms = [];
  newUser = '';
public appointmentId
public user
  constructor(private route: ActivatedRoute,private appointmentService:AppointmentService,private userService:UserService,private redirect: Router) { }

  ngOnInit() {
    this.appointmentId = this.route.snapshot.params.id;
    this.userService.getAuthStatusListener()
    .subscribe( (isAuth: boolean) => {
      this.user = this.userService.getUserData();
    });
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe(res=>{
      if(this.user.id===res.userName){
        this.userId=res.userName
      }
      else if (this.user.id===res.professionalId){
        this.userId=res.professionalId
      }
      else{
        this.redirect.navigate(['/profile']);
      }      
      this.currentRoom=res.appointmentId
      this.addUser()
    })
    
     }
  addUser() {
    const { userId } = this;
    console.log(this)
    axios.post('http://localhost:3000/api/chat/users', { userId })
      .then(() => {
        console.log(userId);
        const tokenProvider = new Chatkit.TokenProvider({
          url: 'http://localhost:3000/api/chat/authenticate'
        });
       
        const chatManager = new Chatkit.ChatManager({
          instanceLocator: 'v1:us1:75b6cdeb-b889-403e-a0eb-5a50da4d3c95',
          userId,
          tokenProvider
        });

        return chatManager
          .connect({
            onAddedToRoom: room => {
              console.log(`Added to room ${room.name}`)
              this.userRooms.push(room);
              this.getJoinableRooms();
            },
          })
          .then(currentUser => {
            this.currentUser = currentUser;
            this.connectToRoom(this.currentRoom);
            this.getJoinableRooms();
          });
      })
        .catch(error => console.error(error))
  }
  addUserToRoom() {
    const { newUser, currentUser, currentRoom } = this;
    currentUser.addUserToRoom({
      userId: newUser,
      roomId: currentRoom.id
    })
      .then((currentRoom) => {
        this.roomUsers = currentRoom.users;
      })
      .catch(err => {
        console.log(`Error adding user: ${err}`);
      });

    this.newUser = '';
  }


  createRoom() {
    const { newRoom: { name, isPrivate }, currentUser } = this;

    if (name.trim() === '') return;

    currentUser.createRoom({
      name,
      private: isPrivate,
    }).then(room => {
      this.connectToRoom(room.id);
      this.newRoom = {
        name: '',
        isPrivate: false,
      };
    })
    .catch(err => {
      console.log(`Error creating room ${err}`)
    })
  }


  joinRoom(id) {
    const { currentUser } = this;
    currentUser.joinRoom({ roomId: id })
    .catch(err => {
      console.log(`Error joining room ${id}: ${err}`)
    })
  }

  

  connectToRoom(id) {
    this.messages = [];
    const { currentUser } = this;

    currentUser.subscribeToRoom({
      roomId: `${id}`,
      messageLimit: 100,
      hooks: {
        onMessage: message => {
          this.messages.push(message);
        },
        onPresenceChanged: () => {
          this.roomUsers = this.currentRoom.users.sort((a) => {
            if (a.presence.state === 'online') return -1;

            return 1;
          });
        },
      },
    })
    .then(currentRoom => {
      this.currentRoom = currentRoom;
      this.roomUsers = currentRoom.users;
      this.userRooms = currentUser.rooms;
    });
  }

  sendMessage() {
    const { newMessage, currentUser, currentRoom } = this;

    if (newMessage.trim() === '') return;

    currentUser.sendMessage({
      text: newMessage,
      roomId: `${currentRoom.id}`,
    });

    this.newMessage = '';
  }
  getJoinableRooms() {
    const { currentUser } = this;
    currentUser.getJoinableRooms()
    .then(rooms => {
      this.joinableRooms = rooms;
    })
    .catch(err => {
      console.log(`Error getting joinable rooms: ${err}`)
    })
  }

 
}

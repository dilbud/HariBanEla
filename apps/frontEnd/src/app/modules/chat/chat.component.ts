import { Component, OnInit } from '@angular/core';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';
import { environment } from '@env';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'app/data/services/appointment.service';
import { UserService } from 'app/data/services/user.service';
import { ChatService } from 'app/data/services/chat.service';
import { HttpClient,} from '@angular/common/http';

const apiUrl = environment.baseUrl + 'chat';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  userId = '';
  currentUser = {} as any;
  messages = [];
  currentRoom = {} as any;
  roomUsers = [];
  userRooms = [];
  newMessage = '';
  newRoom = {
    name: '',
    isPrivate: false
  };
  joinableRooms = [];
  newUser = '';
  usersWhoAreTyping = [];
  attachment = null;
  public appointmentId;
  public user;
  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private userService: UserService,
    private chatService: ChatService,
    private redirect: Router,
    private http:HttpClient
  ) {}

  ngOnInit() {
    this.appointmentId = this.route.snapshot.params.id;
     let items = Array.from({length: 1000}, (v, k) => k + 1);
    this.user = this.userService.getUserData();
    this.userService.getAuthStatusListener().subscribe((isAuth: boolean) => {
      this.user = this.userService.getUserData();
    });
    this.appointmentService
      .getAppointmentById(this.appointmentId)
      .subscribe(res => {
        if (this.user.id === res.userId) {
          this.userId = res.userName;
        } else if (this.user.id === res.professionalId) {
          this.userId = res.professionalName;
        } else {
          this.redirect.navigate(['/']);
        }
        this.currentRoom = this.appointmentId;
        this.createRoom(this.appointmentId);
      });
  }
  addUser() {
    const { userId } = this;
    console.log(userId);
    axios
      .post(apiUrl + '/users', { userId })
      .then(() => {
        const tokenProvider = new Chatkit.TokenProvider({
          url: apiUrl + '/authenticate'
        });

        const chatManager = new Chatkit.ChatManager({
          instanceLocator: environment.chatkitInstanceLocator,
          userId,
          tokenProvider
        });

        return chatManager
          .connect({
            onAddedToRoom: room => {
              console.log(`Added to room ${room.name}`);
              this.userRooms.push(room);
              this.getJoinableRooms();
            }
          })
          .then(currentUser => {
            this.currentUser = currentUser;
            console.log(this.currentRoom, 'currentRoom');
            this.connectToRoom(this.currentRoom);
            this.getJoinableRooms();
          });
      })
      .catch(error => console.error(error));
  }
  addUserToRoom() {
    const { newUser, currentUser, currentRoom } = this;
    currentUser
      .addUserToRoom({
        userId: newUser,
        roomId: currentRoom.id
      })
      // tslint:disable-next-line: no-shadowed-variable
      .then(currentRoom => {
        this.roomUsers = currentRoom.users;
      })
      .catch(err => {
        console.log(`Error adding user: ${err}`);
      });

    this.newUser = '';
  }
  createRoom(id) {
    this.chatService.createRoom(id).subscribe(res => this.addUser());
  }

  joinRoom(id) {
    const { currentUser } = this;
    currentUser.joinRoom({ roomId: id }).catch(err => {
      console.log(`Error joining room ${id}: ${err}`);
    });
  }

  connectToRoom(id) {
    this.messages = [];
    const { currentUser } = this;
    console.log('thth room created', id);
    currentUser
      .subscribeToRoom({
        roomId: `${id}`,
        messageLimit: 100,
        hooks: {
          onMessage: message => {
            this.messages.push(message);
          },
          onPresenceChanged: () => {
            this.roomUsers = this.currentRoom.users.sort(a => {
              if (a.presence.state === 'online') {
                return -1;
              }
              return 1;
            });
          // },
          // onUserStartedTyping: user => {
          //   console.log('typing');
          //   this.usersWhoAreTyping.push(user.name);
          // },
          // onUserStoppedTyping: user => {
          //   this.usersWhoAreTyping = this.usersWhoAreTyping.filter(
          //     username => username !== user.name
          //   );
          }
        }
      })
      .then(currentRoom => {
        this.currentRoom = currentRoom;
        this.roomUsers = currentRoom.users;
        this.userRooms = currentUser.rooms;
      })
      .catch(error => console.error(error));
  }

  sendMessage() {
    const { newMessage, currentUser, currentRoom, attachment } = this;

    if (newMessage.trim() === '') {
      return;
    }
    const messageObj =  {
      text: newMessage,
      roomId: `${currentRoom.id}`
    } as any;

    if (attachment) {
      messageObj.attachment = {
        file: attachment,
        name: attachment.name
      };
    }

    currentUser.sendMessage(messageObj);
    this.attachment = null;
    this.newMessage = '';
  }
  getJoinableRooms() {
    const { currentUser } = this;
    currentUser
      .getJoinableRooms()
      .then(rooms => {
        this.joinableRooms = rooms;
      })
      .catch(err => {
        console.log(`Error getting joinable rooms: ${err}`);
      });
  }
  sendTypingEvent() {
    const { currentUser, currentRoom } = this;
    currentUser.isTypingIn({ roomId: currentRoom.id });
  }

  fileChangedHandler(event) {
    const file = event.target.files[0];
    this.attachment = file;
    console.log(this.messages);
  }

  download(link){
    console.log("jrjrjjr")
    return this.http.get(link)
  }
}

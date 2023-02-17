import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {

  onCreate (options: any) {
    this.setState(new MyRoomState());

    this.onMessage("PLAYER_MOVED", (client, message) => {
      //
      // handle "type" message
      //
      console.log("player moved")
      // console.log(client)
      console.log(message)
      this.broadcast("PLAYER_MOVED", message, { except: client });

    });

    this.onMessage("YOUR_TURN", (client, message) => {
      //
      // handle "type" message
      //
      console.log("turn changed")
      // console.log(client)
      console.log(message)
      this.broadcast("YOUR_TURN", message, { except: client });

    });

    this.onMessage("GAME_END", (client, message) => {
      //
      // handle "type" message
      //
      console.log("GAME_END")
      // console.log(client)
      console.log(message)
      this.broadcast("GAME_END", true);

    });

  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    this.broadcast("PLAYER_JOINED", true, { except: client });
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}

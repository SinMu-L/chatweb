declare namespace Chat{

    interface ChatState {
        active: number | null
        history: NavHistory[]
        chat: { uuid: number, data: ChatItem[] }[]
    }
    
    interface NavHistory{
        uuid: number
        title: string
        enEdit?: boolean
    }
    
    
    interface ChatItem{
        time: string
        msg: string
        role: string
        msgReload: boolean
        
    }

}


class LS {
    private _sidebar: Chat.NavHistory[];
    private _chat: Chat.ChatItem[];
    private _cache: any[];
  
    constructor() {
      this._sidebar = [];
      this._chat = [];
      this._cache = [];
    }
  
    public get sidebar(): Chat.NavHistory[] {
      return this._sidebar;
    }
  
    public set sidebar(value: Chat.NavHistory[]) {
      this._sidebar = value;
    }
  
    public get chat(): Chat.ChatItem[] {
      return this._chat;
    }
  
    public set chat(value: Chat.ChatItem[]) {
      this._chat = value;
    }
  
    public get cache(): any[] {
      return this._cache;
    }
  
    public set cache(value: any[]) {
      this._cache = value;
    }
  }
  

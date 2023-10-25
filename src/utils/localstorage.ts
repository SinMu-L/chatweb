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



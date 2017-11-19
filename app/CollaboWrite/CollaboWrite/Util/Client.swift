//
//  Client.swift
//  CollaboWrite
//
//  Created by Joseph Roque on 2017-11-18.
//  Copyright © 2017 Hack Bestern. All rights reserved.
//

import Foundation
import Starscream

class ClientSocketManager {
    
    var userId: String?
    var roomId: String?
    var activeSocket: WebSocket? = nil

    func openSocketConnection() {
        guard let _ = userId, let _ = roomId else { return }
        activeSocket = WebSocket(url: URL(string: "ws://localhost:8080/")!)
        activeSocket!.delegate = self
        activeSocket!.connect()
        print("Attempted connection to socket.")
    }
    
}


extension ClientSocketManager: WebSocketDelegate {

    func websocketDidConnect(socket: WebSocketClient) {
        guard let userId = userId, let roomId = roomId else { return }
        print("WebSocket is connected")
        socket.write(string: "\(userId):\(roomId):MSG:Hello")
    }
    
    func websocketDidDisconnect(socket: WebSocketClient, error: Error?) {
        print("WebSocket disconnected")
    }
    
    func websocketDidReceiveMessage(socket: WebSocketClient, text: String) {
        print("WebSocket received message: \(text)")
    }
    
    func websocketDidReceiveData(socket: WebSocketClient, data: Data) {
        // Ignore
    }
    
}

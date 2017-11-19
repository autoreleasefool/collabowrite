//
//  Prompt.swift
//  CollaboWrite
//
//  Created by Joseph Roque on 2017-11-19.
//  Copyright © 2017 Hack Bestern. All rights reserved.
//

import Foundation

protocol PromptDelegate {
    
    func onPromptReceived(prompt: String)
    
}

class Prompt {
    
    private init() { }
    
    static let sharedInstance = Prompt()
    
    var lastPrompt: String? = nil
    
    var delegate: PromptDelegate?
    
    func getPrompt() {
        let url = URL(string: "https://ineedaprompt.com/dictionary/default/prompt?q=adj+noun+adv+verb+noun+location")!

        let task = URLSession.shared.dataTask(with: url) { data, response, error in
            guard let data = data, error == nil else {                                                 // check for fundamental networking error
                print("error=\(String(describing: error))")
                return
            }
            
            if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200 {           // check for http errors
                print("statusCode should be 200, but is \(httpStatus.statusCode)")
                print("response = \(String(describing: response))")
            }
            
            do {
                if let json = try JSONSerialization.jsonObject(with: data) as? [String: Any],
                    let prompt = json["english"] as? String {
                        self.lastPrompt = prompt
                        self.delegate?.onPromptReceived(prompt: prompt)
                }
            } catch {
                print("Error deserializing JSON: \(error)")
            }
        }
        task.resume()
    }
}

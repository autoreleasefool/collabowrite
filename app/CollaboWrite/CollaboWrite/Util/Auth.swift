//
//  Auth.swift
//  CollaboWrite
//
//  Created by Joseph Roque on 2017-11-19.
//  Copyright © 2017 Hack Bestern. All rights reserved.
//

import Foundation

protocol AuthDelegate {
    
    func onAuthSuccess(userId: String)

}

class Auth {
    
    var delegate: AuthDelegate? = nil
    
    func attemptLogIn(username: String, password: String) {
        var request = URLRequest(url: URL(string: "http://localhost:3000/users/login")!)
        request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "POST"
        
        let postString = "username=\(username)&password=\(password)"
        request.httpBody = postString.data(using: .utf8)

        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data, error == nil else {
                print("error=\(String(describing: error))")
                return
            }
            
            if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200 {
                print("statusCode should be 200, but is \(httpStatus.statusCode)")
                print("response = \(String(describing: response))")
            }
            
            let responseString = String(data: data, encoding: .utf8)
            print("responseString = \(String(describing: responseString))")
            self.delegate?.onAuthSuccess(userId: responseString!)
        }

        task.resume()
    }
    
    func attemptSignUp(username: String, password: String) {
        var request = URLRequest(url: URL(string: "http://localhost:3000/users/signup")!)
        request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "POST"
        
        let postString = "username=\(username)&password=\(password)"
        request.httpBody = postString.data(using: .utf8)
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data, error == nil else {
                print("error=\(String(describing: error))")
                return
            }
            
            if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200 {
                print("statusCode should be 200, but is \(httpStatus.statusCode)")
                print("response = \(String(describing: response))")
            }
            
            let responseString = String(data: data, encoding: .utf8)
            print("responseString = \(String(describing: responseString))")
            self.delegate?.onAuthSuccess(userId: responseString!)
        }
        
        task.resume()
        
    }
}

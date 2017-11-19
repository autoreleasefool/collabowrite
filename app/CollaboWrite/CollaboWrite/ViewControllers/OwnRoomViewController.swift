//
//  OwnRoomViewController.swift
//  CollaboWrite
//
//  Created by admin on 2017-11-19.
//  Copyright © 2017 Hack Bestern. All rights reserved.
//

import Foundation
import UIKit

class OwnRoomViewController: UIViewController {
    
    @IBOutlet weak var promptField: UILabel!
    @IBOutlet weak var textButton: UIButton!
    
    @IBAction func goToText(_ sender: UIButton) {
        let editorScreen = self.storyboard!.instantiateViewController(withIdentifier: "EditorViewController")
        self.present(editorScreen, animated: true, completion: nil)
    }
    
    
    @IBAction func refreshPrompt(_ sender: Any) {
        Prompt.sharedInstance.delegate = self
        Prompt.sharedInstance.getPrompt()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        Prompt.sharedInstance.delegate = self
        Prompt.sharedInstance.getPrompt()
    }

}

extension OwnRoomViewController: PromptDelegate {
    
    func onPromptReceived(prompt: String) {
        DispatchQueue.main.async {
            self.promptField.text = prompt
        }
    }

}

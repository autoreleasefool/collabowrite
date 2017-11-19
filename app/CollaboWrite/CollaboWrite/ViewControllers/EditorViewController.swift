//
//  EditorViewController.swift
//  CollaboWrite
//
//  Created by admin on 2017-11-19.
//  Copyright © 2017 Hack Bestern. All rights reserved.
//

import Foundation
import UIKit

class EditorViewController: UIViewController {
    @IBOutlet weak var promptField: UILabel!
    override func viewDidAppear(_ animated: Bool) {
        promptField.text = Prompt.sharedInstance.lastPrompt
    }
    // back-button
    // no-input state
    // end-game
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

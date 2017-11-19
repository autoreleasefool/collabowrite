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
    @IBOutlet weak var textButton: UIButton!
    @IBAction func goToText(_ sender: UIButton) {
        let editorScreen = self.storyboard!.instantiateViewController(withIdentifier: "EditorViewController")
        self.present(editorScreen, animated: true, completion: nil)
    }
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

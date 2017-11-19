//
//  SignUpViewController.swift
//  CollaboWrite
//
//  Created by Kshitij Gupta on 2017-11-18.
//  Copyright © 2017 Hack Bestern. All rights reserved.
//

import Foundation
import UIKit

class SignUpViewController: UIViewController {
    
    @IBOutlet weak var SignUp: UIButton!
    @IBAction func LoginLoadingScreen(_ sender: UIButton) {
        let loadingScreen = self.storyboard!.instantiateViewController(withIdentifier: "LoadScreenViewController")
        self.present(loadingScreen, animated: true, completion: nil)
    }
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

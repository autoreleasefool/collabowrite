//
//  LogInViewController.swift
//  CollaboWrite
//
//  Created by admin on 2017-11-18.
//  Copyright © 2017 Hack Bestern. All rights reserved.
//
import Foundation
import UIKit

class LogInViewController: UIViewController {
    @IBOutlet weak var LogIn: UIButton!
    @IBAction func LogInLoad(_ sender: UIButton) {
        let logInLoadingScreen = self.storyboard!.instantiateViewController(withIdentifier: "LoadSceenViewController")
        self.present(logInLoadingScreen, animated: true, completion: nil)
    }
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}


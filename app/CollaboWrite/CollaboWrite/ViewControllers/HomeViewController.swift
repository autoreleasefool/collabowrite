//
//  HomeViewController.swift
//  CollaboWrite
//
//  Created by Kshitij Gupta on 2017-11-18.
//  Copyright © 2017 Hack Bestern. All rights reserved.
//

import Foundation
import UIKit

class HomeViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    @IBOutlet weak var joinRoom: UIButton!
    @IBOutlet weak var yourProfile: UIButton!
    @IBOutlet weak var myRoom: UIButton!
    @IBAction func goToMyRoom(_ sender: UIButton) {
        let myRoomScreen = self.storyboard!.instantiateViewController(withIdentifier: "OwnRoomViewController")
        self.present(myRoomScreen, animated: true, completion: nil)
    }
    @IBAction func FindRoom(_ sender: UIButton) {
        let findRoomScreen = self.storyboard!.instantiateViewController(withIdentifier: "FindRoomViewController")
        self.present(findRoomScreen, animated: true, completion: nil)
    }
    @IBAction func goToProfile(_ sender: UIButton) {
        let profileScreen = self.storyboard!.instantiateViewController(withIdentifier: "ProfileViewController")
        self.present(profileScreen, animated: true, completion: nil)
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

import Foundation

@objc(Bulb) class Bulb: NSObject {
  @objc static var isOn = false
 
  @objc func toggleOn(_ callback: RCTResponseSenderBlock) {
    Bulb.isOn = !Bulb.isOn
    callback([ Bulb.isOn ])
  }
  
  @objc func getStatus(_ callback: RCTResponseSenderBlock) {
    callback([ Bulb.isOn ])
  }
  
  @objc static func requiresMainQueueSetup() -> Bool {  return true }
}

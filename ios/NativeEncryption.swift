
//  NativEncryption.swift
//  Copyright © 2019 Facebook. All rights reserved.
//
import Foundation

@objc(NativeEncryption)
class NativeEncryption: NSObject {
  
  @objc func encryptData(_ key : String,iv : String,str : String,callback: RCTResponseSenderBlock) -> Void{
    callback([NSNull(),CryptLib().encryptPlainText(with: str, key: key, iv: iv) ?? ""])
  }
  
  @objc func decryptData(_ key : String,iv : String,str : String,callback: RCTResponseSenderBlock) -> Void {
    callback([NSNull(),CryptLib().decryptCipherText(with: str, key: key, iv: iv) ?? ""])
  }
  
}
